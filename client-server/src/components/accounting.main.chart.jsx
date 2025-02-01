import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AccountingMainChart = ({ monthlyData }) => {
   return (
      <motion.div
         whileHover={{ scale: 1.02 }}
         className="bg-[#444444] p-6 rounded-lg shadow-md"
      >
         <h3 className="text-xl font-semibold mb-4">Monthly Balance Overview</h3>
         <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
               <XAxis dataKey="month" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Line type="monotone" dataKey="revenue" stroke="#4CAF50" name="Revenue" />
               <Line type="monotone" dataKey="expenses" stroke="#FF5722" name="Expenses" />
               <Line type="monotone" dataKey="balance" stroke="#2196F3" name="Balance" />
            </LineChart>
         </ResponsiveContainer>
         {/* <div className="mt-4"> */}
            {/* {monthlyData.map((data, index) => (
               <div key={index} className="text-white mb-2">
                  <strong>{data.month}:</strong> Income: ${data.revenue}, Expenses: ${data.expenses}, Balance: ${data.balance}
               </div> */}
            {/* ))}  */}
         {/* </div> */}
      </motion.div>
   );
};

export default AccountingMainChart;
