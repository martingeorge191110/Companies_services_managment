#!/usr/bin/env ts-node

import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import ApiError from "../middlewares/api.errors.ts"

export const ValidationError = (req: Request, res: Response, next: NextFunction): void => {
   const validation = validationResult(req)
   if (!validation.isEmpty()) {
      const apiError = ApiError.CreateError("Validation Error", 400, validation.array())
      next(apiError)
   }
   next()
}
