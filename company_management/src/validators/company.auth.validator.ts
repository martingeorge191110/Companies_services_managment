#!/usr/bin/env ts-node
import { body, Meta, ValidationChain } from 'express-validator'
import PrismaInstance from '../prisma.db'


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
                  const company = await PrismaInstance.companies.findUnique({
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
            .withMessage("Not valid business type!")
      ])
   }
}

export default CompanyAuthValidator;
