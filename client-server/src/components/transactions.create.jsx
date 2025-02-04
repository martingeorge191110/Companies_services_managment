import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";

const CreateTransactionSection = () => {
   const [formData, setFormData] = useState({
      date: "",
      amount: "",
      type: "",
      customer: "",
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Transaction Created:", formData);
   };

   return (
      <div className="p-6 bg-white rounded-lg shadow-md mt-6">
         <h2 className="text-xl font-bold mb-4">Create Transaction</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <input
               type="date"
               name="date"
               placeholder="Date"
               className="p-2 border rounded-lg w-full"
               onChange={handleChange}
            />
            <input
               type="number"
               name="amount"
               placeholder="Amount"
               className="p-2 border rounded-lg w-full"
               onChange={handleChange}
            />
            <select
               name="type"
               className="p-2 border rounded-lg w-full"
               onChange={handleChange}
            >
               <option value="">Select Type</option>
               <option value="Cash IN">Cash IN</option>
               <option value="Cash OUT">Cash OUT</option>
            </select>
            <input
               type="text"
               name="customer"
               placeholder="Customer"
               className="p-2 border rounded-lg w-full"
               onChange={handleChange}
            />
            <motion.button
               type="submit"
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center justify-center"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
               <FaPlusCircle className="mr-2" /> Create Transaction
            </motion.button>
         </form>
      </div>
   );
};

export default CreateTransactionSection;
