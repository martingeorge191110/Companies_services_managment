#!/usr/bin/env ts-node
import * as express from 'express';
import { Companies } from "@prisma/client";



declare global {
   namespace Express {
      interface Request {
         company?: Companies;
      }
   }
}
