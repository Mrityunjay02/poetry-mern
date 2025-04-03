import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddShayariForm from './components/AddShayariForm';
import ShayariCard from './components/ShayariCard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';
import debounce from 'lodash.debounce';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [shayaris, setShayaris] = useState([]);
  const [notification, setNotification] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchShayaris = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        setError(null);
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8083/api';
        const response = await fetch(`${API_URL}/getShayari?page=${currentPage}&limit=10`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch shayaris');
        }

        if (data.success && Array.isArray(data.shayaris)) {
          setShayaris(data.shayaris);
          setTotalPages(data.pagination?.totalPages || 1);
          setCurrentPage(data.pagination?.currentPage || 1);
          showNotification('Shayaris fetched successfully!');
        } else {
          console.error('Invalid response format:', data);
          throw new Error('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching shayaris:', error);
        setError(error.message || 'Error fetching shayaris. Please try again later.');
        setShayaris([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [currentPage]
  );

  useEffect(() => {
    fetchShayaris();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true);
    }
  }, [location.pathname, currentPage]);

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentPage(1);
    }
  }, [location.pathname]);

  const showNotification = (message) => {
    if (!notification) {
      setNotification(message);
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      setIsAdmin(false);
      setShayaris([]);
      setCurrentPage(1);
      setTotalPages(0);
      navigate('/');
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8083/api';
      const response = await fetch(`${API_URL}/deleteShayari/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete shayari');
      }

      showNotification('Shayari deleted successfully!');
      fetchShayaris();
    } catch (error) {
      console.error('Error deleting shayari:', error);
      showNotification('Error deleting shayari. Please try again.');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container min-h-screen flex flex-col">
      <nav className="flex items-center justify-between mb-8 p-4">
        <Link to="/" className="no-underline hover:opacity-80 transition-opacity duration-300">
          <div className="logo text-3xl" style={{ 
            fontFamily: "'Cedarville Cursive', cursive",
            letterSpacing: '0.05em'
          }}>
            <span className="text-red-700">M</span>jay
            <span className="text-red-700">P</span>oetry
          </div>
        </Link>
        <button className="hamburger md:hidden" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`flex space-x-6 md:flex ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-300">Home</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-300">About</Link></li>
          <li><Link to="/shayari" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-300">My Shayari</Link></li>
          {isAdmin && (
            <>
              <li><Link to="/shayariManagement" onClick={() => setIsMenuOpen(false)} className="hover:text-red-600 transition-colors duration-300">Shayari Management</Link></li>
              <li><button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="hover:text-red-600 transition-colors duration-300">Logout</button></li>
            </>
          )}
        </ul>
      </nav>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shayari" element={
            <div>
              <div className="text-center my-8">
                <h2 className="text-5xl inline-block pb-2" 
                    style={{ 
                      fontFamily: "'Angsana New', serif",
                      letterSpacing: '0.02em',
                      lineHeight: '1.4'
                    }}>
                  <span className="text-red-600 hover:text-red-700 transition-colors duration-300">M</span>
                  <span className="text-pink-500 hover:text-pink-600 transition-colors duration-300">y</span>
                  <span className="mx-3"></span>
                  <span className="text-purple-600 hover:text-purple-700 transition-colors duration-300">S</span>
                  <span className="text-blue-500 hover:text-blue-600 transition-colors duration-300">h</span>
                  <span className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300">a</span>
                  <span className="text-cyan-500 hover:text-cyan-600 transition-colors duration-300">y</span>
                  <span className="text-teal-500 hover:text-teal-600 transition-colors duration-300">a</span>
                  <span className="text-green-500 hover:text-green-600 transition-colors duration-300">r</span>
                  <span className="text-emerald-500 hover:text-emerald-600 transition-colors duration-300">i</span>
                </h2>
                <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-red-600 via-purple-600 to-emerald-500 rounded-full"></div>
              </div>
              {notification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                  {notification}
                </div>
              )}
              {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                  {error}
                </div>
              )}
              {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                </div>
              ) : Array.isArray(shayaris) && shayaris.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {shayaris.map((shayari, index) => (
                      <ShayariCard 
                        key={shayari._id || index}
                        text={shayari.content} 
                        title={shayari.title}
                        author={shayari.author}
                        id={shayari._id} 
                        isAdmin={Boolean(localStorage.getItem('token'))} 
                        onDelete={handleDelete}
                        fetchShayaris={fetchShayaris}
                      />
                    ))}
                  </div>
                  {/* Pagination Buttons */}
                  <div className="flex justify-center items-center space-x-4 my-8">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors duration-300"
                    >
                      Previous
                    </button>
                    <span className="text-lg">Page {currentPage} of {totalPages}</span>
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors duration-300"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <p>No shayaris available.</p>
              )}
            </div>
          } />
        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shayariManagement" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AddShayariForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>

      <footer className="mt-auto py-4 text-center border-t border-gray-200">
        <p className="text-gray-600" style={{ fontFamily: "'Angsana New', serif", fontSize: '1.1rem' }}>
          &copy; August 2024 MjayPoetry. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
