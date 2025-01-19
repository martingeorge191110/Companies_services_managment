#!/usr/bin/env ts-node
import axios, { AxiosError, AxiosInstance } from "axios";
import GlobalApiTest from "./global.api.ts";
import readlineSync, { question } from 'readline-sync';



const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDJjMmZlLTI1OWMtNDYxYS1hZjFiLTA0YjI3ODk0NzkxNSIsImlhdCI6MTczNzIwODkyNCwiZXhwIjoxNzM3ODEzNzI0fQ.rQfDjUmIIULzqnJUm0cnX9csaAqqvkZ70oMw9vv_jdk"

class CompaniesAuthAPi extends GlobalApiTest {

   public baseUrl: AxiosInstance;

   constructor (propmt: string) {
      super(propmt)
      this.baseUrl = axios.create({baseURL: "http://localhost:8000/api/company/auth", withCredentials: true})
   }

   public startProgram = async () => {
      while (true) {
         const input = readlineSync.question(this.propmt);

         if (input.trim().toLowerCase() === 'exit') {
            console.log('Exiting shell...');
            break;
         }

         switch (input) {
            case '1':
               await this.Register()
               break;
            default:
               console.log("Unknown input!")
         }

      }
   }

   public Register = async () => {
      const name = readlineSync.question("Company Name: ")
      const email = readlineSync.question("Company Email: ")
      const phone_number = readlineSync.question("Company Phone Number: ")
      const business_type = readlineSync.question("Company Business type: ")
      const relationship_status = readlineSync.question("Your status with this company status: ")
      const assigned_role = readlineSync.question("Your assigned role in the company: ")
      const started_at = readlineSync.question("Your starting date in the company: ") || new Date()
      const salary = Number(readlineSync.question("Your Current salary in the company: "))

      try {
         const response = await this.baseUrl.post("/register/", {
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
         const companyFile = await this.fileReading("./data/companies.json")
         const companyAgentFile = await this.fileReading("./data/companies.agents.json")
         await this.fileWritting('./data/companies.json', [...companyFile, {...data.data.company}])
         await this.fileWritting('./data/companies.agents.json', [...companyAgentFile, {...data.data.company_agent}])

         console.log(`Payment Session URL: ${data.data.url}`)

         const paid = readlineSync.question("Did you paid the amount? [yes|no] --> ")
         if (paid === 'yes') {
            const amount = Number(readlineSync.questionInt("How much have you paid? "))
            const company = data.data.company
            const expirationDate = new Date();
               expirationDate.setMonth(expirationDate.getMonth() + 12);
            const companyFile = await this.fileReading("./data/companies.json")
            companyFile.forEach((ele) => {
               if (ele.id === company.id) {
                  ele.active_permission = true;
                  ele.purchased_system = true;
                  ele.amount_paid = amount;
                  ele.valid_account = true;
                  ele.months_of_subiscription = 12;
                  ele.account_exp_date = expirationDate;
               }
            })
            await this.fileWritting("./data/companies.json", companyFile)
         }
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

const apiInstance = new CompaniesAuthAPi(`[1] --> Register new Company Api process.\nInput: `)

apiInstance.startProgram()
