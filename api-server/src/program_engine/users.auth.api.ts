#!/usr/bin/env ts-node
import readlineSync from 'readline-sync';
import axios, { AxiosError, AxiosInstance } from 'axios'
import GlobalApiTest from './global.api';
import CompaniesAPi from './companies.api.ts';




class UsersAuthApiTesting extends CompaniesAPi{

   private userAuthUrl: AxiosInstance;
   private propmt: string;
   constructor () {
      super()
      this.propmt =
      `***User authintication***\n\t[1] --> Register.\n\t[2] --> Login.\nInput: `
      this.userAuthUrl = axios.create({baseURL: "http://localhost:8000/api/users/auth", withCredentials: true})
   }

   public UserAuthProgram = async () => {
      const input = readlineSync.question(this.propmt);

      while (true) {
         console.log('')

         // if (input.trim().toLowerCase() === 'back') {
         //    console.log('Backing to the previous step...\n');
         //    break;
         // }

         let response;
         switch (input) {
            case '1':
               response = await this.register()
               break;
            case '2':
               response = await this.login()
               break;
            default: {
               console.log("#".repeat(17))
               console.log("Unknown input!")
               console.log("#".repeat(17))
               console.log('')
            }
         }

         if (response)
            return (response)

         this.UserAuthProgram()
      }
   }

   public register = async () => {
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
      console.log("Response received: \n");
      // console.log(response.data, '\n');
      if (!response.data.success) {
         // console.log(response.data)
         return;
      }
      const usersFile = await this.fileReading("./data/users.json")
      await this.fileWritting("./data/users.json", {...usersFile, [`${response.data.data.email}`]: response.data.data.token})

      return (response.data.data)
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


   public login = async () => {
      const email = readlineSync.questionEMail('Email Address: ');
      const password = readlineSync.question("Password: ", {hideEchoBack: true})

      try {
         console.log("Sending Login request...");
         const response = await this.userAuthUrl.post("/login/", {email, password}, {
            "headers": {
               "Content-Type": "application/json"
            }
         })

         console.log("Response received: \n");
         // console.log(response.data, '\n');
         if (!response.data.success) {
            // console.log(response.data)
            return;
         }
         const fileContent = await this.fileReading('./data/users.json')
         let data = response.data.data
         fileContent[data.email] = data.token
         await this.fileWritting('./data/users.json', fileContent)

         return (data)
      } catch (err) {
         const error = err as AxiosError;
         if (error.response) {
            const data: any = error.response.data
            console.log('Error Response:', data.message, '\n');
         } else {
            console.log('Error:', error.message, '\n');
         }
      }
   }

   public validateToken = async () => {
      const token = process.argv[2]

      try {
         console.log("Sending registration request...");
         const response = await this.userAuthUrl.get("/validate-token/", {
            headers: {
               Authorization: `Berear ${token}`,
               "Content-Type": "application/json"
            }
         })

         console.log("Response received: \n");
         // console.log(response.data, '\n');
         if (!response.data.success) {
            // console.log(response.data)
            return;
         }

         return (response.data.data)
      } catch (err) {
         const error = err as AxiosError;
         if (error.response) {
            const data: any = error.response.data
            console.log('Error Response:', data.message, '\n');
         } else {
            console.log('Error:', error.message, '\n');
         }
      }
   }
}

export default UsersAuthApiTesting;
