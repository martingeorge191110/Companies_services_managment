#!/usr/bin/env ts-node
import * as express from 'express';
import { $Enums, Companies, Companies_Agents, Transactions, Users } from "@prisma/client";



declare global {
   namespace Express {
      interface Request {
         company?: Companies;
         user?: Users;
         id?: string;
         avatar_url?: string;
         accounting?: {
            created_at: Date,
            updated_at: Date,
            company_id: string,
            tax_rate: number | null,
            is_active: boolean,
            company: {
               valid_account: boolean;
            }
         };
         transaction_category?: ("assets" | "liabilities");
         invoice_url?: string;
         transaction?: Transactions;
         agent?: boolean;
         employee_systems?: $Enums.CompaniesSystems[]
      }
   }
}

export interface metaData {
   company: Companies,
   company_agent: Companies_Agents,
   duration: number,
   amount: number
}
