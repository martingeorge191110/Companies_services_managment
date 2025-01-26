#!/usr/bin/env ts-node
// import GlobalApiTest from "./global.api.ts";
import axios, { AxiosError, AxiosInstance } from "axios";
import UsersAuthApiTesting from "./users.auth.api.ts";
import readlineSync from 'readline-sync'



class UserProfileApi extends UsersAuthApiTesting {

   private userProfileUrl: AxiosInstance;
   private profilePropmt: string;

   constructor () {
      super()
      this.profilePropmt = 
      `***User Profile***\n\t[1] --> Get Your own information.\n\t[2] --> Get your companies information.\n\t[3] --> Update information.\nInput: `
      this.userProfileUrl = axios.create({baseURL: "http://localhost:8000/api/users", withCredentials: true})
   }

public UserProfileProgram = async () => {
      while (true) {
         const input = readlineSync.question(this.profilePropmt);
         console.log('')

         if (input.trim().toLowerCase() === 'back') {
            console.log('Backing to the previous step...\n');
            break;
         }

         switch (input) {
            case '1':
               await this.GetUserInfo()
               break;
            case '2':
               await this.GetUserCompaniesInfo()
               break;
            case '3':
               await this.UpdateUserInfo()
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


   private GetUserInfo = async () => {
      const token = readlineSync.question('Please enter your Authorized Token: ');

      try {
         console.log("Sending registration request...");
         const response = await this.userProfileUrl.get("/profile/", {
            headers: {
               Authorization: `Barear ${token}`
            }
         })

         console.log("Response received: ");
         console.log(response.data, '\n');
         if (!response.data.success) {
            console.log(response.data)
            return;
         }
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

   private GetUserCompaniesInfo = async () => {
      const token = readlineSync.question('Please enter your Authorized Token: ');

      try {
         console.log("Sending registration request...");
         const response = await this.userProfileUrl.get("/companies/", {
            headers: {
               Authorization: `Barear ${token}`
            }
         })

         console.log("Response received: ");
         console.log({...response.data, ...response.data.data}, '\n');
         if (!response.data.success) {
            console.log(response.data)
            return;
         }
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

   private UpdateUserInfo = async () => {
      const token = readlineSync.question('Please enter your Authorized Token: ');
      const dataLength = readlineSync.questionInt('please enter the number of feilds you want to update: ')
      const body: any = {}
      const numberFeilds = ['monthly_income', 'monthly_tax']
      for (let i = 0; i < dataLength; i++) {
         const feild = readlineSync.question(`Feild: [${i + 1}]: `)
         const value = readlineSync.question(`Value: [${i + 1}]: `)
         body[`${feild}`] = numberFeilds.includes(feild) ? Number(value) : value
      }

      try {
         console.log("Sending registration request...");
         const response = await this.userProfileUrl.put("/profile/", body, {
            headers: {
               Authorization: `Barear ${token}`,
               "Content-Type": "application/json"
            }
         })

         console.log("Response received: ");
         console.log({...response.data}, '\n');
         if (!response.data.success) {
            console.log(response.data)
            return;
         }
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

export default UserProfileApi;
