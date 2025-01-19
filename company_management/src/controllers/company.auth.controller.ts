#!/usr/bin/env ts-node
import ApiError from "../middlewares/api.errors.ts";
import { Response, Request, NextFunction } from "express";
import { Companies, Companies_Agents, Users } from "@prisma/client";
import CompanyAuthValidator from "../validators/company.auth.validator.ts";
import PrismaInstance from "../prisma.db.ts";
import { sendMail, SuccessfulyResponse } from "../utilies/global.utilies.ts";
import {v4} from 'uuid'
import { decrypting, encrypting } from "../utilies/encrypt.dcrypt.ts";
import { stripeSession } from "../utilies/stripe.utilies.ts";

/**
 * CompanyAuthController - Class that responsible for company registering functions
 */
class CompanyAuthController extends CompanyAuthValidator {


   public Resiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * Register - this controller function to register the company account on our records
       * then send mail to the company mail
       */
      const body = req.body
      const agentId = (req as any).id

      let agent: (Users | null);
      try {
         agent = await PrismaInstance.users.findUnique({
            where: {id: agentId}
         })
      } catch (err) {
         return (next(ApiError.CreateError("Server error durting request company account!", 500, null)))
      }

      if (!agent)
         return (next(ApiError.CreateError("We didnot find any record for your account, register or contact with the adminstration if you have any problem!", 404, null)))

      let company: (Companies), company_agent: (Companies_Agents);
      try {
         company = await PrismaInstance.companies.create({
            data: {name: body.name, email: body.email, phone_number: body.phone_number, business_type: body.business_type}
         })

         company_agent = await PrismaInstance.companies_Agents.create({
            data: {
               company_id: company.id, agent_id: agent.id, admin: true, assigned_role: body.assigned_role,
               relationship_status: body.relationship_status, start_date: new Date(), salary: Number(body.salary)
            }
         })
      } catch (err) {
         console.log(err)
         return (next(ApiError.CreateError("Server error during Record company data!", 500, null)))
      }

      try {
         const session = await stripeSession(req, {company, company_agent, duration: 12, amount: 100000})
         if (!session)
            return (next(ApiError.CreateError("error while creating payment session, please try again or contact with the adminstration!", 400, null)))
      
      return (SuccessfulyResponse(res, "Successfuly created an payment session, lets work together now!", {url: session.url, company, company_agent}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during creating a payment session!", 500, null)))
      }
   }

}

export default CompanyAuthController;
