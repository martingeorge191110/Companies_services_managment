#!/usr/bin/env ts-node
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../middlewares/api.errors';


dotenv.config()

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadAvatars = async (req: Request, res: Response, next: NextFunction) => {
   const avatar = req.file

   if (!avatar) {
      return (next(ApiError.CreateError("No Files have been uploaded!", 400, null)))
   }

   try {
      const data = await fs.readFile(avatar.path)

      const result = await new Promise((resolve, reject) => {
         const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: 'ProfilePhotoes' },
            (error, result) => {
               if (error)
                  if (error) return reject(error);
                  resolve (result);
            }
         );
         stream.end(data);
      })
      req.avatar_url = (result as any).secure_url

      await fs.unlink(avatar.path)
      return (next())
   } catch (err) {
      console.log(err)
      return (next(ApiError.CreateError("cloudinary server error during upload the photo", 500, null)))
   }
}


export const uploadInvoices = async (req: Request, res: Response, next: NextFunction) => {
   const invoice = req.file

   if (!invoice) {
      return (next(ApiError.CreateError("No Files have been uploaded!", 400, null)))
   }

   try {
      const data = await fs.readFile(invoice.path)

      const result = await new Promise((resolve, reject) => {
         const stream = cloudinary.uploader.upload_stream(
            { resource_type: invoice.mimetype.startsWith("image/") ? "image" : "raw", folder: 'invoices' },
            (error, result) => {
               if (error)
                  if (error) return reject(error);
                  resolve (result);
            }
         );
         stream.end(data);
      })
      req.invoice_url = (result as any).secure_url

      await fs.unlink(invoice.path)
      return (next())
   } catch (err) {
      console.log(err)
      return (next(ApiError.CreateError("cloudinary server error during upload the photo", 500, null)))
   }
}
