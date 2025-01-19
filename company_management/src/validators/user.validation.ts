#!/usr/bin/env ts-node
import { check, ValidationChain } from "express-validator";



class UserValidation {


   public infoValidation = (): ValidationChain[] => {
      const items = ['monthly_income', 'monthly_tax']

      return ([
         check("role")
            .trim().isString().withMessage("Role Feild must be a string!"),
         ...items.map((ele) => {
            return (
               check(ele)
                  .optional()
                  .isNumeric()
                  .withMessage(`${ele} must be a valid number!`)
            )
         })
      ])
   }
}

export default UserValidation;
