#!/usr/bin/env ts-node
import { Request, Response, NextFunction } from "express";
import UserAuthValidation from "../validators/users.auth.validation.ts";
import ApiError from "../middlewares/api.errors.ts";
import { Users } from "@prisma/client";
import PrismaInstance from "../prisma.db.ts";
import bcrypt from "bcrypt";
import { createToken, setCookie } from "../utilies/auth.utilies.ts";
import { SuccessfulyResponse } from "../utilies/global.utilies.ts";


/**
 * UserAuthController - Class for managing user authintication process and functions
 */
class UserAuthController extends UserAuthValidation {


   public Register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * Regsiter function, controller to recoreding the user data
       */
      const body = req.body
      const hashedPass: string = bcrypt.hashSync(body.password, 10)
      try {
         const user: Users = await PrismaInstance.users.create({
            data: {
               f_n: body.f_n, l_n: body.l_n, email: body.email, password: hashedPass, con_pass: hashedPass, is_online: true, last_login: new Date()
            }
         })

         const token: string = createToken(user.id)

         setCookie(res, token)

         return (SuccessfulyResponse(res, "Succesfully Regsitered!", {...user, token}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during Regsitering!", 500, null)))
      }
   }


   public Login = async (req: Request, res: Response, next: NextFunction) => {
      /**
       * Login Controller which create the login process
       */
      const user: (Users | null) = (req as any).user || null
      const body = req.body

      console.log(user?.password, body.password)
      const isPassTrue: boolean = bcrypt.compareSync(body.password, user?.password || "")
      if (!isPassTrue)
         return (next(ApiError.CreateError("Password is not true!", 400, null)))

      let userUpdated: Users;
      try {
         userUpdated = await PrismaInstance.users.update({
            where: {id: user?.id || ""},
            data: {last_login: new Date(), is_online: true}
         })
      } catch (err) {
         return (next(ApiError.CreateError("Server error during loginning process!", 500, null)))
      }

      const token: string = createToken(userUpdated.id)
      setCookie(res, token)

      return (SuccessfulyResponse(res, "Succesfully logined!", {...userUpdated, token}))
   }


   public VerifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id: string = (req as any).id

      try {
         const user: (Users | null) = await PrismaInstance.users.findUnique({
            where: {id}
         })

         return (SuccessfulyResponse(res, "Account is Valid!", {...user}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during verifying user token!", 500, null)))
      }
   }
}

export default UserAuthController;
