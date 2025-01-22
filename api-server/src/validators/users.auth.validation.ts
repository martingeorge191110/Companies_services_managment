#!/usr/bin/env ts-node
import { body, Meta, ValidationChain } from "express-validator";
import { Request } from "express";
import { Users } from "@prisma/client";
import PrismaInstance from "../prisma.db";
import { userInfo } from "os";




class UserAuthValidation {


   public registerValidation = (): ValidationChain[] => {
      /* This function validate the data from register controller */
      const nullishData = ["f_n", "l_n", "email", "password", "con_pass"]
      return ([
         ...nullishData.map((ele) => {
            return (
               body(ele)
                  .trim().notEmpty().withMessage(`${ele} feild is required!`)
                  .isString().withMessage("This feild must be a string!")
                  .custom(async (val: string, {req}: Meta): Promise<boolean | void> => {
                     switch (ele) {
                        case 'con_pass':
                           if (req.body.password !== val) {
                              throw (new Error("passwords dont match each other!"))
                           } else
                              return (true);
                        case 'email':
                           try {
                              const user: (Users | null) = await PrismaInstance.users.findUnique({
                                 where: {
                                    email: val
                                 }
                              })

                              if (user)
                                 throw (new Error("You already have an account!"))

                              return (true)
                           } catch (err) {
                              throw (err)
                           }
                        default:
                           return (true)
                     }
                  })
            )
         })
      ])
   }

   public loginValidation = (): ValidationChain[] => {
      return ([
         body("email")
            .trim().notEmpty().withMessage("Email field is required!")
            .isEmail().withMessage("Please provide a valid email address!")
            .custom(async (val: string, {req}: Meta): Promise<void | boolean> => {
               try {
                  const user: (Users | null) = await PrismaInstance.users.findUnique({
                     where: {email: val}
                  })

                  if (!user)
                     throw (new Error("You dont have an account, please Regsiter at first!"))

                  req.user = user
                  return (true)
               } catch (err) {
                  throw (err)
               }
            }),
         body("password")
            .trim().notEmpty().withMessage("Password field is required!")
         ])
   }
}

export default UserAuthValidation;
