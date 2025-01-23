#!/usr/bin/env ts-node
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'

dotenv.config()


const secretKey = process.env.CRYPTO_SECRET_KEY as string

export const encrypting = (text: string) => {
      const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
      return (encrypted);
}

export const decrypting = (encryptedText: string ) => {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return (decrypted);
}
