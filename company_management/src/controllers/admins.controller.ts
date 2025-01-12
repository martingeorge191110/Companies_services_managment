#!/usr/bin/env ts-node
import { NextFunction, Request, Response } from "express";
import PrismaInstance from "../prisma.db";
import AdminsValidation from "../validators/admins.validation.ts";
import bcrypt from 'bcrypt'
import { SuccessfulyResponse } from "../utilies/global.utilies.ts";
import ApiError from "../middlewares/api.errors.ts";


/**
 * AdminController - admins controller to manage admins operations
 */
class AdminController extends AdminsValidation {



   public FirstAdmin = async (req: Request, res: Response, next: NextFunction) => {
      /**
       * Finction to regsiter new admins when the user need
       */
      const body = req.body
      const hashedPass = bcrypt.hashSync(body.password, 10)
      try {
         const admin = await PrismaInstance.admins.create({
            data: {
               f_n: body.f_n, l_n: body.l_n, email: body.email, phone_number: body.phone_number,
               password: hashedPass, con_pass: hashedPass, last_login: new Date(), role: "Admin"
            }
         })

         SuccessfulyResponse(res, "First admin has been added!", {...admin})
      } catch (err) {
         return (next(ApiError.CreateError("Server error during Create data for firt admin!", 500, null)))
      }
   }
}

export default AdminController;
