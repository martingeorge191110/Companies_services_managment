import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AccountingMonthGraph = ({ dailyData }) => {
   // Custom tooltip component to show detailed information
   const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
         const { day, revenue, expenses, balance } = payload[0].payload; // Get data for the hovered point
         return (
            <div style={{ backgroundColor: '#333333', padding: '10px', borderRadius: '8px', border: '1px solid #444444' }}>
               <h4 style={{ color: '#fff' }}>{`Date: ${day}`}</h4>
               <p style={{ color: '#4CAF50' }}>{`Revenue: $${revenue}`}</p>
               <p style={{ color: '#FF5722' }}>{`Expenses: $${expenses}`}</p>
               <p style={{ color: '#2196F3' }}>{`Balance: $${balance}`}</p>
            </div>
         );
      }
      return null;
   };

   return (
      <motion.div
         whileHover={{ scale: 1.02 }}
         className="bg-[#444444] p-4 rounded-lg shadow-md" // Reduced padding
      >
         <h3 className="text-xl font-semibold mb-4 text-white">Daily Transactions Overview</h3>
         <ResponsiveContainer width="100%" height={300}> {/* Adjusted height */}
            <LineChart data={dailyData}>
               <XAxis dataKey="day" />
               <YAxis />
               <Tooltip content={<CustomTooltip />} />
               <Legend />
               <Line type="monotone" dataKey="revenue" stroke="#4CAF50" name="Revenue" strokeWidth={2} />
               <Line type="monotone" dataKey="expenses" stroke="#FF5722" name="Expenses" strokeWidth={2} />
               <Line type="monotone" dataKey="balance" stroke="#2196F3" name="Balance" strokeWidth={2} />
            </LineChart>
         </ResponsiveContainer>
      </motion.div>
   );
};

export default AccountingMonthGraph;
