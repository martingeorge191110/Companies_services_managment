#!/usr/bin/env ts-node
import { Router } from "express";
import AccountinController from "../controllers/accounting.controller.ts";
import { userVerifyToken } from "../middlewares/verify.token.ts";
import { ValidationError } from "../validators/common.validators.ts";
import { AccountingUsersMiddleware } from "../middlewares/accounting.users.ts";


const AccountingRoute: Router = Router()
const accountinInstance = new AccountinController()

AccountingRoute.use(userVerifyToken)


/* Just website admins has the ability to do this */
AccountingRoute.route("/register/")
            .post(accountinInstance.createAccountValid(), ValidationError, accountinInstance.CreateAccount)



AccountingRoute.route("/transaction/")
            .all(accountinInstance.systemIdValid(), ValidationError, AccountingUsersMiddleware)
            .post(accountinInstance.isTransactionValid(), ValidationError, accountinInstance.Transaction)


export default AccountingRoute;
