#!/usr/bin/env ts-node
import { Router } from "express";
import CompaniesController from "../controllers/companies.controller.ts";
import { userVerifyToken } from "../middlewares/verify.token.ts";
import { ValidationError } from "../validators/common.validators.ts";
import AccountingRoute from "./accounting.routes.ts";
import { DashboardUserMiddleware } from "../middlewares/company.dashboard.user.ts";



const CompaniesRoute: Router = Router()
const companiesIntance:  CompaniesController = new CompaniesController()


CompaniesRoute.use(userVerifyToken)


CompaniesRoute.route("/database/")
         .get(companiesIntance.GetAllUserCompanies)


CompaniesRoute.route("/dashboard/")
         .all(companiesIntance.companyIdQuery(), ValidationError, DashboardUserMiddleware)
         .get(companiesIntance.CompanyDashoard)
         .put(companiesIntance.UpdateInfo)


CompaniesRoute.use('/accounting', AccountingRoute)


export default CompaniesRoute;
