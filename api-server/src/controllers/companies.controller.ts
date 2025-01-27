#!/usr/bin/env ts-node
import { Request, Response, NextFunction } from "express";
import CompaniesValidator from "../validators/companies.validator";
import ApiError from "../middlewares/api.errors.ts";
import { Companies, Companies_Agents, Prisma, Users } from "@prisma/client";
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
      const currentDate = new Date()

      if (company.account_exp_date && company.account_exp_date < currentDate)
         return (next(ApiError.CreateError("Your subiscription is not valid any more, please update your subiscription to make it easy to access system!", 403, null)))
      else
         console.log(true)
      return (SuccessfulyResponse(res, "Successfuly retreived the company dashboard information!", {...company}))
   }


   public UpdateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = (req as any).id
      const company = (req as any).company
      const body = req.body
      const inValidData = ['id', 'email', 'phone_number', 'business_type', 'avatar', 'active_permission', 'purchased_system', 'amount_paid', 'valid_account', 'months_of_subiscription', 'account_exp_date']
      const validData = ['name', 'registration_number', 'address', 'currency', 'specialize']

      Object.entries(body).forEach((ele) => {
         if (inValidData.includes(ele[0]))
            return (next(ApiError.CreateError(`You are not allowed to update ${ele}`, 403, null)))
         else if (!validData.includes(ele[0]))
            return (next(ApiError.CreateError("This will cause a conflict!", 400, null)))
      })

      try {
         const authUser: (Companies_Agents | null) = await PrismaInstance.companies_Agents.findUnique({
            where: {agent_id_company_id: {agent_id: id, company_id: company.id}}
         })

         if (!authUser)
            return (next(ApiError.CreateError("You are not authorized to do this action!", 403, null)))

         const updatedInfo: (Companies) = await PrismaInstance.companies.update({
            where: {id: company.id},
            data: {...body}
         })

         return (SuccessfulyResponse(res, "Company information has been updated!", {...updatedInfo}))

      } catch (err) {
         return (next(ApiError.CreateError("Server error during updating company information!", 500, null)))
      }

   }
}

export default CompaniesController;
