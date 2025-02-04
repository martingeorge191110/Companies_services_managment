#!/usr/bin/env ts-node
import { Companies, Companies_Agents } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ApiError from "./api.errors.ts";
import PrismaInstance from "../prisma.db.ts";




export const DashboardUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const userId: string = (req as any).id
   const company: Companies = (req as any).company

   try {
      const companyAgent: (Companies_Agents | null) = await PrismaInstance.companies_Agents.findUnique({
         where: {agent_id_company_id: {agent_id: userId, company_id: company.id}}
      })

      if (companyAgent) {
         req.agent = true
         return (next())
      }
      req.agent = false

      const companyEmployee = await PrismaInstance.companies_System_Employees.findUnique({
         where: {employee_id_company_id: {employee_id: userId, company_id: company.id}},
         select: {
            access_systems: {
               select: {system: true}
            }
         }
      })

      if (!companyAgent && !companyEmployee)
         return (next(ApiError.CreateError("Unauthorized to treat with This company dashboard!", 403, null)))

      const employee_systems = companyEmployee?.access_systems.map((ele) => ele.system)
      req.employee_systems = employee_systems

      return (next())
   } catch (err) {
      return (next(ApiError.CreateError("Server error during determining your level of authorization in the company systemes!", 500, null)))
   }
}
