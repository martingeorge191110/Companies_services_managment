import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TransactionsChart = () => {

   const [selectedMonth, setSelectedMonth] = useState(dayjs());


   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [transactionsData, setTransactionsData] = useState([
      { date: "2025-02-01", amount: 1000, type: "Cash IN" },
      { date: "2025-02-02", amount: 500, type: "Cash OUT" },
      { date: "2025-02-03", amount: 1200, type: "Cash IN" },
      { date: "2025-02-04", amount: 800, type: "Cash OUT" },
      { date: "2025-02-05", amount: 1500, type: "Cash IN" },
   ]);



   const handleMonthChange = (newMonth) => {
      setSelectedMonth(newMonth);
      // تحديث البيانات حسب الشهر المحدد
      setTransactionsData([
         { date: "2025-02-01", amount: 1000, type: "Cash IN" },
         { date: "2025-02-02", amount: 500, type: "Cash OUT" },
         { date: "2025-02-03", amount: 1200, type: "Cash IN" },
         { date: "2025-02-04", amount: 800, type: "Cash OUT" },
         { date: "2025-02-05", amount: 1500, type: "Cash IN" },
      ]);
   };

   return (
      <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-lg">
         <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaChartLine /> Transactions Chart
         </h2>

         {/* Date Range Picker */}
         <div className="flex items-center gap-6 mb-8">
            <div className="relative">
               <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     views={["year", "month"]}
                     value={selectedMonth}
                     onChange={handleMonthChange}
                     renderInput={({ inputRef, inputProps, InputProps }) => (
                        <div
                           ref={inputRef}
                           className="flex items-center gap-2 p-2 bg-[#333333] text-white rounded-lg cursor-pointer"
                        >
                           <FaCalendarAlt className="text-gray-400" />
                           <span>{selectedMonth.format("MMMM YYYY")}</span>
                           {InputProps?.endAdornment}
                        </div>
                     )}
                  />
               </LocalizationProvider>
            </div>
         </div>

         {/* Chart */}
         <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={transactionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip
                     content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                           return (
                              <motion.div
                                 className="bg-gray-700 p-4 rounded-lg shadow-lg text-white"
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ duration: 0.2 }}
                              >
                                 <p><strong>Date:</strong> {label}</p>
                                 <p><strong>Amount:</strong> ${payload[0].value}</p>
                                 <p><strong>Type:</strong> {payload[0].payload.type}</p>
                              </motion.div>
                           );
                        }

                        return null;
                     }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>

         {/* Additional Info */}
         <div className="mt-8 p-4 bg-gray-700 rounded-lg flex items-center gap-3 shadow-inner">
            <FaInfoCircle className="text-gray-400" />
            <p className="text-gray-400">Hover over the chart to see detailed transaction information.</p>
         </div>
      </div>
   );
};

export default TransactionsChart;
