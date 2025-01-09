#!/usr/bin/env ts-node
import ApiError from "../middlewares/api.errors.ts";
import { Response, Request, NextFunction } from "express";
import { Companies } from "@prisma/client";
import CompanyAuthValidator from "../validators/company.auth.validator.ts";
import PrismaInstance from "../prisma.db.ts";
import { sendMail, SuccessfulyResponse } from "../utilies/global.utilies.ts";


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
      
      let company: Companies;
      try {
         company = await PrismaInstance.companies.create({
            data: {
               name: body.name, email: body.email, phone_number: body.phone_number, business_type: body.business_type
            }
         })
      } catch (err) {
         return (next(ApiError.CreateError("Server error durting request company account!", 500, null)))
      }

      const htmlCode = `
      <h1>Welcome to Our Platform</h1>
      <p>We are thrilled to have you onboard and look forward to helping you achieve your goals!</p>
      <h2>Our team will be in touch with you very soon. Please keep an eye on your email and phone for updates from us.</h2>
      <p>If you have any questions in the meantime, feel free to reach out to us.</p>
      <h3>Thank you, ${company.name}!</h3>
      <h2>Best regards,<br> The Platform Team</h2>`;

      try {
         const mail: boolean = await sendMail(company.email, "Open your own account and system on our COMPANIES platform!", htmlCode)
         if (!mail)
            return(next(ApiError.CreateError("Error during sending a mail!", 400, null)))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during sending mail!", 500, null)))
      }

      return SuccessfulyResponse(res, "Successfuly registered, will contact soon!", {...company})
   }
}

export default CompanyAuthController;
