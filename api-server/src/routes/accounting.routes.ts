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
 * Middleware That: 
 *       ---> making sure about system id is valid or not
 *       ---> this user has the authorization to do this action or not
 */
AccountingRoute.use(
   accountingInstance.systemIdValid(), ValidationError, AccountingUsersMiddleware
)

AccountingRoute.route("/main-graph/")
            .get(accountingInstance.OverviewGraph)


AccountingRoute.route("/main-daily-graph/")
            .get(accountingInstance.DailyMonthGraph)


AccountingRoute.route("/balance/")
            .get(accountingInstance.AccountingBalanceEquation)


/**
 * company_id: must be included as query
 * ALL - Middlewares that validate the accoutning system id && sure about whether user is authorized
 * POST - Create a transaction
 */
AccountingRoute.route("/transaction/")
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
            .post(
               uploader("invoices").single("invoice"), accountingInstance.createInvoiceValid(), ValidationError,
               uploadInvoices,accountingInstance.AddInvoices
            )
            .get(accountingInstance.invoiceRetreivingValid(), ValidationError, accountingInstance.OneInvoice)


export default AccountingRoute;
