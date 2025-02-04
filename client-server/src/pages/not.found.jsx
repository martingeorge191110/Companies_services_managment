import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
   return (
      <div className="min-h-screen w-screen bg-[#242424] text-white flex flex-col items-center justify-center">
         {/* Icon */}
         <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
         >
            <FaExclamationTriangle className="text-8xl text-yellow-500" />
         </motion.div>

         {/* Title */}
         <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-6xl font-bold mb-4"
         >
            404
         </motion.h1>

         {/* Subtitle */}
         <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl font-semibold mb-4"
         >
            Page Not Found
         </motion.h2>

         {/* Message */}
         <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-lg text-gray-400 mb-8"
         >
            The page you are looking for does not exist.
         </motion.p>

         {/* Button */}
         <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
         >
            Go Back
         </motion.button>
      </div>
   );
};

export default NotFoundPage;
