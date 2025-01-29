import React from "react";
import ServicesSection from "../components/services.jsx";
import HeroSection from "../components/hero.section.jsx";



const HomePage = () => {
  return (
    <div className=" w-screen bg font-sans">


      {/* /* Hero Section */ }
      <HeroSection />
      
      {/* Services Section */}
      <ServicesSection />
      
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
