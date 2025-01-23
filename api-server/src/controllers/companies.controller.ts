#!/usr/bin/env ts-node
import { Request, Response, NextFunction } from "express";
import CompaniesValidator from "../validators/companies.validator";
import ApiError from "../middlewares/api.errors.ts";
import { Companies, Prisma, Users } from "@prisma/client";
import PrismaInstance from "../prisma.db.ts";
import { SuccessfulyResponse } from "../utilies/global.utilies";




class CompaniesController extends CompaniesValidator {



   public GetAllUserCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userId: string = (req as any).id

      try {
         const agentCompanies = await PrismaInstance.companies_Agents.findMany({
            where: {agent_id: userId},
            select: {
               company: {
                  select: {id: true, name: true, avatar: true}
               }
            }
         })

         const employeeCompanies = await PrismaInstance.companies_System_Employees.findMany({
            where: {employee_id: userId},
            select: {
               company: {
                  select: {id: true, name: true, avatar: true}
               }
            }
         })

         return (SuccessfulyResponse(res, "Successfuly retreived the companies!", {agentCompanies, employeeCompanies}))
      } catch(err) {
         return (next(ApiError.CreateError("Server error when trying to access your company data!", 500, null)))
      }
   }


   public CompanyDashoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const company: Companies = (req as any).company
      return (SuccessfulyResponse(res, "Successfuly retreived the company dashboard information!", {...company}))
   }
}

export default CompaniesController;
