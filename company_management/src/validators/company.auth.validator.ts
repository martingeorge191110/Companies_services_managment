#!/usr/bin/env ts-node
import { body, Meta, ValidationChain } from 'express-validator'
import PrismaInstance from '../prisma.db'
import { Companies } from '@prisma/client'


/**
 * CompanyAuthValidator - Class that validate the authintication process
 */
class CompanyAuthValidator {

   public registerValidor = (): ValidationChain[] => {
      /**
       * Validate registeration process
       * name, email, phone number, business type
       */
      return ([
         body("name")
            .trim().notEmpty().withMessage("Your Company name is Required!"),
         body("email")
            .trim().notEmpty().withMessage("Your Company email is Required!")
            .isEmail().withMessage("This email is not Valid!")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const company: (Companies | null) = await PrismaInstance.companies.findUnique({
                     where: {
                        email: val
                     }
                  })

                  if (company)
                     throw (new Error("We have records for this company!"))

                  return (true)
               } catch (err) {
                  return (false)
               }
            }),
         body("phone_number")
            .trim().notEmpty().withMessage("Company Phone Number  is Required!"),
         body("business_type")
            .trim().notEmpty().withMessage("Company Business Type is Required!")
            .isIn(["Accounting", "Finance", "Retail", "Manufacturing", "Healthcare", "Technology", "Education", "Hospitality", "Transportation"])
            .withMessage("Not valid business type!"),
         body("relationship_status")
            .trim().notEmpty().withMessage("relationship_status feild is Required!"),
         body("assigned_role")
            .trim().notEmpty().withMessage("assigned_role feild is Required!"),
         body("started_at")
            .trim().notEmpty().withMessage("Company starting date is Required!"),
         body("salary")
            .trim().notEmpty().withMessage("Your current salary feild is Required!")
      ])
   }

   public validateAccountValid = (): ValidationChain[] => {
      return ([
         body("email")
            .trim().notEmpty().withMessage("Email Feild is Required!")
            .isEmail().withMessage("Not Valid email address")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const company: (Companies | null) = await PrismaInstance.companies.findUnique({
                     where: {
                        email: val
                     }
                  })

                  if (!company)
                     throw (new Error("we dont have this account!, please try to register or contact with the customer services!"))

                  req.company = company
                  return (true)
               } catch (err) {
                  throw (err || new Error("Server error during validating your account and start pament session!"))
               }
            }),
         body("gen_code")
            .trim().notEmpty().withMessage("gen_code Feild is Required!")
      ])
   }
}

export default CompanyAuthValidator;
