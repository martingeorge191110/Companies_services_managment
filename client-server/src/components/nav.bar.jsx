import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";



const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };



  const userInfo = useSelector((state) => state.user.info);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Category", href: "#" },
    { name: "Collections", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const authLinks = [
    { name: "Try it Free", href: "#" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "#" },
  ];

  return (
    <header className="fixed w-full top-0 bg-transparent p-[1.5rem] text-white shadow-md z-50 backdrop-blur-[8px]">
      <nav className="max-w-7xl font-serif mx-auto flex justify-between items-center px-4 xl:px-12 py-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center text-3xl font-bold">
          <img src="logo.png" alt="Logo" className="h-10 mr-2" />
          <span>Logo Here</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-10 text-[1.15rem] font-semibold">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className="hover:text-gray-300 transition duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Links and User Profile */}
        <div className="hidden xl:flex items-center space-x-6">
          {!userInfo ? (
            authLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`text-[1.2rem] font-semibold hover:text-gray-300 transition duration-300 ${
                  link.name === "Try it Free"
                    ? " text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    : ""
                }`}
              >
                {link.name}
              </a>
            ))
          ) : (
            <div className="flex items-center space-x-6">
              {/* Try it Free Button */}
              <a
                href="#"
                className="text-[1.2rem] border-white border-solid border-2px font-semibold block text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#242424] transition duration-300"
              >
                Try it Free
              </a>

              {/* User Profile */}
              <div className="relative group">
                {/* Profile Icon or Image */}
                {
                  <FaUserCircle className="w-10 h-10 text-gray-300 cursor-pointer hover:scale-[1.2] transition duration-300" />
                }

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {/* User Info */}
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-800">
                        {userInfo.f_n + ' ' + userInfo.l_n}
                      </p>
                      <p className="text-xs text-gray-500">{userInfo.email}</p>
                    </div>

                    {/* Menu Links */}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/companies/data-base/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      My Companies
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="block border-t  border-solid px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="outline-none mobile-menu-button"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="md:hidden mobile-menu bg-gray-900 bg-opacity-95"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
            }}
            transition={{ duration: 0.3 }}
          >
            <ul className="p-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block text-sm px-2 py-4 text-white hover:bg-gray-700 rounded transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              {authLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`block text-sm px-2 py-4 text-white hover:bg-gray-700 rounded transition duration-300 ${
                      link.name === "Try it Free" ? "hover:text-yellow-500" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;