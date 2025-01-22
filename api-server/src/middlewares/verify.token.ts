#!/usr/bin/env ts-node
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from './api.errors.ts';


export const userVerifyToken = (req: Request, res: Response, next: NextFunction) => {
   const auth = req.headers["authorization"]

   if (!auth)
      return (next(ApiError.CreateError("authorization must be included in headers!", 400, null)))

   const token: string = auth.split(" ")[1]
   if (!token)
      return (next(ApiError.CreateError("Token must be included in authorization!", 400, null)))

   jwt.verify(token, process.env.JWT_KEY || "", (err, payload: jwt.JwtPayload | undefined | string | {id: string}) => {
      if (err)
         return (next(ApiError.CreateError("Token is not valid!", 400, null)))

      req.id = (payload as {id: string}).id
   })
   return (next())
}
