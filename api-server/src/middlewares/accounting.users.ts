#!/usr/bin/env ts-node
import { Accounting } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ApiError from "./api.errors.ts";
import PrismaInstance from "../prisma.db.ts";




export const AccountingUsersMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const id = (req as any).id
   const accounting: Accounting = (req as any).accounting

   try {
      const asAgentUser = await PrismaInstance.companies_Agents.findUnique({
         where: {agent_id_company_id: {company_id: accounting.company_id, agent_id: id}}
      })
      const asAuthEmployee = await PrismaInstance.companies_System_Employees.findUnique({
         where: {
            employee_id_company_id: {company_id: accounting.company_id, employee_id:id}
         }, select: {access_level: true}
      })

      if (!asAgentUser && !asAuthEmployee)
         return (next(ApiError.CreateError("Unauthorized to treat with accounting transactions!", 403, null)))

      if (!asAgentUser && asAuthEmployee &&asAuthEmployee?.access_level < 4)
         return (next(ApiError.CreateError("Unauthorized to treat with accounting transactions!", 403, null)))

      return (next())
   } catch (err) {
      return (next(ApiError.CreateError("Server error during checking the authorization of this operation!", 500, null)))
   }
}
