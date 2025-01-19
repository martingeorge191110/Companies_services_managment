#!/usr/bin/env ts-node
import { Router } from "express";
import CompanyAuthController from "../controllers/company.auth.controller.ts";
import { ValidationError } from "../validators/common.validators.ts";
import { userVerifyToken } from "../middlewares/verify.token.ts";


const CompanyAuthRoute: Router = Router()

const companyInstance = new CompanyAuthController()

CompanyAuthRoute.use(userVerifyToken)

CompanyAuthRoute.route("/register/").post(
   companyInstance.registerValidor(), ValidationError, companyInstance.Resiter
)



export default CompanyAuthRoute;
