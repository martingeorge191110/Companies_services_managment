#!/usr/bin/env ts-node
import { Router } from "express";
import UserAuthController from "../controllers/users.auth.controller.ts";
import { ValidationError } from "../validators/common.validators.ts";
import { userVerifyToken } from "../middlewares/verify.token.ts";



const UserAuthRoutes: Router = Router()
const userAuthInstance: UserAuthController = new UserAuthController()

UserAuthRoutes.route("/register/")
         .post(userAuthInstance.registerValidation(), ValidationError, userAuthInstance.Register)


UserAuthRoutes.route("/login/")
         .post(userAuthInstance.loginValidation(), ValidationError, userAuthInstance.Login)



UserAuthRoutes.route("/validate-token/")
         .get(userVerifyToken, userAuthInstance.VerifyToken)

export default UserAuthRoutes;
