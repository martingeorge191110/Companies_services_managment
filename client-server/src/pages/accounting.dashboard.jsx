import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import {
   FaChartLine,
   FaMoneyBillAlt,
   FaPrint,
   FaBuilding,
   FaCreditCard,
} from "react-icons/fa";
import AccountingMainChart from "../components/accounting.main.chart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { mainGrapthApi } from "../services/accounting.apis.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.js";
import LoadingPage from "./loading.jsx";
import { mainGraphAccountingAction } from "../store/actions.jsx";




const AccountingSystem = () => {

   const history = useHistory()
   const company = history.location.state
   const dispatch = useDispatch()


   const mainGraph = useSelector(
      state => state.company.accounting.mainGraph
   )


   const token = useSelector(
      state => state.user.token
   )

   const [isLoading, setIsLoading] = useState(true)

   const [activeSection, setActiveSection] = useState(null);

   useLayoutEffect(() => {
      if (!mainGraph) {
         mainGrapthApi(token, company.id).then(res => {
            if (res.success) {
               dispatch(mainGraphAccountingAction(res.data.result))
            }
            // console.log(res)
            setIsLoading(false)
         })
      }
      setIsLoading(false)
   }, [])

   // Dummy data for transactions
   const transactions = [
      { id: 1, date: "2023-10-01", description: "Office Supplies", amount: -150, invoice: "INV001" },
      { id: 2, date: "2023-10-02", description: "Client Payment", amount: 2000, invoice: "INV002" },
      { id: 3, date: "2023-10-03", description: "Internet Bill", amount: -50, invoice: "INV003" },
   ];

   // Dummy data for assets
   const assets = [
      { id: 1, name: "Office Equipment", value: 5000 },
      { id: 2, name: "Company Car", value: 15000 },
   ];

   // Dummy data for liabilities
   const liabilities = [
      { id: 1, name: "Bank Loan", value: 10000 },
      { id: 2, name: "Credit Card Debt", value: 2000 },
   ];


   return (
      <>
      {isLoading ? <LoadingPage/> :
      <div className="min-h-screen mt-28 w-screen bg-[#242424] text-white p-8">
         {/* Header */}
         <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
         >
            <h1 className="text-4xl font-bold mb-2">Accounting System</h1>
            <p className="text-lg text-gray-400">
               Manage your finances with ease and precision.
            </p>
         </motion.div>

         {/* Dashboard Section */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#333333] p-6 rounded-lg shadow-lg mb-8"
         >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
               <FaChartLine className="mr-2 text-blue-500" />
               Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Balance Overview */}
               {/* <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#444444] p-6 rounded-lg shadow-md"
               >
                  <h3 className="text-xl font-semibold mb-4">Balance Overview</h3>
                  <PieChart width={300} height={300}>
                     <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                     >
                        {chartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                     <Legend />
                  </PieChart>
               </motion.div> */}
               <AccountingMainChart monthlyData={mainGraph} />

               {/* Recent Transactions */}
               <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#444444] p-6 rounded-lg shadow-md"
               >
                  <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                  <div className="space-y-4">
                     {transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center">
                           <div>
                              <p className="text-sm text-gray-400">{transaction.date}</p>
                              <p className="font-semibold">{transaction.description}</p>
                           </div>
                           <p
                              className={`font-semibold ${transaction.amount < 0 ? "text-red-500" : "text-green-500"
                                 }`}
                           >
                              ${transaction.amount}
                           </p>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </motion.div>

         {/* Other Sections */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Transactions Section */}
            <motion.div
               whileHover={{ scale: 1.02 }}
               className="bg-[#333333] p-6 rounded-lg shadow-lg"
            >
               <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-green-500" />
                  Transactions
               </h2>
               <p className="text-gray-400 mb-4">
                  Manage all financial transactions with invoices and journal entries.
               </p>
               <button
                  onClick={() => setActiveSection("transactions")}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
               >
                  View Transactions
               </button>
            </motion.div>

            {/* Reports Section */}
            <motion.div
               whileHover={{ scale: 1.02 }}
               className="bg-[#333333] p-6 rounded-lg shadow-lg"
            >
               <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FaPrint className="mr-2 text-yellow-500" />
                  Reports
               </h2>
               <p className="text-gray-400 mb-4">
                  Generate detailed financial reports and sheets.
               </p>
               <button
                  onClick={() => setActiveSection("reports")}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
               >
                  View Reports
               </button>
            </motion.div>

            {/* Assets Section */}
            <motion.div
               whileHover={{ scale: 1.02 }}
               className="bg-[#333333] p-6 rounded-lg shadow-lg"
            >
               <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FaBuilding className="mr-2 text-purple-500" />
                  Assets
               </h2>
               <p className="text-gray-400 mb-4">
                  Track and manage your company's assets.
               </p>
               <button
                  onClick={() => setActiveSection("assets")}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
               >
                  View Assets
               </button>
            </motion.div>

            {/* Liabilities Section */}
            <motion.div
               whileHover={{ scale: 1.02 }}
               className="bg-[#333333] p-6 rounded-lg shadow-lg"
            >
               <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-red-500" />
                  Liabilities
               </h2>
               <p className="text-gray-400 mb-4">
                  Manage your company's liabilities and debts.
               </p>
               <button
                  onClick={() => setActiveSection("liabilities")}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
               >
                  View Liabilities
               </button>
            </motion.div>
         </div>

         {/* Detailed Section View */}
         {activeSection && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8"
            >
               <div className="bg-[#333333] p-6 rounded-lg shadow-lg w-full max-w-4xl">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                     {activeSection === "transactions" && (
                        <>
                           <FaMoneyBillAlt className="mr-2 text-green-500" />
                           Transactions
                        </>
                     )}
                     {activeSection === "reports" && (
                        <>
                           <FaPrint className="mr-2 text-yellow-500" />
                           Reports
                        </>
                     )}
                     {activeSection === "assets" && (
                        <>
                           <FaBuilding className="mr-2 text-purple-500" />
                           Assets
                        </>
                     )}
                     {activeSection === "liabilities" && (
                        <>
                           <FaCreditCard className="mr-2 text-red-500" />
                           Liabilities
                        </>
                     )}
                  </h2>
                  <div className="overflow-y-auto max-h-[70vh]">
                     {activeSection === "transactions" && (
                        <div className="space-y-4">
                           {transactions.map((transaction) => (
                              <div key={transaction.id} className="bg-[#444444] p-4 rounded-lg">
                                 <p className="text-sm text-gray-400">{transaction.date}</p>
                                 <p className="font-semibold">{transaction.description}</p>
                                 <p
                                    className={`font-semibold ${transaction.amount < 0 ? "text-red-500" : "text-green-500"
                                       }`}
                                 >
                                    ${transaction.amount}
                                 </p>
                                 <p className="text-sm text-gray-400">Invoice: {transaction.invoice}</p>
                              </div>
                           ))}
                        </div>
                     )}
                     {activeSection === "reports" && (
                        <div className="space-y-4">
                           <p className="text-gray-400">Financial reports will be generated here.</p>
                        </div>
                     )}
                     {activeSection === "assets" && (
                        <div className="space-y-4">
                           {assets.map((asset) => (
                              <div key={asset.id} className="bg-[#444444] p-4 rounded-lg">
                                 <p className="font-semibold">{asset.name}</p>
                                 <p className="text-sm text-gray-400">Value: ${asset.value}</p>
                              </div>
                           ))}
                        </div>
                     )}
                     {activeSection === "liabilities" && (
                        <div className="space-y-4">
                           {liabilities.map((liability) => (
                              <div key={liability.id} className="bg-[#444444] p-4 rounded-lg">
                                 <p className="font-semibold">{liability.name}</p>
                                 <p className="text-sm text-gray-400">Value: ${liability.value}</p>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                  <button
                     onClick={() => setActiveSection(null)}
                     className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                     Close
                  </button>
               </div>
            </motion.div>
         )}
      </div>
      }</>
   )
}

export default AccountingSystem;