#!/usr/bin/env ts-node
import { query } from "express-validator";
import { body, check, ValidationChain } from "express-validator";



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


   public searchingValidation = (): ValidationChain[] => {
      return ([
         query("feild")
            .trim().notEmpty().withMessage("Please choose the feild you want to search by!")
            .isIn(["email", "phone_number"]).withMessage("We are very sorry, you have to search by email or phone number!"),
         query("value")
            .trim().notEmpty().withMessage("Value is required!")
            .isString().withMessage("Value Must be a string")
      ])
   }
}

export default UserValidation;
