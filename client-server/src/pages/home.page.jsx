import React from "react";
import Navbar from "../components/nav.bar";



const HomePage = () => {
  return (
    <div className="min-h-screen w-screen bg font-sans">
      {/* Navbar */}
      <Navbar />
      
      {/* /* Hero Section */ }
      <header className="bg-cover font-mono bg-center h-[400px] flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundImage: 'url("/hero-image.jpg")' }}>
        Empowering Businesses with Smart Solutions
      </header>
      
      {/* Services Section */}
      {/* <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">Accounting System</div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">User Dashboards</div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">Project Management</div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">Data Management</div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">Business Analytics</div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">Cloud Storage & Backup</div>
        </div>
      </section> */}
      
      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white p-6 text-center mt-8">
        <div className="flex justify-center space-x-6 mb-4">
          <span>📘</span> Facebook Icon
          <span>🐦</span> Twitter Icon
          <span>🔗</span> LinkedIn Icon
          <span>📸</span> Instagram Icon
        </div>
        <p>&copy; 2025 Company Services. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomePage;
