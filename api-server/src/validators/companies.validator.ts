#!/usr/bin/env ts-node
import { Companies } from "@prisma/client";
import { Meta, ValidationChain, query } from "express-validator";
import PrismaInstance from "../prisma.db.ts";



class CompaniesValidator {



   public companyIdQuery = (): ValidationChain[] => {
      return ([
         query("company_id")
            .trim().notEmpty().withMessage("Company id feild is required in query!")
            .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const company: (Companies | null) = await PrismaInstance.companies.findUnique({
                     where: {id: val}
                  })
                  
                  if (!company)
                     throw (new Error("Company is not found"))

                  req.company = company
                  return (true)
               } catch (err) {
                  throw (err)
               }
            })
      ])
   }
}

export default CompaniesValidator;
