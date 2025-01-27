#!/usr/bin/env ts-node
import axios, { AxiosError, AxiosInstance } from "axios";
import readlineSync from 'readline-sync';
import GlobalApiTest from "./global.api";
import { Employees_Status, Users } from "@prisma/client";



class CompaniesAPi extends GlobalApiTest{

   public companiesBaseUrl: AxiosInstance;

   constructor () {
      super()
      // this.prompt = 
      // `\n***Company authintication ***\n\t[1] --> Register new Company\nInput: `
      this.companiesBaseUrl = axios.create({baseURL: "http://localhost:8000/api/companies/", withCredentials: true})
   }

   public companyShell = (userData: (Users | any)): string => {
      return (
      `***Program Server               About    contact     ${userData.f_n + ' ' + userData.l_n}***
\t1>(Your all of companies as an Agent or Employee)<   2>(Register your own company)<
Input: `
      )
   }

   public CompanyProgram = async (token: string, userData: (Users | any)) => {

      while (true) {
         const input = readlineSync.question(this.companyShell(userData));
         console.log('')

         if (input.trim().toLowerCase() === 'back') {
            console.log('Backing to the previous step...\n');
            break;
         }

         switch (input) {
            case '1':
               await this.RetreiveUserCompanies(token, userData)
               break;
            default:
               console.log("#".repeat(17))
               console.log("Unknown input!")
               console.log("#".repeat(17))
               console.log('')
         }

      }
   }


   private allCompaniesStr = (userData: (Users |  any), agentStr: string, empStr: string) => {
return (
`***Program Server               About    contact     ${userData.f_n + ' ' + userData.l_n}***
\t As an Agent:
${agentStr.length > 3 ? '\t\t' : ''}${agentStr}
\t As an Employee:
${empStr.length > 3 ? '\t\t' : ''}${empStr}${empStr.length > 3 ? '\n' : ''}Input: `
)
   }


   /* Function to convert company to string format */
   private companyStr = (company: any, index: number) => {
      let str: string = "";

      company.forEach((ele: any) => {
         str +=  `${index + 1}>(`+ ele.company.name + ')<   '
         index = index + 1;
      });

      return ({str, index});
   }



   private RetreiveUserCompanies = async (token: string, userData: (Users | any)) => {
      let response: any;
      try {
         response = await this.companiesBaseUrl.get("/database/", {
            headers: {
               Authorization: `Bearer ${token}`,
            }
         })
      } catch (err) {
         const error = err as AxiosError;

         if (error.response) {
            const data: any = error.response.data
            console.log('Error Response:', data,'\n');
         } else {
            console.log('Error:', error.message, '\n');
         }
      }
         const agentCompanies = response.data.data.agentCompanies
         const employeeCompanies = response.data.data.employeeCompanies
         const allCompanies = [...agentCompanies, ...employeeCompanies]

         let index: number = 0;
         let agentStr = this.companyStr(agentCompanies, index).str;
         index = agentCompanies.length
         let empStr: string = this.companyStr(employeeCompanies, index).str;

         while (true) {
            const input = readlineSync.question(this.allCompaniesStr(userData, agentStr, empStr));

            if (input.trim().toLowerCase() === 'back') {
               console.log('Backing to the previous step...\n');
               break;
            }

            switch (typeof((Number(input)))) {
               case "number":
                  await this.RetreiveCompany(allCompanies[Number(input) - 1], userData)
                  break;
               default:
                  console.log("#".repeat(17))
                  console.log("Unknown input!")
                  console.log("#".repeat(17))
                  console.log('')
            }
         }
   }


   private RetreiveCompany = async (company: any, userData: (Users | any)) => {

      while (true) {
         const input = readlineSync.question(this.oneCompanyShell(company, userData));

         if (input.trim().toLowerCase() === 'back') {
            console.log('Backing to the previous step...\n');
            break;
         }


      }
   }

   private oneCompanyShell = (company: any, userData: (Users | any)) => {
      const i = company.company
      return (
         `***Program Server               ${i.name}     ${userData.f_n + ' ' + userData.l_n}***
\t1>(Accounting)<   2>(Dashboard)<   3>(Documents)<\nInput: `
      )
   }


   private Register = async (token: string) => {
      console.log("Register")
      const name = readlineSync.question("Company Name: ")
      const email = readlineSync.question("Company Email: ")
      const phone_number = readlineSync.question("Company Phone Number: ")
      const business_type = readlineSync.question("Company Business type: ")
      const relationship_status = readlineSync.question("Your status with this company status: ")
      const assigned_role = readlineSync.question("Your assigned role in the company: ")
      const started_at = readlineSync.question("Your starting date in the company: ") || new Date()
      const salary = Number(readlineSync.question("Your Current salary in the company: "))

      try {
         const response = await this.companiesBaseUrl.post("/register/", {
            name, email, phone_number, business_type, relationship_status,
            assigned_role, started_at, salary
         }, {
            headers: {
               "Authorization": `Barear ${token}`,
               "Content-Type": "application/json"
            }
         })

         const data = response.data
         if (!data.success) {
            console.log (data)
            return;
         }
         console.log(`Payment Session URL: ${data.data.url}`)
      } catch (err) {
         const error = err as AxiosError
         if (error.response) {
            const data: any = error.response.data
            console.log('Error Response:', {...data, stack: ""}, '\n');
         } else {
            console.log('Error:', error.message, '\n');
         }
      }
   }
}

export default CompaniesAPi;
