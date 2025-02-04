import React, { useEffect, useLayoutEffect, useState } from "react";
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
import SystemCard from "../components/company.systems";
import { CompaniesDashboardApi } from "../services/companies.jsx";
import { useSelector } from "react-redux";
import LoadingPage from "./loading.jsx";



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
   const token = useSelector(
      state => state.user.token
   )

   const company = history.location.state;

   const featuresArray = [
      {
         auth: false,
         route: `/companies/accounting/${company.id}`,
         icon: <FaChartLine className="text-4xl text-blue-500" />,
         enumTitle: 'Accounting',
         title: "Accounting System",
         description: "Manage your finances with our advanced accounting system.",
      },
      {
         auth: false,
         route: '',
         icon: <FaUsers className="text-4xl text-green-500" />,
         enumTitle: 'Employee_Data_Management',
         title: "Employee Data Management",
         description: "Store and manage employee data securely and efficiently.",
      },
      {
         auth: false,
         route: '',
         icon: <FaMoneyBillAlt className="text-4xl text-yellow-500" />,
         enumTitle: 'Financial_System',
         title: "Financial System",
         description: "Get tailored financial solutions for your business.",
      },
      {
         auth: false,
         route: '',
         icon: <FaDatabase className="text-4xl text-purple-500" />,
         enumTitle: 'Data_Analysis_System',
         title: "Data Analysis System",
         description: "Analyze your data with our powerful tools.",
      },
      {
         auth: false,
         route: '',
         icon: <FaBoxes className="text-4xl text-red-500" />,
         enumTitle: 'Inventory_Management',
         title: "Inventory Management",
         description: "Track and manage your inventory seamlessly.",
      },
      {
         auth: false,
         route: '',
         icon: <FaProjectDiagram className="text-4xl text-indigo-500" />,
         enumTitle: 'Project_Management',
         title: "Project Management",
         description: "Organize and track projects efficiently.",
      },
      {
         auth: false,
         route: '',
         icon: <FaFileAlt className="text-4xl text-pink-500" />,
         enumTitle: 'Reports_System',
         title: "Reports System",
         description: "Generate detailed reports for your business.",
      },
      {
         auth: false,
         route: '',
         icon: <FaFileAlt className="text-4xl text-teal-500" />,
         enumTitle: 'Documents_System',
         title: "Documents System",
         description: "Manage all your documents in one place.",
      },
   ];

   const [isLoading, setIsLoading] = useState(false)
   const [systemsAuth, setSystemsAuth] = useState([])
   const [features, setFeatures] = useState(featuresArray)

   useLayoutEffect(() => {
      if (!systemsAuth || systemsAuth.length < 1) {
         CompaniesDashboardApi(token, company.id).then(
            res => {
               if (res.success) {
                  setSystemsAuth(res.data.systems)
               }
            }
         ).catch(rej => {
            setIsLoading(false)
            throw (rej)
         })
      }
   }, [])


   useEffect(() => {
      if (systemsAuth.length > 0) {
         setFeatures(
            features.map((ele) => {
               let newEle = ele
               if (systemsAuth.includes(ele.enumTitle))
                  newEle.auth = true

               return (newEle)
            })
         )
         setIsLoading(false)
      } else {
         setIsLoading(false)
      }
   }, [systemsAuth])




   return (
      <> { isLoading ? <LoadingPage/> :
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
               <SystemCard key={index} feature={feature} index={index} history={history} company={company}/>
            ))}
         </div>
      </div>
      }
      </>
   );
};

export default CompanyDashboard;
