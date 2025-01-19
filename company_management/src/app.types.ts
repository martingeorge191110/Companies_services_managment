#!/usr/bin/env ts-node
import * as express from 'express';
import { Companies, Companies_Agents, Users } from "@prisma/client";



declare global {
   namespace Express {
      interface Request {
         company?: Companies;
         user?: Users;
         id?: string;
         avatar_url?: string;
      }
   }
}

export interface metaData {
   company: Companies,
   company_agent: Companies_Agents,
   duration: number,
   amount: number
}
