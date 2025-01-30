import React from "react";
import ServicesSection from "../components/services.jsx";
import HeroSection from "../components/hero.section.jsx";
import FootBar from "../components/foot.bar.jsx";



const HomePage = () => {
  return (
    <div className=" w-screen bg font-sans">


      {/* /* Hero Section */ }
      <HeroSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Footer */}
      <FootBar />
    </div>
  );
};

export default HomePage;
