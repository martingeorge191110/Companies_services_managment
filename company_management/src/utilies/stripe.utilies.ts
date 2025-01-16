#!/usr/bin/env ts-node
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import ApiError from "../middlewares/api.errors";
import { SuccessfulyResponse } from "./global.utilies";
import PrismaInstance from "../prisma.db";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")


export const stripeSession = async (req: Request, metadata: {companyId?: string, months: number}) => {
   try {

      console.log(`${req.protocol}://${req.get("host")}/api/company/payment/success`)
      const session = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items: [
            {
               price_data: {
                  currency: "usd",
                  product_data: {
                     name: "System Subscription", // Product name
                     description: `
                        Subscription Details:
                           - Amount: $100.00
                           - Duration: ${metadata.months} months
                           - Start Date: ${new Date().toLocaleDateString()}
                           - Expiration Date: ${new Date(
                              new Date().setMonth(new Date().getMonth() + metadata.months)
                           ).toLocaleDateString()}
                        `.trim(), // Detailed subscription description
                  },
                  unit_amount: 10000, // Price in cents (e.g., $100.00)
               },
                quantity: 1, // Quantity of the item
            },
         ],

         mode: "payment", // Set the mode to "payment" for a one-time payment
         metadata: {
            companyId: String(metadata.companyId),  // Ensure metadata is correctly set
            amount: 100000,
            duration: Number(metadata.months),
         },
         success_url: `${req.protocol}://${req.get("host")}/api/company/payment/success`, // URL to redirect to on successful payment
         cancel_url: `${req.protocol}://${req.get("host")}/api/company/payment/cancel`,   // URL to redirect to if the payment is canceled
      });

      return (session)
   } catch (err) {
      // console.log(err)
      return (null)
   }
}


export const FirstPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const sig = req.headers['stripe-signature'] as string;

   let event;

   try {

      event = stripe.webhooks.constructEvent(
         req.body,
         sig,
         process.env.STRIPE_WEBHOOK_SECRET || ""
      );

   } catch (err) {
      const error = err as Error
      // console.error('Error verifying Stripe webhook signature:', err);
      return (next(ApiError.CreateError(`webhook error: ${error.message}`, 500, null)))
   }

      switch (event.type) {
      case 'checkout.session.completed':
         try {
            const metaData = event.data.object.metadata

            const expirationDate = new Date();
               expirationDate.setMonth(expirationDate.getMonth() + Number(metaData?.duration));  // Add duration in months
            const company = await PrismaInstance.companies.update({
               where: {id: metaData?.companyId},
               data: {
                  gen_code: "x".repeat(20), exp_date: null, active_permission: true, purchased_system: true,
                  amount_paid: Number(metaData?.amount), valid_account: true, started_date: new Date(), months_of_subiscription: Number(metaData?.duration),
                  account_exp_date: expirationDate
               }
            })

            return (SuccessfulyResponse(res, "Successfuly paid", {...company}))
         } catch (err) {
            return (next(ApiError.CreateError("Error during recording the payment amount", 200, null)))
         }
   }
}
