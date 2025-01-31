import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBuilding, FaChevronDown } from "react-icons/fa";

const BusinessTypeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const businessTypes = [
    "Accounting",
    "Finance",
    "Retail",
    "Manufacturing",
    "Healthcare",
    "Technology",
    "Education",
    "Hospitality",
    "Transportation",
  ];

  const handleSelect = (type) => {
    onChange({ target: { name: "business_type", value: type } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">Business Type</label>
      <div
        className="flex items-center bg-[#333333] p-3 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBuilding className="text-gray-400 mr-2" />
        <input
          type="text"
          name="business_type"
          value={value}
          readOnly
          className="w-full bg-transparent outline-none cursor-pointer"
          placeholder="Select business type"
          required
        />
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-gray-400" />
        </motion.div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 z-10 w-full bg-[#333333] mt-2 rounded-lg shadow-lg"
          >
            {businessTypes.map((type, index) => (
              <div
                key={index}
                className="p-3 hover:bg-[#444444] cursor-pointer transition duration-200"
                onClick={() => handleSelect(type)}
              >
                {type}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessTypeDropdown;
