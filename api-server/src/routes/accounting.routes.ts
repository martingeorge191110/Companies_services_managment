#!/usr/bin/env ts-node
import { Router } from "express";
import AccountinController from "../controllers/accounting.controller.ts";
import { userVerifyToken } from "../middlewares/verify.token.ts";
import { ValidationError } from "../validators/common.validators.ts";
import { AccountingUsersMiddleware } from "../middlewares/accounting.users.ts";
import uploader from "../middlewares/multer.uploader.ts";
import { uploadInvoices } from "../utilies/cloudinary.utilies.ts";



const AccountingRoute: Router = Router()
const accountingInstance = new AccountinController()




AccountingRoute.use(userVerifyToken)


/* Just website admins has the ability to do this */
AccountingRoute.route("/register/")
            .post(accountingInstance.createAccountValid(), ValidationError, accountingInstance.CreateAccount)


/**
 * ALL - Middlewares that validate the accoutning system id && sure about whether user is authorized
 * POST - Create a transaction
 */
AccountingRoute.route("/transaction/")
            .all(accountingInstance.systemIdValid(), ValidationError, AccountingUsersMiddleware)
            .post(accountingInstance.isTransactionValid(), ValidationError, accountingInstance.Transaction)



AccountingRoute.route("/invoice/:transactions_id/:invoice_id/")
            .all(accountingInstance.systemIdValid(), ValidationError, AccountingUsersMiddleware)
            .post(
               uploader("invoices").single("invoice"), accountingInstance.createInvoiceValid(), ValidationError,
               uploadInvoices,accountingInstance.AddInvoices
            )


export default AccountingRoute;
