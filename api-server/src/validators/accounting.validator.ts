#!/usr/bin/env ts-node
import { Accounting, Companies, Invoices, Transactions } from "@prisma/client";
import { body, Meta, param, query, ValidationChain } from "express-validator";
import PrismaInstance from "../prisma.db.ts";
import { Request } from "express";
import fs from 'fs';



class AccountingValidator {


   public createAccountValid = (): ValidationChain[] => {
      return ([
         body("id")
            .trim().notEmpty().withMessage("company id is required!")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const company: (Companies | null) = await PrismaInstance.companies.findUnique({
                     where: {id: val}
                  })

                  if (!company)
                     throw (new Error("Company not found with this id!"))

                  req.company = company
                  return (true)
               } catch (err) {
                  throw (err)
               }
            })
      ])
   }


   public systemIdValid = (): ValidationChain[] => {
      return ([
         query("company_id")
            .trim().notEmpty().withMessage("Company ID is required feild!")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const accounting = await PrismaInstance.accounting.findUnique({
                     where: {company_id: val},
                     include: {company: {
                        select: {valid_account: true}
                     }}
                  })

                  if (!accounting || !accounting.company.valid_account)
                     throw (new Error("This Company has not valid accounting system to treat with the transactions!"))

                  req.accounting = accounting
                  return (true)
               } catch (err) {
                  throw (err)
               }
            })
      ])
   }

   public isTransactionValid = (): ValidationChain[] => {
      const obligatories = ['actual_amount', 'status', 'paymentMethod', 'type', 'customer_name', 'customer_email', 'customer_phone_number']

      return ([
         ...obligatories.map((ele) => {
            return (
               body(ele)
                  .trim().notEmpty().withMessage(`${ele} feild is required!`)
                  .custom((val: string, {req}: Meta) => {
                     if (ele === 'status' && !['Completed', 'Pending', 'Failed'].includes(val))
                        throw (new Error(`${ele} is not valid value!`))

                     if (ele === 'paymentMethod') {
                        const methods = ['Cash', 'Credit_Card', 'Debit_Card', 'Bank_Transfer', 'Digital_Wallets']
                        if (!methods.includes(val))
                           throw (new Error(`${ele} is not valid value!`))
                     }

                     const types = ['ACCOUNTS_RECEIVABLE', 'ACCOUNTS_PAYABLE', 'CASH_FLOW', 'EXPENSES', 'REVENUES', 'FIXED_ASSETS', 'INVESTMENTS', 'LIABILITIES', 'EQUITY', 'TAX_PAYMENTS', 'MISCELLANEOUS']
                     if (ele === 'type') {
                        if (!types.includes(val))
                           throw (new Error(`${ele} is not valid value!`))

                        if ([types[0], types[4], types[5]].includes(val))
                           req.transaction_category = 'assets'
                        else
                           req.transaction_category = 'liabilities'
                     }

                     return (true)
                  })
            )
         })
      ])
   }


   public transactionParamId = (): ValidationChain[] => {
      return ([
         query("transactions_id")
            .trim().notEmpty().withMessage("Transaction id should be included in the Request query!")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const system: Record<string, (string | null)> = {}

                  if (req.accounting.company_id)
                     system.accounting_system_id = req.accounting.company_id

                  const transaction: (Transactions | null) = await PrismaInstance.transactions.findUnique({
                     where: {id: val, ...system}
                  })

                  if (!transaction) {
                     this.removeInoiceFile(req as Request)
                     throw (new Error("No transactions found with id!"))
                  }

                  req.transaction = transaction
                  return (true)
               } catch (err) {
                  throw (err)
               }
            })
      ])
   }


   public invoiceValid = (): ValidationChain[] => {
      return ([
         body("invoice_number")
            .trim().notEmpty().withMessage("invoice_number should be included!").isString().withMessage("invoice_number must be a string!")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const invoice: (Invoices | null) = await PrismaInstance.invoices.findUnique({
                     where: {invoice_number: val}
                  })

                  if (invoice) {
                     this.removeInoiceFile(req as Request)
                     throw (new Error("Invoice Number must be unique number!"))
                  }
                  return (true)
               } catch (err) {
                  throw (err)
               }
            })
      ])
   }

   public createInvoiceValid = (): ValidationChain[] => {
      return ([
         ...this.transactionParamId(), ...this.invoiceValid()
      ])
   }



   public invoiceRetreivingValid = (): ValidationChain[] => {
      return ([
         ...this.transactionParamId(),
         query("invoice_id")
            .trim().notEmpty().withMessage("Invoice id is required in params!")
      ])
   }

   public removeInoiceFile = (req: Request) => {
      const invoice = req.file

      if (!invoice)
         return (true)

      fs.unlinkSync(invoice.path )
      return (true)
   }
}

export default AccountingValidator;
