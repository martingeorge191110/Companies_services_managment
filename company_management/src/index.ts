#!/usr/bin/env ts-node
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import ApiError from './middlewares/api.errors';
import CompanyAuthRoute from './routes/company.auth.route.ts';
import AdminsRouter from './routes/admins.route.ts';
import WebhookRoute from './routes/webhook.routes.ts';
import UserAuthRoutes from './routes/users.auth.routes.ts';
import UserAccoutRouter from './routes/users.routes.ts';



dotenv.config()

const env:NodeJS.ProcessEnv = process.env
const server = express()

/* Main application middlewares */
server.use(cors({
   origin: env.NODE_ENV === "development" ? "*" : undefined as (string | undefined),
   credentials: false as boolean
}))

server.use("/api/stripe", WebhookRoute)

server.use(express.json())
server.use(express.urlencoded({
   limit: "120mgb",
   extended: true
}))
server.use(cookieParser())
server.use(morgan("tiny"))


/* Api Routes */
server.use("/api/company/auth", CompanyAuthRoute) // Company Routes
server.use("/api/admins/", AdminsRouter)
server.use("/api/users/auth/", UserAuthRoutes)
server.use("/api/users", UserAccoutRouter)


/* Api error middleware */
server.use("*", ApiError.ErrMiddleware)

/* Start running the server */
server.listen(env.PORT, () => {
   console.log(`Server listen to PORT ${env.PORT}, running on: ${env.PROTOCOL}://${env.HOSTNAME}:${env.PORT}`)
})
