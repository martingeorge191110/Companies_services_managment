#!/usr/bin/env ts-node
import { Router } from "express";
import CompanyAuthController from "../controllers/company.auth.controller.ts";
import { ValidationError } from "../validators/common.validators.ts";


const CompanyAuthRoute: Router = Router()

const companyInstance = new CompanyAuthController()


CompanyAuthRoute.route("/register/").post(
   companyInstance.registerValidor(), ValidationError, companyInstance.Resiter
)


export default CompanyAuthRoute;
