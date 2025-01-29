import React, { useState } from "react";




const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed w-full top-0 bg-transparent text-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-3 xl:px-12 py-4">
        <a href="#" className="flex items-center text-3xl font-bold">
          <img src="logo.png" alt="Logo" className="h-10 mr-2" />
          <span>Logo Here</span>
        </a>
        <ul className="hidden md:flex items-center space-x-10 font-semibold">
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Category
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Collections
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Contact Us
            </a>
          </li>
        </ul>
        <div className="hidden xl:flex items-center space-x-6">
          <a
            href="#"
            className="text-lg font-semibold hover:text-yellow-500 transition"
          >
            Try it Free
          </a>
          <a
            href="#"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Login
          </a>
          <a
            href="#"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Register
          </a>
        </div>
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

      <div className={`md:hidden ${showMenu ? "block" : "hidden"} mobile-menu`}>
        <ul className="p-4">
          <li className="active">
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white bg-gray-800 rounded hover:bg-gray-700"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white hover:bg-gray-700"
            >
              Category
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white hover:bg-gray-700"
            >
              Collections
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white hover:bg-gray-700"
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white hover:bg-gray-700"
            >
              Try it Free
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white hover:bg-gray-700"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sm px-2 py-4 text-white hover:bg-gray-700"
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
