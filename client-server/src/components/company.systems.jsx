import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock } from "react-icons/fa";

const SystemCard = ({ feature, index, history, company }) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <motion.div
         key={index}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         whileHover={{ scale: 1.05 }}
         onClick={() => {
            if (!feature.auth)
               return;
               history.push({
                  pathname: feature.route,
                  state: company
               })
            }}
         className={ `bg-[#333333]
            ${!feature.auth && 'cursor-not-allowed'}
            p-6 cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-all relative` }
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div className="text-center">
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-sm text-gray-400">{feature.description}</p>
         </div>

         {/* Unauthorized Access Window */}
         { !feature.auth && <AnimatePresence>
            {isHovered && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-full bg-[#333333] bg-opacity-95 flex flex-col items-center justify-center rounded-lg"
               >
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ duration: 0.3, delay: 0.2 }}
                     className="text-center"
                  >
                     <FaLock className="text-4xl text-red-500 mb-4" />
                     <h3 className="text-xl font-semibold mb-2">Unauthorized Access</h3>
                     <p className="text-sm text-gray-400">
                        You do not have permission to access this System.
                     </p>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence> }
      </motion.div>
   );
};

export default SystemCard;