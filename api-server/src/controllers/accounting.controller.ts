#!/usr/bin/env ts-node
import { NextFunction, Response, Request } from "express";
import AccountingValidator from "../validators/accounting.validator.ts";
import { Accounting_Assets, Admins, Companies, Invoices, Transactions } from "@prisma/client";
import ApiError from "../middlewares/api.errors.ts";
import PrismaInstance from "../prisma.db.ts";
import { monthDaysArr, SuccessfulyResponse } from "../utilies/global.utilies.ts";
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


   public DailyMonthGraph = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const system_id = (req as any).accounting.company_id

      const firstDayOfMonth = new Date(
         new Date().getUTCFullYear(), new Date().getMonth(), 1
      )

      const start = firstDayOfMonth.toString().split(" ")[2]
      const end = new Date().toString().split(" ")[2]

      const result = monthDaysArr(Number(start), Number(end))

      try {
         const revenues = await PrismaInstance.accounting_Assets.findUnique({
            where: {accounting_system_id: system_id},
            select: {
               transactions: {
                  where: {createdAt: {gte: firstDayOfMonth}, status: {in: ['Completed', 'Pending']}},
                  select: {actual_amount: true, createdAt: true}
               }
            }
         })

         const expenses = await PrismaInstance.accounting_Liabilities.findUnique({
            where: {accounting_system_id: system_id},
            select: {
               transactions: {
                  where: {createdAt: {gte: firstDayOfMonth}, status: {in: ['Completed', 'Pending']}},
                  select: {actual_amount: true, createdAt: true}
               }
            }
         })

         if (revenues?.transactions) {
            for (const ele of revenues.transactions) {
               const transPerDay: number = ele.createdAt.getDate();
               result[transPerDay - 1].revenue += Number(ele.actual_amount);
            }
         }

         if (expenses?.transactions) {
            for (const ele of expenses.transactions) {
               const transPerDay: number = ele.createdAt.getDate();
               result[transPerDay - 1].expenses += Number(ele.actual_amount);
            }
         }

         result.forEach((ele) => {
            ele.balance = ele.revenue - ele.expenses
         })
      } catch (err) {
         console.log(err)
         return (next(ApiError.CreateError("Server error during retreiving daily month graph Information!", 500, null)))
      }

      return (SuccessfulyResponse(res, "Successfuly Response with graph!", {result, system_id}))
   }


   public OverviewGraph = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const system_id = (req as any).accounting.company_id

      const currYear = new Date().getFullYear();
      const firstDayOfYear = new Date(currYear, 0, 1)

      let result: {month: string, revenue: number, expenses: number, balance: number}[] = [];
      const currMonth = new Date().getMonth()+1
      const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
         ]

      months.forEach((ele, i) => {
         if (i < currMonth)
            result[i] = {month: ele, revenue: 0, expenses: 0, balance: 0}
      })

      try {
         const revenues = await PrismaInstance.accounting_Assets.findUnique({
            where: {accounting_system_id: system_id},
            select: {
               transactions: {
                  where: {createdAt: {gte: firstDayOfYear}, status: {in: ['Completed', 'Pending']}},
                  select: {actual_amount: true, createdAt: true}
               }
            }
         })

         const expenses = await PrismaInstance.accounting_Liabilities.findUnique({
            where: {accounting_system_id: system_id},
            select: {
               transactions: {
                  where: {createdAt: {gte: firstDayOfYear}, status: {in: ['Completed', 'Pending']}},
                  select: {actual_amount: true, createdAt: true}
               }
            }
         })

         if (revenues?.transactions) {
            for (const ele of revenues.transactions) {
               const transMonth: number = ele.createdAt.getMonth();
               result[transMonth].revenue += Number(ele.actual_amount);
            }
         }

         if (expenses?.transactions) {
            for (const ele of expenses.transactions) {
               const transMonth: number = ele.createdAt.getMonth();
               result[transMonth].expenses += Number(ele.actual_amount);
            }
         }

         result.forEach((ele) => {
            ele.balance = ele.revenue - ele.expenses
         })
      } catch (err) {
         return (next(ApiError.CreateError("Server error during retreiving Graph Information!", 500, null)))
      }

      return (SuccessfulyResponse(res, "Successfuly Response with graph!", {result, system_id}))
   }


   public AccountingBalanceEquation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const system_id = (req as any).accounting.company_id

      try {
         const assets = await PrismaInstance.transactions.aggregate({
            where: {accounting_system_id: system_id, asset_id: system_id, status: {in: ['Completed', 'Pending']}},
            _sum: {actual_amount: true}
         })

         const liabilities = await PrismaInstance.transactions.aggregate({
            where: {accounting_system_id: system_id, liability_id: system_id, status: {in: ['Completed', 'Pending']}},
            _sum: {actual_amount: true}
         })

         const system = await PrismaInstance.accounting.findUnique({
            where: {company_id: system_id},
            select: {
               assets: {select: {current_month_rate: true, prev_month_rate: true}},
               liabilities: {select: {current_month_rate: true, prev_month_rate: true}},
            }
         })

         const equity = Number(assets._sum.actual_amount) - Number(liabilities._sum.actual_amount)
         const equityRates = { current_month_rate: Number(system?.assets?.current_month_rate) - Number(system?.liabilities?.current_month_rate),
                                 prev_month_rate: Number(system?.assets?.prev_month_rate) - Number(system?.liabilities?.prev_month_rate) }

         return (SuccessfulyResponse(res, "SuccessfulyResponse", {assets: {total: Number(assets._sum.actual_amount), rates: system?.assets},
                           liabilities: {total: Number(liabilities._sum.actual_amount), rates: system?.liabilities},
                           equity: {total: equity, rates: equityRates}}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during retreiving Total Assets!", 500, null)))
      }
   }


   public Transaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userId: string = (req as any).id
      const accounting = (req as any).accounting
      const body = req.body
      const category = (req as any).transaction_category

      const encryptBody = encryptObject(body)
      const obligatories = {customer_name: encryptBody.customer_name, customer_email: encryptBody.customer_email, customer_phone_number: encryptBody.customer_phone_number}

      let transaction: Transactions;
      try {
         if (category === "assets") {
            transaction = await PrismaInstance.transactions.create({
               data: {
                  user_recorded_id: userId, asset_id: accounting?.company_id,
                  accounting_system_id: accounting?.company_id, actual_amount: body.actual_amount,
                  ...body, ...obligatories, 
               }
            })
            await PrismaInstance.accounting_Assets.update({
               where: {accounting_system_id: accounting.company_id},
               data: {current_month_rate: {increment: Number(transaction.actual_amount)}}
            })
         } else {
            transaction = await PrismaInstance.transactions.create({
               data: {
                  user_recorded_id: userId, liability_id: accounting?.company_id,
                  accounting_system_id: accounting?.company_id, actual_amount: body.actual_amount,
                  ...body, ...obligatories
               }
            })
            await PrismaInstance.accounting_Liabilities.update({
               where: {accounting_system_id: accounting.company_id},
               data: {current_month_rate: {increment: Number(transaction.actual_amount)}}
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
      const transaction = (req as any).transaction
      const { invoice_number } = req.body
      const invoice_url = (req as any).invoice_url

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


   public OneInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const {invoice_id} = req.query
      const transaction = (req as any).transaction

      try {
         const invoice: (Invoices | null) = await PrismaInstance.invoices.findUnique({
            where: {
               id: invoice_id as string, transaction_id: transaction?.id
            }
         })

         if (!invoice)
            return (next(ApiError.CreateError("Invoice not found!", 404, null)))

         const dcrypted = {
            invoice_number: decrypting(invoice.invoice_number),
            invoiceLink: decrypting(invoice.invoiceLink as string)
         }

         return (SuccessfulyResponse(res, "Successfuly invoice retreived!", {...invoice, ...dcrypted}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during retreiving the invoice details!", 500, null)))
      }
   }
}

export default AccountinController;
