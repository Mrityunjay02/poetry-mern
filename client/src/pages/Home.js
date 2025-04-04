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
              Discover the beauty of words and immerse yourself in the world of shayari. Explore our collection, and let each piece of poetry touch your soul.
            </motion.p>
            <FaQuoteRight className="absolute bottom-0 right-0 text-red-400/30 text-4xl" />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12"
          >
            <Link 
              to="/shayari" 
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-red-50 to-white opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500 group-hover:blur-md" />
              <div className="absolute top-0 left-0 w-full h-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent transform transition-all duration-500"
                    style={{ 
                      fontFamily: "'Dancing Script', cursive",
                      letterSpacing: '0.02em',
                      textShadow: '0 0 1px rgba(0,0,0,0.1)'
                    }}>
                  ✨ Explore Shayaris
                </h3>
                <p className="text-lg text-gray-600 font-medium"
                   style={{
                     fontFamily: "'Playfair Display', serif",
                     lineHeight: '1.6',
                     textShadow: '0 0 1px rgba(0,0,0,0.05)'
                   }}>
                  Discover beautiful verses that touch your soul
                </p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-[-8px]">
                <FaFeather className="text-2xl text-red-500 animate-bounce" />
              </div>
            </Link>

            <Link 
              to="/about" 
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-white opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500 group-hover:blur-md" />
              <div className="absolute top-0 left-0 w-full h-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transform transition-all duration-500"
                    style={{ 
                      fontFamily: "'Dancing Script', cursive",
                      letterSpacing: '0.02em',
                      textShadow: '0 0 1px rgba(0,0,0,0.1)'
                    }}>
                  🌟 About Us
                </h3>
                <p className="text-lg text-gray-600 font-medium"
                   style={{
                     fontFamily: "'Playfair Display', serif",
                     lineHeight: '1.6',
                     textShadow: '0 0 1px rgba(0,0,0,0.05)'
                   }}>
                  Learn about our poetic journey
                </p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-[-8px]">
                <FaQuoteRight className="text-2xl text-purple-500 animate-bounce" />
              </div>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center space-x-3 mt-8"
          >
            <FaHeart className="text-red-500 animate-pulse text-3xl" />
            <p className="text-2xl sm:text-3xl font-medium bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent" 
               style={{ 
                 fontFamily: "'Dancing Script', cursive",
                 letterSpacing: '0.05em'
               }}>
              Where emotions meet words
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
