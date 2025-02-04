import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";



const ComponentsError = ({ errorMessage, statusCode, validationErrors}) => {

   return (
      <AnimatePresence>
         {(
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="p-4 bg-red-500 text-white rounded-lg shadow-lg flex items-center gap-2"
            >
               <FaExclamationCircle className="text-white" />
               <div>
                  <p className="font-semibold">{errorMessage}</p>
                  {
                     validationErrors && validationErrors.map((err, index) => {
                        return <p key={index} className="font-semibold">{err.msg}</p>
                     })
                  }
                  <p className="text-sm">Error: {statusCode || '500'}</p>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default ComponentsError;
