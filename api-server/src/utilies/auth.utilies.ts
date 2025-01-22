#!/usr/bin/env ts-node
import { Response } from 'express';
import jwt from 'jsonwebtoken';


export const createToken = (id: string) => {
   const token: string = jwt.sign({id}, 
      process.env.JWT_KEY || "", {
         expiresIn: process.env.JWT_EXP
      }
   )
   return (token)
}

export const setCookie = (res: Response, token: string) => {
   res.cookie("token", token, {
      secure: process.env.NODE_ENV === "development" ? false : true as boolean,
      httpOnly: false as boolean,
      maxAge: 1000 * 60 * 60 * 24 * 3 as number
   })
}