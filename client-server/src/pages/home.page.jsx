import React, { useLayoutEffect } from "react";
import ServicesSection from "../components/services.jsx";
import HeroSection from "../components/hero.section.jsx";
import FootBar from "../components/foot.bar.jsx";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.js";



const HomePage = () => {

  const history = useHistory()

  useLayoutEffect(() => {
    history.push({
      pathname: "/"
    })
  }, [])

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
