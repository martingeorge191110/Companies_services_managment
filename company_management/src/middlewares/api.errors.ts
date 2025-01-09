#!/usr/bin/env ts-node
import { Response, NextFunction, Request } from "express"
import { ValidationError } from "express-validator"



/**
 * ApiError - Class that inherits from Error class
 */
class ApiError extends Error {
   private statusCode: number
   private errors: ValidationError[] | null

   constructor(message: string, statusCode: number, errors: ValidationError[] | null) {
      /* inherit error class atrubutes with new attributes */
      super()
      this.message = message
      this.statusCode = statusCode
      this.errors = errors
   }

   public static CreateError = (message: string, statusCode: number, errors: ValidationError[] | null) => {
      /* Function that create an error, then return it */
      const error: ApiError = new ApiError(message, statusCode, errors)
      return (error)
   }

   public static ErrMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
      /* Function midddle ware that catching api errors */
      res.status(err.statusCode).json({
         success: false,
         message: err.message,
         validationErrors: err.errors || null,
         stack: process.env.NODE_ENV === "development" ? err.stack : "",
      })
   }
}

export default ApiError;
