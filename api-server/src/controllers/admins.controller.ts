#!/usr/bin/env ts-node
import { NextFunction, Request, Response } from "express";
import PrismaInstance from "../prisma.db";
import AdminsValidation from "../validators/admins.validation.ts";
import bcrypt from 'bcrypt'
import { SuccessfulyResponse } from "../utilies/global.utilies.ts";
import ApiError from "../middlewares/api.errors.ts";
import { Admins } from "@prisma/client";
import { createToken, setCookie } from "../utilies/auth.utilies.ts";


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


   public Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * Function to facilitate the login process for admins of the website!
       * take email and password, then take into the process,
       *       ---> if there is no records will response
       *       ---> multiple login process with wrong password will block the account temporrrily
       *       ---> reponse succesfully with right info
       */
      const {email, password} = req.body as {email: string, password: string}

      const result: {admin: (Admins | null), token: (string | null)} = {admin: null, token: null}
      try {
         result.admin = await PrismaInstance.admins.findUnique({
            where: {
               email: email
            }
         })
         if (!result.admin)
            return (next(ApiError.CreateError("Email address or Password may be not true!", 404, null)))

         if (result.admin.no_wrong_pass > 3)
            return (next(ApiError.CreateError("Must Contact with the adminstration, your account has been blocked because of multiple trying to login!", 403, null)))

      } catch (err) {
         return (next(ApiError.CreateError("Server error during login process!", 500, null)))
      }

      const isPassword: boolean = bcrypt.compareSync(password, result.admin?.password || "")
      try {
         if (!isPassword)
            await PrismaInstance.admins.update({
               where: {email: email}, data: {no_wrong_pass: {increment: 1}}
            })
      } catch (err) {
         return (next(ApiError.CreateError("Server error during login with wrong email or password!", 500, null)))
      }
      if (!isPassword)
         return (next(ApiError.CreateError("Wrong Password", 400, null)))

      const token: string = createToken(result.admin.id)
      setCookie(res, token)
      result.token = token
      return (SuccessfulyResponse(res, "You are logined!", result))
   }

}

export default AdminController;
