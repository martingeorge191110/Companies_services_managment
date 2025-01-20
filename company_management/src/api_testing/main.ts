#!/usr/bin/env ts-node
import fs from 'fs/promises'
import readlineSync from 'readline-sync'
import CompaniesAuthAPi from './companies.auth.api.ts';
import FinalInherits from './classes.inhertance.ts';




class Main extends FinalInherits {

   public programShell: string;

   constructor (programShell: string) {
      super()
      this.programShell = programShell
   }

   public StartProgram = async () => {
      while (true) {
         const input = readlineSync.question(this.programShell);
         console.log('')

         if (input.trim().toLowerCase() === 'exit') {
            console.log('Exiting shell...');
            break;
         }

         switch (input) {
            case '1':
               await this.CompanyAuthProgram()
               break;
            case '2':
               await this.UserAuthProgram()
               break;
            case '3':
               await this.UserProfileProgram()
               break;
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
const prompt: string =
`***Company service server***
\t[1] --> Company authintication apis
\t[2] --> User authintication apis
\t[3] --> User profile apis\nInput: `


const programTest = new Main(prompt)

programTest.StartProgram()