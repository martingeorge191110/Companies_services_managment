import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaCalendarAlt, FaEdit, FaTrash, FaFileInvoice, FaFileExcel, FaPlus, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionsSection = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [filters, setFilters] = useState([]);
   const [selectedTransaction, setSelectedTransaction] = useState(null);
   const [showJournalEntry, setShowJournalEntry] = useState(false);
   const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [paymentMethod, setPaymentMethod] = useState("");
   const [assetAmount, setAssetAmount] = useState("");
   const [hasTax, setHasTax] = useState(false);
   const [status, setStatus] = useState("");
   const [type, setType] = useState("");

   const transactions = [
      {
         id: 1,
         date: "2025-02-01",
         amount: 1000,
         type: "Cash IN",
         customer: "John Doe",
         details: {
            description: "Payment for services",
            status: "Completed",
            paymentMethod: "Credit Card",
            taxRate: 15,
            discountRate: 5,
            dueDate: "2025-02-15",
            notes: "Thank you for your business!",
            customerEmail: "john.doe@example.com",
            customerPhone: "123-456-7890",
            journalEntry: {
               debit: "Accounts Receivable",
               credit: "Revenue",
               amount: 1000,
            },
            invoice: {
               invoiceNumber: "INV-001",
               invoiceLink: "https://example.com/invoice/INV-001",
            },
         },
      },
      {
         id: 2,
         date: "2025-02-02",
         amount: 500,
         type: "Cash OUT",
         customer: "Jane Smith",
         details: {
            description: "Office supplies",
            status: "Pending",
            paymentMethod: "Bank Transfer",
            taxRate: 10,
            discountRate: 2,
            dueDate: "2025-02-20",
            notes: "Please process ASAP.",
            customerEmail: "jane.smith@example.com",
            customerPhone: "987-654-3210",
            journalEntry: {
               debit: "Expenses",
               credit: "Cash",
               amount: 500,
            },
            invoice: {
               invoiceNumber: "INV-002",
               invoiceLink: "https://example.com/invoice/INV-002",
            },
         },
      },
   ];

   const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
   };

   const handleTransactionClick = (id) => {
      setSelectedTransaction(selectedTransaction === id ? null : id);
   };

   const handleViewJournalEntry = () => {
      setShowJournalEntry(!showJournalEntry);
      setShowInvoiceDetails(false); // Close Invoice Details if open
   };

   const handleViewInvoiceDetails = () => {
      setShowInvoiceDetails(!showInvoiceDetails);
      setShowJournalEntry(false); // Close Journal Entry if open
   };

   const handleAddFilter = (filter) => {
      setFilters([...filters, filter]);
   };

   const handleRemoveFilter = (index) => {
      setFilters(filters.filter((_, i) => i !== index));
   };

   const handleApplyFilters = () => {
      setIsFilterOpen(false);
      // Apply filters logic here
   };

   return (
      <div className="p-6 bg-[#242424] rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold text-white mb-6">Transactions</h2>

         {/* Search and Filters */}
         <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
               <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-2 pl-10 bg-[#333333] text-white rounded-lg focus:outline-none"
               />
               <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
               className="p-2 bg-[#333333] text-white rounded-lg flex items-center gap-2"
               onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
               <FaFilter /> Filters
            </button>
            <div className="flex items-center gap-2">
               <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="p-2 bg-[#333333] text-white rounded-lg"
               />
               <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="End Date"
                  className="p-2 bg-[#333333] text-white rounded-lg"
               />
               <FaCalendarAlt className="text-gray-400" />
            </div>
            <button
               className="p-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2"
               onClick={handleApplyFilters}
            >
               <FaSearch /> Search
            </button>
         </div>

         {/* Filteration Section */}
         <AnimatePresence>
            {isFilterOpen && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-[#333333] rounded-lg"
               >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <label className="text-white">Payment Method</label>
                        <select
                           value={paymentMethod}
                           onChange={(e) => setPaymentMethod(e.target.value)}
                           className="w-full p-2 bg-[#242424] text-white rounded-lg"
                        >
                           <option value="">Select Payment Method</option>
                           <option value="Credit Card">Credit Card</option>
                           <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-white">Asset Amount</label>
                        <input
                           type="number"
                           placeholder="Enter amount"
                           value={assetAmount}
                           onChange={(e) => setAssetAmount(e.target.value)}
                           className="w-full p-2 bg-[#242424] text-white rounded-lg"
                        />
                     </div>
                     <div>
                        <label className="text-white">Has Tax?</label>
                        <input
                           type="checkbox"
                           checked={hasTax}
                           onChange={(e) => setHasTax(e.target.checked)}
                           className="ml-2"
                        />
                     </div>
                     <div>
                        <label className="text-white">Status</label>
                        <select
                           value={status}
                           onChange={(e) => setStatus(e.target.value)}
                           className="w-full p-2 bg-[#242424] text-white rounded-lg"
                        >
                           <option value="">Select Status</option>
                           <option value="Completed">Completed</option>
                           <option value="Pending">Pending</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-white">Type</label>
                        <select
                           value={type}
                           onChange={(e) => setType(e.target.value)}
                           className="w-full p-2 bg-[#242424] text-white rounded-lg"
                        >
                           <option value="">Select Type</option>
                           <option value="Cash IN">Cash IN</option>
                           <option value="Cash OUT">Cash OUT</option>
                        </select>
                     </div>
                  </div>
                  <button
                     className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2"
                     onClick={() => handleAddFilter({ paymentMethod, assetAmount, hasTax, status, type })}
                  >
                     <FaPlus /> Add Filter
                  </button>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Applied Filters */}
         <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter, index) => (
               <motion.div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-[#333333] text-white rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
               >
                  <span>{JSON.stringify(filter)}</span>
                  <FaTimes
                     className="cursor-pointer"
                     onClick={() => handleRemoveFilter(index)}
                  />
               </motion.div>
            ))}
         </div>

         {/* Transactions List */}
         <div className="space-y-4">
            {transactions.map((transaction) => (
               <motion.div
                  key={transaction.id}
                  className="bg-[#333333] p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
               >
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-white font-semibold">{transaction.date}</p>
                        <p className="text-gray-400">{transaction.customer}</p>
                     </div>
                     <div className="flex items-center justify-between w-[8%]">
                        <div>
                        <p className="text-white font-semibold">${transaction.amount}</p>
                        <p
                           className={`text-sm ${transaction.type === "Cash IN" ? "text-green-500" : "text-red-500"
                              }`}
                        >
                           {transaction.type}
                        </p>
                        </div>
                        <button
                        className="p-2 bg-[#444444] text-white rounded-lg"
                        onClick={() => handleTransactionClick(transaction.id)}
                     >
                        {selectedTransaction === transaction.id ? (
                           <FaChevronUp />
                        ) : (
                           <FaChevronDown />
                        )}
                     </button>
                     </div>
                  </div>

                  {/* Transaction Details */}
                  <AnimatePresence>
                     {selectedTransaction === transaction.id && (
                        <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           className="mt-4 space-y-6 bg-zinc-800 p-6 rounded-lg shadow-inner"
                        >
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Description:</strong> {transaction.details.description}
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Status:</strong> {transaction.details.status}
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Payment Method:</strong> {transaction.details.paymentMethod}
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Tax Rate:</strong> {transaction.details.taxRate}%
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Discount Rate:</strong> {transaction.details.discountRate}%
                                 </p>
                              </div>
                              <div>
                                 <p className="flex items-center text-white">
                                    <FaCalendarAlt className="mr-2 text-yellow-400" />
                                    <strong>Due Date:</strong> {transaction.details.dueDate}
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-green-400" />
                                    <strong>Notes:</strong> {transaction.details.notes}
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Customer Email:</strong> {transaction.details.customerEmail}
                                 </p>
                                 <p className="flex items-center text-white">
                                    <FaEdit className="mr-2 text-blue-400" />
                                    <strong>Customer Phone:</strong> {transaction.details.customerPhone}
                                 </p>
                              </div>
                           </div>

                           {/* Buttons */}
                           <div className="flex gap-3 justify-center">
                              <button
                                 className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 hover:bg-blue-700 transition-transform transform hover:scale-105"
                                 onClick={handleViewJournalEntry}
                              >
                                 <FaEdit /> Journal Entry
                              </button>
                              <button
                                 className="px-4 py-2 bg-green-600 text-white rounded-full flex items-center gap-2 hover:bg-green-700 transition-transform transform hover:scale-105"
                                 onClick={handleViewInvoiceDetails}
                              >
                                 <FaFileInvoice /> Invoice Details
                              </button>
                              <button className="px-4 py-2 bg-red-600 text-white rounded-full flex items-center gap-2 hover:bg-red-700 transition-transform transform hover:scale-105">
                                 <FaTrash /> Delete
                              </button>
                           </div>

                           {/* Journal Entry */}
                           <AnimatePresence>
                              {showJournalEntry && (
                                 <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 p-4 bg-[#242424] rounded-lg"
                                 >
                                    <h3 className="text-xl font-bold text-white mb-4">Journal Entry</h3>
                                    <div className="text-white">
                                       <p><strong>Debit:</strong> {transaction.details.journalEntry.debit}</p>
                                       <p><strong>Credit:</strong> {transaction.details.journalEntry.credit}</p>
                                       <p><strong>Amount:</strong> ${transaction.details.journalEntry.amount}</p>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>

                           {/* Invoice Details */}
                           <AnimatePresence>
                              {showInvoiceDetails && (
                                 <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 p-4 bg-[#242424] rounded-lg"
                                 >
                                    <h3 className="text-xl font-bold text-white mb-4">Invoice Details</h3>
                                    <div className="text-white">
                                       <p><strong>Invoice Number:</strong> {transaction.details.invoice.invoiceNumber}</p>
                                       <p><strong>Invoice Link:</strong> <a href={transaction.details.invoice.invoiceLink} className="text-blue-500">View Invoice</a></p>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                       <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2">
                                          <FaTrash /> Delete Invoice
                                       </button>
                                       <button className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2">
                                          <FaPlus /> Create Invoice
                                       </button>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            ))}
         </div>

         {/* Export to Excel */}
         <button className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2">
            <FaFileExcel /> Export to Excel
         </button>
      </div>
   );
};

export default TransactionsSection;
