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
      
      if (asAgentUser)
         return (next())

      const asAuthEmployee = await PrismaInstance.companies_System_Employees.findUnique({
         where: {
            employee_id_company_id: {company_id: accounting.company_id, employee_id:id}
         }, select: {
            access_systems: {
               select: {system: true}
            }
         }
      })

      if (!asAgentUser && !asAuthEmployee)
         return (next(ApiError.CreateError("Unauthorized to treat with accounting transactions!", 403, null)))

      const systemsLen = asAuthEmployee?.access_systems.length
      if (!asAgentUser && systemsLen && systemsLen > 0 && asAuthEmployee.access_systems.some((ele) => ele.system === 'Accounting'))
         return (next(ApiError.CreateError("Unauthorized to treat with accounting transactions!", 403, null)))

      return (next())
   } catch (err) {
      return (next(ApiError.CreateError("Server error during checking the authorization of this operation!", 500, null)))
   }
}
