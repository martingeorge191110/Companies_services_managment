#!/usr/bin/env ts-node
import * as express from 'express';
import { Companies, Users } from "@prisma/client";



declare global {
   namespace Express {
      interface Request {
         company?: Companies;
         user?: Users;
      }
   }
}
