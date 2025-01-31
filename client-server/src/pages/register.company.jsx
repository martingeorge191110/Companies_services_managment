import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaPlus,
  FaBell,
  FaUsers,
  FaChartLine,
  FaProjectDiagram,
  FaDatabase,
} from "react-icons/fa";
import InputObligatory from "../components/input.obligatory.jsx";
import BusinessTypeDropdown from "../components/business.types.jsx";

const CompanyRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    business_type: "",
    avatar: "",
    registration_number: "",
    specialize: "",
    address: "",
    currency: "",
    fiscal_year: "",
    started_date: "",
  });

  const [showOptionalFields, setShowOptionalFields] = useState({
    avatar: false,
    registration_number: false,
    specialize: false,
    address: false,
    currency: false,
    fiscal_year: false,
    started_date: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Logic to submit form data
  };

  const toggleOptionalField = (field) => {
    setShowOptionalFields({
      ...showOptionalFields,
      [field]: !showOptionalFields[field],
    });
  };

  return (
    <div className="min-h-screen  justify-between mt-[7rem] w-screen bg-[#242424] text-white p-8 flex">
      {/* Left Side: Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 pr-8 "
      >
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <FaBuilding className="mr-2 text-blue-500" />
          Create Your Company
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Obligatory Fields */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaCheckCircle className="mr-2 text-green-500" />
              Obligatory Information
            </h2>

            {/* Company Name */}
            <InputObligatory type={"text"} name={"name"} value={formData.name} setValue={handleChange} content={"Company Name"}
              classes={"w-full bg-transparent outline-none"} icon={"FaBuilding"} placeholder={"Enter company name"}/>

            {/* Email */}
            <InputObligatory type={"email"} name={"email"} value={formData.email} setValue={handleChange} content={"Company Email Address"}
              classes={"w-full bg-transparent outline-none"} icon={"FaEnvelope"} placeholder={"Enter company eamil"}/>

            {/* Phone Number */}
            <InputObligatory type={"text"} name={"phone_number"} value={formData.phone_number} setValue={handleChange} content={"Company Phone Number"}
              classes={"w-full bg-transparent outline-none"} icon={"FaPhone"} placeholder={"Enter Company Phone Number"}/>

            {/* Business Type */}
            <BusinessTypeDropdown
              value={formData.business_type}
              onChange={handleChange}
            />
          </div>

          {/* Not Obligatory Fields */}
          <div className="space-y-6">
            <h2
              className="text-2xl font-bold mb-4 flex items-center justify-center cursor-pointer hover:scale-x-105 transition-all"
              onClick={() =>
                setShowOptionalFields((prev) => ({ ...prev, all: !prev.all }))
              }
            >
              <FaPlus className="mr-2 text-blue-500" />
              Additional Information (Optional)
            </h2>

            {/* Registration Number */}
            <AnimatePresence>
              {showOptionalFields.all && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOptionalField("registration_number")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center bg-[#333333] p-3 rounded-lg">
                      <FaBuilding className="text-gray-400 mr-2" />
                      <span>Add Registration Number</span>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {showOptionalFields.registration_number && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          name="registration_number"
                          value={formData.registration_number}
                          onChange={handleChange}
                          className="w-full bg-[#333333] p-3 rounded-lg outline-none"
                          placeholder="Enter registration number"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Specialize */}
            <AnimatePresence>
              {showOptionalFields.all && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOptionalField("specialize")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center bg-[#333333] p-3 rounded-lg">
                      <FaBuilding className="text-gray-400 mr-2" />
                      <span>Add Specialization</span>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {showOptionalFields.specialize && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          name="specialize"
                          value={formData.specialize}
                          onChange={handleChange}
                          className="w-full bg-[#333333] p-3 rounded-lg outline-none"
                          placeholder="Enter specialization"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address */}
            <AnimatePresence>
              {showOptionalFields.all && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOptionalField("address")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center bg-[#333333] p-3 rounded-lg">
                      <FaMapMarker className="text-gray-400 mr-2" />
                      <span>Add Address</span>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {showOptionalFields.address && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full bg-[#333333] p-3 rounded-lg outline-none"
                          placeholder="Enter company address"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Currency */}
            <AnimatePresence>
              {showOptionalFields.all && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOptionalField("currency")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center bg-[#333333] p-3 rounded-lg">
                      <FaMoneyBillAlt className="text-gray-400 mr-2" />
                      <span>Add Currency</span>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {showOptionalFields.currency && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className="w-full bg-[#333333] p-3 rounded-lg outline-none"
                          placeholder="Enter currency"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fiscal Year */}
            <AnimatePresence>
              {showOptionalFields.all && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOptionalField("fiscal_year")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center bg-[#333333] p-3 rounded-lg">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span>Add Fiscal Year</span>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {showOptionalFields.fiscal_year && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          name="fiscal_year"
                          value={formData.fiscal_year}
                          onChange={handleChange}
                          className="w-full bg-[#333333] p-3 rounded-lg outline-none"
                          placeholder="Enter fiscal year"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Started Date */}
            <AnimatePresence>
              {showOptionalFields.all && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOptionalField("started_date")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center bg-[#333333] p-3 rounded-lg">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span>Add Started Date</span>
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {showOptionalFields.started_date && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          type="date"
                          name="started_date"
                          value={formData.started_date}
                          onChange={handleChange}
                          className="w-full bg-[#333333] p-3 rounded-lg outline-none"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-bold shadow-md text-[1.1rem] hover:bg-blue-600 transition duration-300"
          >
            Let's Start Our Amazing Journy
          </motion.button>
        </form>
      </motion.div>

      {/* Right Side: Features Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-1/2 pl-8 pt-[9.5rem]"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          Why Choose Us?
        </h2>
        <div className="space-y-6">
          {/* Real-Time Notifications */}
          <div className="flex items-start">
            <FaBell className="text-2xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Real-Time Notifications</h3>
              <p className="text-sm text-gray-400">
                Stay updated with real-time notifications for employees,
                investors, and company activities.
              </p>
            </div>
          </div>

          {/* Investor Access */}
          <div className="flex items-start">
            <FaUsers className="text-2xl text-green-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Investor Access</h3>
              <p className="text-sm text-gray-400">
                Attract investors and allow them to view your company's progress
                and invest seamlessly.
              </p>
            </div>
          </div>

          {/* Accounting System */}
          <div className="flex items-start">
            <FaChartLine className="text-2xl text-yellow-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">
                Advanced Accounting System
              </h3>
              <p className="text-sm text-gray-400">
                Manage your finances with a robust accounting system tailored
                for your business.
              </p>
            </div>
          </div>

          {/* Project Management */}
          <div className="flex items-start">
            <FaProjectDiagram className="text-2xl text-purple-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Project Management</h3>
              <p className="text-sm text-gray-400">
                Organize and track projects efficiently with our project
                management tools.
              </p>
            </div>
          </div>

          {/* Employee Data Management */}
          <div className="flex items-start">
            <FaDatabase className="text-2xl text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">
                Employee Data Management
              </h3>
              <p className="text-sm text-gray-400">
                Store and manage employee data securely and efficiently.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyRegister;
