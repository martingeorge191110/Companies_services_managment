#!/usr/bin/env ts-node
import axios, { AxiosError, AxiosInstance } from "axios";
import readlineSync from 'readline-sync';
import GlobalApiTest from "./global.api";


const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDJjMmZlLTI1OWMtNDYxYS1hZjFiLTA0YjI3ODk0NzkxNSIsImlhdCI6MTczNzIwODkyNCwiZXhwIjoxNzM3ODEzNzI0fQ.rQfDjUmIIULzqnJUm0cnX9csaAqqvkZ70oMw9vv_jdk"

class CompaniesAuthAPi extends GlobalApiTest{

   private companiesAuthUrl: AxiosInstance;
   private prompt: string;

   constructor () {
      super()
      this.prompt = 
      `\n***Company authintication***\n\t[1] --> Register new Company\nInput: `
      this.companiesAuthUrl = axios.create({baseURL: "http://localhost:8000/api/company/auth", withCredentials: true})
   }

   public CompanyAuthProgram = async () => {
      while (true) {
         const input = readlineSync.question(this.prompt);
         console.log('')

         if (input.trim().toLowerCase() === 'back') {
            console.log('Backing to the previous step...\n');
            break;
         }

         switch (input) {
            case '1':
               await this.Register()
               break;
            default:
               console.log("#".repeat(17))
               console.log("Unknown input!")
               console.log("#".repeat(17))
               console.log('')
         }

      }
   }

   private Register = async () => {
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
         const response = await this.companiesAuthUrl.post("/register/", {
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

export default CompaniesAuthAPi;
