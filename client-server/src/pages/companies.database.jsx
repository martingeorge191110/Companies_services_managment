import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaUserTie,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const CompaniesDatabase = () => {
  // Dummy data for companies (admin and employee)
  const [companies, setCompanies] = useState({
    admin: [
      {
        id: 1,
        name: "Tech Innovators",
        avatar: "https://via.placeholder.com/50",
        specialize: "Software Development",
        business_type: "IT",
        isAccountValid: true,
      },
      {
        id: 2,
        name: "Green Energy Solutions",
        avatar: "https://via.placeholder.com/50",
        specialize: "Renewable Energy",
        business_type: "Energy",
        isAccountValid: false,
      },
    ],
    employee: [
      {
        id: 3,
        name: "Creative Designs",
        avatar: "https://via.placeholder.com/50",
        specialize: "Graphic Design",
        business_type: "Creative",
        isAccountValid: true,
      },
      {
        id: 4,
        name: "Health Plus",
        avatar: "https://via.placeholder.com/50",
        specialize: "Healthcare",
        business_type: "Medical",
        isAccountValid: true,
      },
    ],
  });

  const [showCreateCompany, setShowCreateCompany] = useState(false);

  // Function to handle creating a new company
  const handleCreateCompany = () => {
    setShowCreateCompany(true);
    // Logic to create a new company
    console.log("Redirect to company creation page");
  };

  return (
    <div className="min-h-screen bg-[#242424] flex flex-col w-screen justify-center text-white p-8">
      {/* Create Company Button */}
      <div className="flex justify-end mb-8 p-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateCompany}
          className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          <FaPlus className="mr-2" />
          Create New Company
        </motion.button>
      </div>

      {/* Admin Companies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaUserTie className="mr-2 text-blue-500" />
          Companies You Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.admin.map((company) => (
            <motion.div
              key={company.id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#333333] cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={company.avatar}
                  alt={company.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  <p className="text-sm text-gray-400">{company.specialize}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {company.business_type}
                </span>
                {company.isAccountValid ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* Employee Companies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaBuilding className="mr-2 text-green-500" />
          Companies You Work For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.employee.map((company) => (
            <motion.div
              key={company.id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#333333] cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={company.avatar}
                  alt={company.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  <p className="text-sm text-gray-400">{company.specialize}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {company.business_type}
                </span>
                {company.isAccountValid ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Create Company Modal (Optional) */}
      <AnimatePresence>
        {showCreateCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#333333] p-8 rounded-lg w-11/12 max-w-md text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Create New Company</h2>
              {/* Add form fields here */}
              <button
                onClick={() => setShowCreateCompany(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompaniesDatabase;
