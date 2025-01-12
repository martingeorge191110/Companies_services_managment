#!/usr/bin/env ts-node
import { body, Meta, ValidationChain } from "express-validator";
import PrismaInstance from "../prisma.db.ts";



class AdminsValidation {



   public firstAdmin = (): ValidationChain[] => {
      /**
       * Function that validate first admin information
       */
      return ([
         body("email")
            .trim().notEmpty().withMessage("Email address feild is Required!")
            .isEmail().withMessage("This is not a valid email address!")
            .custom( async (val: string, {req}: Meta): Promise<boolean | void> => {
               try {
                  const admin = await PrismaInstance.admins.findUnique({
                     where: {
                        email: val
                     }
                  })

                  if (admin){
                     throw (new Error("we have this email in our records!"))
                  }

                  return (true)
               } catch (err) {
                  throw (err)
               }
            }),
         body("password")
            .trim().notEmpty().withMessage("password feild is Required!"),
         body("con_pass")
            .trim().notEmpty().withMessage("This feild is Required")
            .custom((val: string, {req}: Meta) => {
               if (val !== req.body.password)
                  throw (new Error("Passwords dont match!"))

               return (true)
            })
      ])
   }


   public loginValid = (): ValidationChain[] => {
      return ([
         body("email")
            .trim().notEmpty().withMessage("This feild is Required!")
            .isEmail().withMessage("This feild is Required!"),
         body("password")
            .trim().notEmpty().withMessage("This feild is Required!")
      ])
   }

}

export default AdminsValidation;
