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
 * company_id: must be included as query
 * ALL - Middlewares that validate the accoutning system id && sure about whether user is authorized
 * POST - Create a transaction
 */
AccountingRoute.route("/transaction/")
            .all(accountingInstance.systemIdValid(), ValidationError, AccountingUsersMiddleware)
            .post(accountingInstance.isTransactionValid(), ValidationError, accountingInstance.Transaction)


/**
 * company_id: must be included as query
 * transactions_id: should be in query
 * invoice_id: should be in query
 * 
 * POST: Add one invoice to a transaction
 * GET: just get one invoice details
 */
AccountingRoute.route("/invoice/")
            .all(accountingInstance.systemIdValid(), ValidationError, AccountingUsersMiddleware)
            .post(
               uploader("invoices").single("invoice"), accountingInstance.createInvoiceValid(), ValidationError,
               uploadInvoices,accountingInstance.AddInvoices
            )
            .get(accountingInstance.invoiceRetreivingValid(), ValidationError, accountingInstance.OneInvoice)


export default AccountingRoute;
