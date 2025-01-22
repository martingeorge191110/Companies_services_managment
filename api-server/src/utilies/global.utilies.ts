#!/usr/bin/env ts-node
import { Response } from "express"
import nodeMailer from "nodemailer"


export const sendMail = async (sendTo: string, subject: string, htmlCode: string) => {
   const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.GMAIL_USER,
         pass: process.env.GMAIL_PASS
      }
   })

   const mail = {
      from: process.env.GMAIL_USER,
      to: sendTo,
      subject: subject,
      html: htmlCode,
   }

   try {
      await transporter.sendMail(mail)

      return (true)
   } catch (err) {
      return (false)
   }
}

export const SuccessfulyResponse = (res: Response, message: string, data: object) => {
   res.status(201).json({
      success: true,
      message: message,
      data: data
   })
}
