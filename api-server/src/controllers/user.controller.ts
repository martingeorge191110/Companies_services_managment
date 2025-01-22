#!/usr/bin/env ts-node
import { Request, Response, NextFunction } from "express";
import UserValidation from "../validators/user.validation.ts";
import ApiError from "../middlewares/api.errors.ts";
import { Companies_Agents, Companies_System_Employees, Users } from "@prisma/client";
import PrismaInstance from "../prisma.db.ts";
import { SuccessfulyResponse } from "../utilies/global.utilies.ts";
import { query, validationResult } from "express-validator";





/**
 * UserController to manage user profile settings api operations
 */
class UserController extends UserValidation {


   public Profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * Function that retrieve user profile information
       */
      const id = (req as any).id

      try {
         const user: (Users | null) = await PrismaInstance.users.findUnique({
            where: {id}
         })

         if (!user)
            return (next(ApiError.CreateError("User Profile not found!", 404, null)))

         return (SuccessfulyResponse(res, "Profile Info retreived Successfully", {...user}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during retrieve user profile!", 500, null)))
      }
   }


   public UploadAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * Function that get the url after upload it on cloudinary, then update user Photo
       */
      const url = (req as any).avatar_url
      const id: string = (req as any).id

      try {
         const user: Users = await PrismaInstance.users.update({
            where: {id}, data: {avatar: url}
         })

         return (SuccessfulyResponse(res, "Successfully Uploaded!", {...user}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during uploading Profile Photo!", 500, null)))
      }
   }


   public UpdateData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * UpdateData Controller which validate the body, then update information
       */
      const body = req.body
      const id: string = (req as any).id

      const validItems = Object.entries(body)

      validItems.forEach((ele) => {
         const valid = ["role", 'monthly_income', 'monthly_tax', 'mail_notifications']
         if (!valid.includes(ele[0])) {
            return (next(ApiError.CreateError("This Item is not valid to be changed!", 400, null)))
         }
      });

      try {
         const user: Users = await PrismaInstance.users.update({
            where: {id}, data: {...body}
         })

         return (SuccessfulyResponse(res, "User info updated Successfully!", {...user}))
      } catch (err) {
         return (next(ApiError.CreateError("Server error during Updating the User information!", 500, null)))
      }
   }


   public GetUserCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id: string = (req as any).id

      let compAgents;

      let compEmployee;

      try {
         compAgents = await PrismaInstance.companies_Agents.findMany({
            where: {agent_id: id},
            select: {company_id: true, admin: true, assigned_role: true, company: {select: {
               name: true, avatar: true
            }}}
         })

         compEmployee = await PrismaInstance.companies_System_Employees.findMany({
            where: {employee_id: id},
            select: {company_id: true, role: true, status: true, contract_type: true, rating: true, company: {select: {
               name: true, avatar: true
            }}}
         })

      } catch (err) {
         return (next(ApiError.CreateError("Server erro druring, Retreive user partenerships!", 500, null)))
      }

      return (SuccessfulyResponse(res, "Successfully retreived User data!", {compAgents, compEmployee}))
   }


   public SearchingUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**
       * SearchingUsers - Controller for searching about other users using email or phone number
       */
      const query = req.query as {feild: string, value: string}

      let feildQuery;
      if (query.feild === "email")
         feildQuery = {
            email: {
               startsWith: query.value
            }
         }
      else
         feildQuery = {
            phone_number: {
               startsWith: query.value
            }
         }

      try {
         const users: Users[] = await PrismaInstance.users.findMany({
            where: feildQuery
         })

         return (SuccessfulyResponse(res, "Successfully retreived!", {users}))
      } catch (err) {
         return (next(ApiError.CreateError("Searver error while searching about users!", 500, null)))
      }
   }
}

export default UserController;
