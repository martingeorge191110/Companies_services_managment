#!/usr/bin/env ts-node
import readlineSync from 'readline-sync';
import axios, { AxiosError, AxiosInstance } from 'axios'
import GlobalApiTest from './global.api';
import CompaniesAuthAPi from './companies.auth.api.ts';
import { errorMonitor } from 'events';




class UsersAuthApiTesting extends CompaniesAuthAPi{

   private userAuthUrl: AxiosInstance;
   private propmt: string;
   constructor () {
      super()
      this.propmt =
      `***User authintication***\n\t[1] --> Register new user Api.\n\t[2] --> Login process\nInput: `
      this.userAuthUrl = axios.create({baseURL: "http://localhost:8000/api/users/auth", withCredentials: true})
   }

   public UserAuthProgram = async () => {
      while (true) {
         const input = readlineSync.question(this.propmt);
         console.log('')

         if (input.trim().toLowerCase() === 'back') {
            console.log('Backing to the previous step...\n');
            break;
         }

         switch (input) {
            case '1':
               await this.register()
               break;
            case '2':
               await this.login()
               break;
            default: {
               console.log("#".repeat(17))
               console.log("Unknown input!")
               console.log("#".repeat(17))
               console.log('')
            }
         }

      }
   }

   private register = async () => {
      const f_n = readlineSync.question('First Name: ');
      const l_n = readlineSync.question('Lat Name: ');
      const email = readlineSync.questionEMail('Email Address: ');
      const password = readlineSync.question("Password: ", {hideEchoBack: true})
      const con_pass = readlineSync.question("Confirm Password: ", {hideEchoBack: true})
      
      try {
      console.log("Sending registration request...");
      const response = await this.userAuthUrl.post("/register/", {f_n, l_n, email, password, con_pass}, {
         "headers": {
            "Content-Type": "application/json"
         }
      })
      console.log("Response received: ");
      console.log(response.data, '\n');
      if (!response.data.success) {
         console.log(response.data)
         return;
      }
      const usersFile = await this.fileReading("./data/users.json")
      await this.fileWritting("./data/users.json", {...usersFile, [`${response.data.data.email}`]: response.data.data.token})

   } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
         const data: any = error.response.data
         console.log('Error Response:', data,'\n');
      } else {
         console.log(error)
         console.log('Error:', error.message, '\n');
      }
   }
   }


   private login = async () => {
      const email = readlineSync.questionEMail('Email Address: ');
      const password = readlineSync.question("Password: ", {hideEchoBack: true})

      try {
         console.log("Sending registration request...");
         const response = await this.userAuthUrl.post("/login/", {email, password}, {
            "headers": {
               "Content-Type": "application/json"
            }
         })

         console.log("Response received: ");
         console.log(response.data, '\n');
         if (!response.data.success) {
            console.log(response.data)
            return;
         }
         const fileContent = await this.fileReading('./data/users.json')
         let data = response.data.data
         fileContent[data.email] = data.token
         await this.fileWritting('./data/users.json', fileContent)
      } catch (err) {
         const error = err as AxiosError;
         if (error.response) {
            const data: any = error.response.data
            console.log('Error Response:', {...data, stack: ""}, '\n');
         } else {
            console.log('Error:', error.message, '\n');
         }
      }
   }
}

export default UsersAuthApiTesting;
