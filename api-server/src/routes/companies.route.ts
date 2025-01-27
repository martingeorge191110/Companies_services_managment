#!/usr/bin/env ts-node
import { Router } from "express";
import CompaniesController from "../controllers/companies.controller.ts";
import { userVerifyToken } from "../middlewares/verify.token.ts";
import { ValidationError } from "../validators/common.validators.ts";



const CompaniesRoute: Router = Router()
const companiesIntance:  CompaniesController = new CompaniesController()


CompaniesRoute.use(userVerifyToken)


CompaniesRoute.route("/database/")
         .get(companiesIntance.GetAllUserCompanies)


CompaniesRoute.route("/dashboard/")
         .get(companiesIntance.companyIdQuery(), ValidationError, companiesIntance.CompanyDashoard)
         .put(companiesIntance.companyIdQuery(), ValidationError, companiesIntance.UpdateInfo)



export default CompaniesRoute;
