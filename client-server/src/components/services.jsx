import React from "react";
import { motion } from "framer-motion";




const ServicesSection = () => {



  const services = [
    {
      icon: "📊",
      title: "Accounting System",
      description: "نظام محاسبي متكامل لإدارة الحسابات المالية بدقة.",
    },
    {
      icon: "💰",
      title: "Financial System",
      description: "إدارة التدفقات المالية والتحليل المالي للشركات.",
    },
    {
      icon: "📂",
      title: "Project Management",
      description: "إدارة المشاريع بفعالية وتتبع التقدم بسهولة.",
    },
    {
      icon: "📦",
      title: "Product Management",
      description: "إدارة المنتجات والمخزون بشكل منظم وفعال.",
    },
    {
      icon: "👥",
      title: "Customer & Employee Data",
      description: "إدارة بيانات العملاء والموظفين بسهولة وأمان.",
    },
    {
      icon: "📈",
      title: "Data Analytics",
      description: "تحليل البيانات لاتخاذ قرارات أفضل.",
    },
  ];

  // bg-gradient-to-r from-blue-50 to-purple-50
  return (
    <motion.div
      className="py-16 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Our Services
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            }
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-transparent border-slate-50 border-solid border-[1px] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                  },
              }
            }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-white ">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;