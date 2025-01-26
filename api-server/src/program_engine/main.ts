#!/usr/bin/env ts-node
import fs from 'fs/promises'
import readlineSync from 'readline-sync'
import CompaniesAPi from './companies.api.ts';
import FinalInherits from './classes.inhertance.ts';
import { Users } from '@prisma/client';




class Main extends FinalInherits {

   protected userData: (Users | any)

   constructor () {
      super()
      this.userData
   }

   private programShell = () => {
      return (
`***Program Server               About    contact     ${this.userData.f_n + ' ' + this.userData.l_n}***
\t1>(Companies)<   2>(Profile)<\nInput: `
      )
   }

   public StartProgram = async (): Promise<void> => {
      if (!process.argv[2])
         this.userData = await this.UserAuthProgram()
      else
         this.userData = await this.validateToken()

      if (!this.userData)
         this.userData = await this.UserAuthProgram()

      const token: string = await this.getUserToken(this.userData.email)

      while (true) {
         const input = readlineSync.question(this.programShell());
         console.log('')

         if (input.trim().toLowerCase() === 'exit') {
            console.log('Exiting Program...');
            break;
         }

         switch (input) {
            case '1':
               await this.CompanyProgram(token, this.userData)
               break;
            case '2':
               // await this.UserAuthProgram()
               break;
            // case '3':
               // await this.UserProfileProgram()
               // break;
            default:
               console.log("#".repeat(17))
               console.log("Unknown input!")
               console.log("#".repeat(17))
               console.log('')
         }

      }
   }
}

// export default GlobalApiTest;
// const prompt: string =
// `***Program Server               About    contact     ***
// \t[1] --> Your personel token.
// \t[2] --> Login.
// \t[3] --> Sign Up.\nInput: `


const programTest = new Main()

programTest.StartProgram()