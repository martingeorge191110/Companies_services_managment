#!/usr/bin/env ts-node
import { Accounting, Companies } from "@prisma/client";
import { body, Meta, query, ValidationChain } from "express-validator";
import PrismaInstance from "../prisma.db.ts";



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

                     if (ele === 'paymentMethod' && !['Cash', 'Credit_Card', 'Debit_Card', 'Bank_Transfer', 'Digital_Wallets'].includes(val))
                        throw (new Error(`${ele} is not valid value!`))

                     const types = ['ACCOUNTS_RECEIVABLE', 'ACCOUNTS_PAYABLE', 'CASH_FLOW', 'EXPENSES', 'REVENUES', 'FIXED_ASSETS', 'INVESTMENTS', 'LIABILITIES', 'EQUITY', 'TAX_PAYMENTS', 'MISCELLANEOUS']
                     if (ele === 'type' && !types.includes(val))
                        throw (new Error(`${ele} is not valid value!`))
                  })
            )
         })
      ])
   }
}

export default AccountingValidator;
