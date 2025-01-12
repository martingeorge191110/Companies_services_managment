#!/usr/bin/env ts-node
import ApiError from "../middlewares/api.errors.ts";
import { Response, Request, NextFunction } from "express";
import { Companies } from "@prisma/client";
import CompanyAuthValidator from "../validators/company.auth.validator.ts";
import PrismaInstance from "../prisma.db.ts";
import { sendMail, SuccessfulyResponse } from "../utilies/global.utilies.ts";
import {v4} from 'uuid'
import { decrypting, encrypting } from "../utilies/encrypt.dcrypt.ts";


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

      const genCode = v4().split("-")

      let company: Companies;
      const currentDate = new Date()
      const encData = encrypting(genCode[genCode.length - 1])

      try {
         company = await PrismaInstance.companies.create({
            data: {
               name: body.name, email: body.email, phone_number: body.phone_number, business_type: body.business_type,
               gen_code: encData, exp_date: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
            }
         })
      } catch (err) {
         return (next(ApiError.CreateError("Server error durting request company account!", 500, null)))
      }

      const decData = decrypting(encData)
      const htmlCode = `
      <h1>Welcome to Our Platform</h1>
      <p>We are excited to have you with us! To get started, please make your first payment by visiting the link below.</p>
      <p>
         <a href="https://your-website.com/payment" target="_blank" 
            style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
            Proceed to Payment
         </a>
      </p>
      <p>After successful payment, we will contact you to guide you through the next steps, inform you about your next payment period, and introduce you to our system's facilities.</p>
      <h2 style="margin-top: 20px; color: #333;">Payment Details:</h2>
      <p style="font-size: 16px; color: #555;">
         <strong>Generated Code:</strong> <span style="font-weight: bold; color: #007bff;">${decData}</span><br>
         <strong>Expiration Date:</strong> <span style="font-weight: bold; color: #ff0000;">${company.exp_date}</span>
      </p>
      <p>Please ensure you use the generated code before the expiration date to complete your payment.</p>
      <h3 style="color: #555;">Thank you ${company.name} for choosing our platform!</h3>
      <h2>Best regards,<br> The Platform Team</h2>
      `;


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
