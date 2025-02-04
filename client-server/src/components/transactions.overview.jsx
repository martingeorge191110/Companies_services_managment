import React, { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ComponentsError from "./component.error.jsx";






const OverviewSection = ({errorLoaded, systemId, token, balanceEquation}) => {
   const [openDetails, setOpenDetails] = useState(null);


   const data = [
      {
         id: 1,
         title: "Total Assets",
         amount: balanceEquation.assets.total,
         change: balanceEquation.assets.assetsChanges,
         details: [
            { name: "Accounts Receivable", amount: "50,000", change: "+2%" },
            { name: "Cash Flow", amount: "30,000", change: "+3%" },
            { name: "Fixed Assets", amount: "70,000", change: "+1%" },
         ],
      },
      {
         id: 2,
         title: "Total Liabilities",
         amount: balanceEquation.liabilities.total,
         change: balanceEquation.liabilities.liabilitiesChanges,
         details: [
            { name: "Accounts Payable", amount: "40,000", change: "-1%" },
            { name: "Tax Payments", amount: "20,000", change: "-3%" },
            { name: "Miscellaneous", amount: "20,000", change: "+2%" },
         ],
      },
      {
         id: 3,
         title: "Total Equity",
         amount: balanceEquation.equity.total,
         change: balanceEquation.equity.equityChanges,
         details: [
            { name: "Equity", amount: "50,000", change: "+4%" },
            { name: "Investments", amount: "20,000", change: "+1%" },
         ],
      },
   ];

   const toggleDetails = (id) => {
      setOpenDetails(openDetails === id ? null : id);
   };

   return (
      <> {errorLoaded ? <ComponentsError statusCode={errorLoaded.status} errorMessage={errorLoaded.message} validationErrors={errorLoaded.validationErrors} /> :
      <div className="p-6 bg-[#242424] rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold text-center text-white mb-6">Transactions Overview</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data && data.map((item) => (
               <motion.div
                  key={item.id}
                  className={`p-6 rounded-lg cursor-pointer ${openDetails === item.id ? "bg-[#444444]" : "bg-[#333333]"}`}
                  onClick={() => toggleDetails(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
               >
                  <div className="text-white">
                     <h3 className="text-lg font-semibold">{item.title}</h3>
                     <p className="text-2xl font-bold mt-2">${item.amount}</p>
                     <div className="flex items-center mt-2">
                        {Number(item.change) < 0 ? (
                           <FaArrowDown className="text-red-500 mr-2" />
                        ) : (
                           <FaArrowUp className="text-green-500 mr-2" />
                        )}
                        <span className={`text-sm ${item.change < 0 ? "text-red-500" : "text-green-500"}`}>
                           {item.change}% last month
                        </span>
                     </div>
                     {/* Progress Bar */}
                     <div className="mt-4">
                        <div className="bg-gray-600 rounded-full h-2">
                           <div className={`bg-${item.change < 0 ? 'red-500' : 'green-500'} rounded-full h-2`} style={{ width: item.isIncrease ? '5%' : '3%' }} />
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         <AnimatePresence>
            {openDetails !== null && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-6 bg-[#333333] rounded-lg p-6"
               >
                  <h3 className="text-xl font-bold text-white mb-4">
                     {data[openDetails - 1].title} Details
                  </h3>
                  <div className="overflow-x-auto">
                     <table className="min-w-full bg-[#242424] rounded-lg">
                        <thead>
                           <tr className="text-left border-b border-gray-600">
                              <th className="p-3 text-gray-400">Item</th>
                              <th className="p-3 text-gray-400">Amount</th>
                              <th className="p-3 text-gray-400">Change</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data[openDetails - 1].details.map((detail, index) => (
                              <motion.tr
                                 key={index}
                                 className="border-b border-gray-600 last:border-b-0"
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: index * 0.1 }}
                              >
                                 <td className="p-3 text-white">{detail.name}</td>
                                 <td className="p-3 text-white">${detail.amount}</td>
                                 <td className="p-3 flex items-center">
                                    {detail.change.startsWith("+") ? (
                                       <FaArrowUp className="text-green-500 mr-2" />
                                    ) : (
                                       <FaArrowDown className="text-red-500 mr-2" />
                                    )}
                                    <span className={detail.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                                       {detail.change}
                                    </span>
                                 </td>
                              </motion.tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
      } </>
   );
};

export default OverviewSection;
