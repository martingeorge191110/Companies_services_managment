#!/usr/bin/env ts-node

import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config()

const env:NodeJS.ProcessEnv = process.env
const server = express()

/* Main application middlewares */
server.use(cors({
   origin: env.NODE_ENV === "development" ? "*" : undefined as (string | undefined),
   credentials: false as boolean
}))
server.use(express.json())
server.use(express.urlencoded({
   limit: "120mgb",
   extended: true
}))
server.use(cookieParser())
server.use(morgan("tiny"))





/* Start running the server */
server.listen(env.PORT, () => {
   console.log(`Server listen to PORT ${env.PORT}, running on: ${env.PROTOCOL}://${env.HOSTNAME}:${env.PORT}`)
})
