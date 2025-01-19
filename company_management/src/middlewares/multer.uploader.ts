#!/usr/bin/env ts-node
import multer from "multer";
import path from 'path';
import fs from 'fs';

const uploader = (dirName: string) => {
   const storage = multer.diskStorage({
      destination: (req, file, cb) => {
         const fullPath = path.join(process.cwd(), dirName);
         if (fs.existsSync(fullPath)) {
            cb(null, fullPath);
         } else {
            try {
               fs.mkdirSync(fullPath, { recursive: true });
               cb(null, fullPath);
            } catch (err) {
               console.error("Error creating directory:", err);
               cb(err as Error, "");
            }
         }
      },
      filename: (req, file, cb) => {
         cb(null, Date.now() + '-' + file.originalname);
      },
   });

   return multer({
      storage,
      limits: { fileSize: 1024 * 1024 },
   });
};

export default uploader;
