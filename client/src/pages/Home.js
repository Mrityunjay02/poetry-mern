import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFeather, FaHeart, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll to top and handle loading state
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaFeather className="text-4xl text-red-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-50 origin-left"
        style={{ scaleX }}
      />
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 py-16 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <FaFeather className="mx-auto text-4xl sm:text-5xl text-red-600 hover:scale-110 transition-transform duration-300" />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8" 
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.4',
              letterSpacing: '0.02em'
            }}>
            Welcome to Poethatic
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="w-24 sm:w-32 h-1 mx-auto mb-8 sm:mb-12 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full"
          />

          <motion.div
            variants={quoteVariants}
            className="relative mb-12 px-8"
          >
            <FaQuoteLeft className="absolute top-0 left-0 text-red-400/30 text-4xl" />
            <motion.p 
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-12 text-gray-600 px-4"
              style={{ 
                fontFamily: "'Dancing Script', cursive",
                lineHeight: '1.6',
                letterSpacing: '0.02em'
              }}>
              Where words dance and emotions flow freely
            </motion.p>
            <FaQuoteRight className="absolute bottom-0 right-0 text-red-400/30 text-4xl" />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12"
          >
            <Link 
              to="/shayari" 
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 transform group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-2 relative z-10">Explore Shayaris</h3>
              <p className="text-gray-600 relative z-10">Discover beautiful verses that touch your soul</p>
            </Link>

            <Link 
              to="/about" 
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 transform group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold mb-2 relative z-10">About Us</h3>
              <p className="text-gray-600 relative z-10">Learn about our poetic journey</p>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center space-x-2 text-gray-500"
          >
            <FaHeart className="text-red-500 animate-pulse" />
            <p className="text-sm">Created with love for poetry lovers</p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
