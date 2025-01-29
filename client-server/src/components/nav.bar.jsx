import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Category", href: "#" },
    { name: "Collections", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const authLinks = [
    { name: "Try it Free", href: "#" },
    { name: "Login", href: "#" },
    { name: "Register", href: "#" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header className="fixed w-full top-0 bg-transparent text-white shadow-md z-50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 xl:px-12 py-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center text-3xl font-bold">
          <img src="logo.png" alt="Logo" className="h-10 mr-2" />
          <span>Logo Here</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-10 font-semibold">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="hover:text-gray-300 transition duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Links */}
        <div className="hidden xl:flex items-center space-x-6">
          {authLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`text-lg font-semibold hover:text-gray-300 transition duration-300 ${
                link.name === "Try it Free" ? "hover:text-yellow-500" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
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
            variants={menuVariants}
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
                  <a
                    href={link.href}
                    className={`block text-sm px-2 py-4 text-white hover:bg-gray-700 rounded transition duration-300 ${
                      link.name === "Try it Free" ? "hover:text-yellow-500" : ""
                    }`}
                  >
                    {link.name}
                  </a>
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