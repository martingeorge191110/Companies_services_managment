#!/usr/bin/env ts-node
import { Router } from "express";
import { userVerifyToken } from "../middlewares/verify.token.ts";
import UserController from "../controllers/user.controller.ts";
import uploader from "../middlewares/multer.uploader.ts";
import { uploadAvatars } from "../utilies/cloudinary.utilies.ts";
import { ValidationError } from "../validators/common.validators.ts";


const UserAccoutRouter: Router = Router()
const userInstance: UserController = new UserController()


UserAccoutRouter.use(userVerifyToken)


/**
 * GET --> get profile information (user own data)
 * PATCH --> upload images
 */
UserAccoutRouter.route("/profile/")
         .get(userInstance.Profile)
         .patch(
            uploader('uploads').single("image"),
            uploadAvatars, userInstance.UploadAvatar
         )
         .put(userInstance.infoValidation(), ValidationError, userInstance.UpdateData)



UserAccoutRouter.route("/companies/")
         .get(userInstance.GetUserCompanies)



UserAccoutRouter.route("/searching/")
         .get(userInstance.searchingValidation(), ValidationError, userInstance.SearchingUsers)



export default UserAccoutRouter;
