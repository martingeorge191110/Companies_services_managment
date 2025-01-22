#!/usr/bin/env ts-node

import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'
dotenv.config()


export const encrypting = (text: string) => {
   const encrypted = CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET_KEY || "").toString();
   return encrypted;
}

export const decrypting = (encryptedText: string ) => {
   const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.CRYPTO_SECRET_KEY || "");
   const decrypted = bytes.toString(CryptoJS.enc.Utf8);
   return decrypted;
}
