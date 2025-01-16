#!/usr/bin/env ts-node
import express, { Router } from "express";
import { FirstPayment } from "../utilies/stripe.utilies.ts";


const WebhookRoute = Router()

// WebhookRoute.use();


WebhookRoute.route("/first_subiscription/webhook/")
   .post(
      express.raw({ type: 'application/json' }),
      FirstPayment
   )

export default WebhookRoute;
