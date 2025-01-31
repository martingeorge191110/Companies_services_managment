import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-screen bg-[#242424] flex flex-col items-center justify-center text-white font-serif">
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Loading Text */}
      <motion.h1
        className="mt-4 text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Loading...
      </motion.h1>

      {/* Optional Subtext */}
      <motion.p
        className="mt-2 text-sm text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Please wait while we prepare your experience.
      </motion.p>
    </div>
  );
};

export default LoadingPage;
