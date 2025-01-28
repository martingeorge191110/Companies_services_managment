#!/usr/bin/env ts-node
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'


dotenv.config()


const secretKey = process.env.CRYPTO_SECRET_KEY as string

export const encrypting = (text: string) => {
      const encrypted = CryptoJS.AES.encrypt(String(text), secretKey).toString();
      return (encrypted);
}

export const decrypting = (encryptedText: string, type: "string" | "number" = "string"): string | number => {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (type === "string")
            return (decrypted)
      else
            return (Number(decrypted))
}

export const encryptObject = (body: any) => {
      const bodyArr = Object.entries(body) as [string, (string | number)][]
      const result: Record<string, string> = {}
      bodyArr.map((ele) => {
            result[`${ele[0]}`] = encrypting(String(ele[1]))
      })

      return (result)
}
