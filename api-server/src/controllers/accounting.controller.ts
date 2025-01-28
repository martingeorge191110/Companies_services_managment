#!/usr/bin/env ts-node
import { NextFunction, Response, Request } from "express";
import AccountingValidator from "../validators/accounting.validator.ts";
import { Admins, Companies, Invoices, Transactions } from "@prisma/client";
import ApiError from "../middlewares/api.errors.ts";
import PrismaInstance from "../prisma.db.ts";
import { SuccessfulyResponse } from "../utilies/global.utilies.ts";
import { decrypting, encryptObject } from "../utilies/encrypt.dcrypt.ts";




class AccountinController extends AccountingValidator {



   public CreateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = (req as any).id
      const company: Companies = (req as any).company

      try {
         const admin: (Admins | null) = await PrismaInstance.admins.findUnique({
            where: {id}
         })

         if (!admin)
            return (next(ApiError.CreateError("Un authorized to do this!", 403, null)))

         const agent = await PrismaInstance.companies_Agents.findFirst({
            where: {company_id: company.id}
         })

         if (!agent)
            return (next(ApiError.CreateError("No Agents found for this company!", 404, null)))

         const accounting = await PrismaInstance.accounting.create({
            data: {company_id: company.id}
         })

         await PrismaInstance.accounting_Access_Users.create({
            data: {
               system_id: accounting.company_id, user_id: agent.agent_id
            }
         })
         await PrismaInstance.accounting_Assets.create({
            data: {accounting_system_id: accounting.company_id}
         })
         await PrismaInstance.accounting_Liabilities.create({
            data: {accounting_system_id: accounting.company_id}
         })


         return (SuccessfulyResponse(res, "Successfuly Accounting system created!", {...accounting}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during creating accounting system for this company!", 500, null)))
      }
   }



   public Transaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userId: string = (req as any).id
      const accounting = req.accounting
      const body = req.body
      const category = req.transaction_category

      const encryptBody = encryptObject(body)
      const obligatories = {customer_name: encryptBody.customer_name, customer_email: encryptBody.customer_email, customer_phone_number: encryptBody.customer_phone_number}

      let transaction: Transactions;
      try {
         if (category === "assets") {
            transaction = await PrismaInstance.transactions.create({
               data: {
                  user_recorded_id: userId, asset_id: accounting?.company_id,
                  accounting_system_id: accounting?.company_id, actual_amount: body.actual_amount,
                  ...body, ...obligatories
               }
            })
         } else {
            transaction = await PrismaInstance.transactions.create({
               data: {
                  user_recorded_id: userId, liability_id: accounting?.company_id,
                  accounting_system_id: accounting?.company_id, actual_amount: body.actual_amount,
                  ...body, ...obligatories
               }
            })
         }
      } catch (err) {
         console.log(err)
         return (next(ApiError.CreateError("Server error during adding new transaction!", 500, null)))
      }

      const dcryptObject = {
         customer_name: decrypting(encryptBody.customer_name), customer_email: decrypting(encryptBody.customer_email), customer_phone_number: decrypting(encryptBody.customer_phone_number)
      }
      return (SuccessfulyResponse(res, "New Transactions has been added!", {...transaction, ...dcryptObject}))
   }



   public AddInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = (req as any).id
      const transaction: (Transactions | null) = req.transaction || null
      const { invoice_number } = req.body
      const invoice_url = req.invoice_url

      if (!invoice_url || !transaction)
         return (next(ApiError.CreateError("Cannot upload your Invoice file or image", 400, null)))

      const encryptedData = encryptObject({invoice_number, invoice_url})
      try {
         const invoice: Invoices = await PrismaInstance.invoices.create({
            data: {
               transaction_id: transaction.id, invoice_number: encryptedData.invoice_number,
               invoiceLink: encryptedData.invoice_url
            }
         })

         await PrismaInstance.transactions.update({
            where: {id: transaction.id},
            data: {user_updated_id: id}
         })

         const dcryptResult = {
            invoice_number: decrypting(invoice.invoice_number),
            invoiceLink: invoice.invoiceLink && decrypting(invoice.invoiceLink)
         }

         return (SuccessfulyResponse(res, "Successfuly creating new invoice!", {...invoice, ...dcryptResult}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during creating an invoice for transaction!", 500, null)))
      }
   }
}

export default AccountinController;
