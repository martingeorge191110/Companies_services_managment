import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaUserTie,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { CompaniesDatabaseApi } from "../services/companies";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingPage from "./loading";

const CompaniesDatabase = () => {
  const token = useSelector((state) => state.user.token);
  const [companies, setCompanies] = useState(null);
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  const [isLoading, setIsLoading] = useState(true)


  const history = useHistory()

  // Function to handle creating a new company
  const handleCreateCompany = () => {
    setShowCreateCompany(true);
    console.log("Redirect to company creation page");
  };

  useEffect(() => {
    if (!companies) {
      CompaniesDatabaseApi(token)
        .then((res) => {
          if (res.success) setCompanies(res.data);
          setIsLoading(false)
        })
        .catch((rej) => console.log(rej));
    }
  }, [companies, token]);

  return (
    <>
    { isLoading ? <LoadingPage /> :
    <div className="min-h-screen bg-[#242424] w-screen justify-center text-white p-8">
      {/* Create Company Button */}
      <div className="flex justify-start border-b-[1px] border-solid border-white mb-8 pt-28 p-3">
        {/* Page Title Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">My Companies Database</h1>
          <p className="text-sm text-gray-400 mt-2">
            Manage and view all the companies you are associated with.
          </p>
        </div>

        {/* Create Company Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => history.push({
            pathname: '/companies/register/'
          })}
          className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          <FaPlus className="mr-2" />
          Start New Company
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
          {companies && companies.agentCompanies.length > 0 ? (
            companies.agentCompanies.map((company) => (
              <motion.div
              onClick={() => {
                history.push({
                  pathname: `/companies/dashboard/${company.company.id}`,
                  state: {
                    avatar: company.company.avatar,
                    name: company.company.name,
                    specialize: company.company.specialize,
                    business_type: company.company.business_type,
                  }
                })
              }}
                key={company.company.id}
                whileHover={{ scale: 1.02 }}
                className="bg-[#333333] cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={company.company.avatar}
                    alt={company.company.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{company.company.name}</h3>
                    <p className="text-sm text-gray-400">{company.company.specialize}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {company.company.business_type}
                  </span>
                  {company.company.valid_account ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full bg-[#333333] p-6 rounded-lg shadow-md text-center"
            >
              <FaExclamationCircle className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No Companies Found</h3>
              <p className="text-sm text-gray-400 mt-2">
                You need to create a company to become an admin.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateCompany}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Create Company
              </motion.button>
            </motion.div>
          )}
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
          {companies && companies.employeeCompanies && companies.employeeCompanies.length > 0 ? (
            companies.employeeCompanies.map((company) => (
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
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full bg-[#333333] p-6 rounded-lg shadow-md text-center"
            >
              <FaExclamationCircle className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No Companies Found</h3>
              <p className="text-sm text-gray-400 mt-2">
                You need an invitation to join a company as an employee.
              </p>
            </motion.div>
          )}
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
    }
    </>
  );
};

export default CompaniesDatabase;
