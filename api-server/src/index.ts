#!/usr/bin/env ts-node
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv'
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import ApiError from './middlewares/api.errors';
import CompanyAuthRoute from './routes/company.auth.route.ts';
import AdminsRouter from './routes/admins.route.ts';
import WebhookRoute from './routes/webhook.routes.ts';
import UserAuthRoutes from './routes/users.auth.routes.ts';
import UserAccoutRouter from './routes/users.routes.ts';
import { socketInitialize } from './socket.io.ts';
import CompaniesRoute from './routes/companies.route.ts';



dotenv.config()

const env:NodeJS.ProcessEnv = process.env
const app = express()
const server = http.createServer(app)
export const socketIo = socketInitialize(server)


const allowedOrigins = [
   "http://localhost:5173",
   "http://127.0.0.1:5173",
   "https://ee5c-45-243-101-20.ngrok-free.app"
];


/* Main application middlewares */
app.use(cors({
   origin: (origin, callback) => {
      if (allowedOrigins.includes(origin as string) || !origin) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true
}))

app.use("/api/stripe", WebhookRoute)

app.use(express.json())
app.use(express.urlencoded({
   limit: "120mgb",
   extended: true
}))
app.use(cookieParser())
app.use(morgan("tiny"))


/* Api Routes */
app.use("/api/companies/auth", CompanyAuthRoute) // Company Routes
app.use("/api/admins", AdminsRouter)
app.use("/api/users/auth", UserAuthRoutes)
app.use("/api/users", UserAccoutRouter)
app.use("/api/companies", CompaniesRoute)


/* Api error middleware */
app.use("*", ApiError.ErrMiddleware)

/* Start running the server */
server.listen(Number(env.PORT), '0.0.0.0', () => {
   console.log(`Server listen to PORT ${env.PORT}, running on: ${env.PROTOCOL}://${env.HOSTNAME}:${env.PORT}`)
})
