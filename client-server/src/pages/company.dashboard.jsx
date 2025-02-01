import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
   FaBuilding,
   FaChartLine,
   FaUsers,
   FaDatabase,
   FaBoxes,
   FaProjectDiagram,
   FaFileAlt,
   FaMoneyBillAlt,
} from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom";







/**
 * 
 * 
 * 
 * authoirsation must be determinde, if the user has not the ability to manipulate to specific features
 * 
 * 
 * 
 */


const CompanyDashboard = () => {

   const history = useHistory()

   const company = history.location.state;



   useEffect(() => {

   }, [])




   // Features data
   const features = [
      {
         route: `/companies/accounting/${company.id}`,
         icon: <FaChartLine className="text-4xl text-blue-500" />,
         title: "Accounting System",
         description: "Manage your finances with our advanced accounting system.",
      },
      {
         route: '',
         icon: <FaUsers className="text-4xl text-green-500" />,
         title: "Employee Data Management",
         description: "Store and manage employee data securely and efficiently.",
      },
      {
         route: '',
         icon: <FaMoneyBillAlt className="text-4xl text-yellow-500" />,
         title: "Financial System",
         description: "Get tailored financial solutions for your business.",
      },
      {
         route: '',
         icon: <FaDatabase className="text-4xl text-purple-500" />,
         title: "Data Analysis System",
         description: "Analyze your data with our powerful tools.",
      },
      {
         route: '',
         icon: <FaBoxes className="text-4xl text-red-500" />,
         title: "Inventory Management",
         description: "Track and manage your inventory seamlessly.",
      },
      {
         route: '',
         icon: <FaProjectDiagram className="text-4xl text-indigo-500" />,
         title: "Project Management",
         description: "Organize and track projects efficiently.",
      },
      {
         route: '',
         icon: <FaFileAlt className="text-4xl text-pink-500" />,
         title: "Reports System",
         description: "Generate detailed reports for your business.",
      },
      {
         route: '',
         icon: <FaFileAlt className="text-4xl text-teal-500" />,
         title: "Documents System",
         description: "Manage all your documents in one place.",
      },
   ];

   return (
      <div className="min-h-screen w-screen mt-28 bg-[#242424] text-white p-8">
         {/* Company Information Section */}
         <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
         >
            <img
               src={company.avatar}
               //  alt={company.name}
               className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
            <p className="text-lg text-gray-400">{company.business_type}</p>
            <p className="text-sm text-gray-400">{company.specialize}</p>
         </motion.div>

         {/* Features Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
               <motion.div
               onClick={() => {
                  history.push({
                     pathname: feature.route,
                     state: company
                  })
               }}
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  // transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#333333] p-6 cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-all "
               >
                  <div className="text-center">
                     <div className="flex justify-center mb-4">{feature.icon}</div>
                     <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                     <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
   );
};

export default CompanyDashboard;
