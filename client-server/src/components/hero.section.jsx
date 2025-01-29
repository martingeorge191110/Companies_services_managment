import { motion } from "framer-motion";





const HeroSection = () => {


  return (
    <div className="max-w-screen mt-28 px-4 md:px-[10rem] py-16 flex flex-col md:flex-row items-center justify-between">
      {/* Text Section */}
      <motion.div
        className="w-full md:w-[40rem] text-center md:text-left"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
        }}
      >
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
          Discover the Future of Web Experiences
        </h2>
        <p className="text-lg text-white mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          scelerisque est et magna euismod, ac vestibulum ipsum efficitur. Sed
          placerat nisi a velit maximus, ac efficitur sem interdum. Morbi
          tincidunt erat in purus tristique, non sagittis magna vulputate.
        </p>
        <motion.div
          className="flex justify-center md:justify-start"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
          }}
        >
          <button className="px-6 py-3 bg-transparent border-solid border-[1px] border-white text-white font-semibold rounded-lg shadow-md hover:text-[#242424] hover:bg-white hover:border-white transition duration-300">
            Learn More
          </button>
          <button className="px-6 ml-2 py-3 bg-transparent border-solid border-[1px] border-white text-white font-semibold rounded-lg shadow-md hover:text-[#242424] hover:bg-white hover:border-white transition duration-300">
            Try Free for 30
          </button>
        </motion.div>
      </motion.div>

      {/* Image Section (Optional) */}
      <motion.div
        className="w-full md:w-[40rem] mt-8 md:mt-0"
        initial="hidden"
        animate="visible"
        //   variants={imageVariants}
      >
        <img
          src="hero-image.png"
          alt="Hero"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
