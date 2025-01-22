#!/usr/bin/env ts-node
import fs from 'fs/promises'
import readlineSync from 'readline-sync'




class GlobalApiTest {

   /**
    * read files function, takes path and return content of the file 
    */
   public fileReading = async (path: string): Promise<any[]> => {
      try {
         const result = await fs.readFile(path, "utf8");
         return (result ? JSON.parse(result) : []);
      } catch (err) {
         const error = err as Error
         throw (new Error(`Error while reading or parsing the file: ${error.message}`));
      }
   }


   /**
    * write files function, takes path and data to be written 
    */
   public fileWritting = async (path: string, data: any) => {
      try {
         const file = await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8")
         console.log(`${path} file has been updated!`)
         return (file)
      } catch (err) {
         const error = err as Error
         throw (new Error(`Error while writting the file: ${error.message}`));
      }
   }
}

export default GlobalApiTest;
