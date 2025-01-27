#!/usr/bin/env ts-node
import { NextFunction, Response, Request } from "express";
import AccountingValidator from "../validators/accounting.validator.ts";
import { Admins, Companies } from "@prisma/client";
import ApiError from "../middlewares/api.errors.ts";
import PrismaInstance from "../prisma.db.ts";
import { SuccessfulyResponse } from "../utilies/global.utilies.ts";




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
      
   }
}

export default AccountinController;
