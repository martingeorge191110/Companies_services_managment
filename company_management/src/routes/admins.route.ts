#!/usr/bin/env ts-node
import { Router } from "express";
import AdminController from "../controllers/admins.controller.ts";
import { ValidationError } from "../validators/common.validators.ts";



const AdminsRouter: Router = Router()
const adminInstance: AdminController = new AdminController()


/* Create first website admin */
AdminsRouter.route("/first-admin/")
      .post(adminInstance.firstAdmin(), ValidationError, adminInstance.FirstAdmin)


/* login process for admins */
AdminsRouter.route("/login/")
      .post(adminInstance.loginValid(), ValidationError, adminInstance.Login)



export default AdminsRouter;
