import React from 'react';
import { motion } from 'framer-motion';
import ShayariCard from '../components/ShayariCard';

const Home = ({ 
  shayaris, 
  loading, 
  error, 
  currentPage, 
  totalPages, 
  handlePageChange, 
  isAdmin, 
  handleDelete,
  notification 
}) => {
  return (
    <div className="container min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="text-center my-8">
          <motion.h2 
            className="text-5xl inline-block pb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              fontFamily: "'Angsana New', serif",
              letterSpacing: '0.02em',
              lineHeight: '1.4'
            }}
          >
            <span className="text-red-600 hover:text-red-700 transition-colors duration-300">P</span>
            <span className="text-pink-500 hover:text-pink-600 transition-colors duration-300">o</span>
            <span className="text-purple-600 hover:text-purple-700 transition-colors duration-300">e</span>
            <span className="text-blue-500 hover:text-blue-600 transition-colors duration-300">t</span>
            <span className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300">h</span>
            <span className="text-cyan-500 hover:text-cyan-600 transition-colors duration-300">a</span>
            <span className="text-teal-500 hover:text-teal-600 transition-colors duration-300">t</span>
            <span className="text-green-500 hover:text-green-600 transition-colors duration-300">i</span>
            <span className="text-emerald-500 hover:text-emerald-600 transition-colors duration-300">c</span>
          </motion.h2>
          <motion.div 
            className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {notification && (
          <motion.div 
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {notification}
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <motion.div 
            className="flex justify-center items-center min-h-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
          </motion.div>
        ) : Array.isArray(shayaris) && shayaris.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {shayaris.map((shayari, index) => (
                <ShayariCard 
                  key={shayari._id || index}
                  text={shayari.content} 
                  title={shayari.title}
                  author={shayari.author}
                  id={shayari._id} 
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="flex justify-center items-center space-x-4 my-8">
              <motion.button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </motion.button>
              <span className="text-lg">Page {currentPage} of {totalPages}</span>
              <motion.button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.p
            className="text-center text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            No shayaris available.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Home;
