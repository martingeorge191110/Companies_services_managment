#!/usr/bin/env ts-node
import readlineSync from 'readline-sync';
import axios, { AxiosError, AxiosInstance } from 'axios'
import GlobalApiTest from './global.api';




class UsersAuthApiTesting extends GlobalApiTest {

   public baseUrl: AxiosInstance;

   constructor (propmt: string) {
      super(propmt)
      this.baseUrl = axios.create({baseURL: "http://localhost:8000/api/users/auth", withCredentials: true})
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
               await this.register()
               break;
            case '2':
               await this.login()
               break;
            default:
               console.log("Unknown input!")
         }

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
      const response = await this.baseUrl.post("/register/", {f_n, l_n, email, password, con_pass}, {
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
      await this.fileWritting("./data/users.json", [...usersFile, response.data.data])
      console.log(`New data: ${response.data}`)
   } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
         const data: any = error.response.data
         console.log('Error Response:', data,'\n');
      } else {
         console.log('Error:', error.message, '\n');
      }
   }
   }


   public login = async () => {
      const email = readlineSync.questionEMail('Email Address: ');
      const password = readlineSync.question("Password: ", {hideEchoBack: true})

      try {
         console.log("Sending registration request...");
         const response = await this.baseUrl.post("/login/", {email, password}, {
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
         console.log(`Data: ${response.data}`)
         const fileContent = await this.fileReading('./data/users.json')
         let data = response.data.data
         for (let i = 0; i < fileContent.length; i++) {
            if (fileContent[i].id = data.id) {
               fileContent[i].token = data.token
               break;
            }
         }
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

const apiInstance = new UsersAuthApiTesting(`[1] --> Register new user Api.\n[2] --> Login process\nInput: `)

apiInstance.startProgram()
