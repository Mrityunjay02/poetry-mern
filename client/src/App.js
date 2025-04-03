import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddShayariForm from './components/AddShayariForm';
import ShayariCard from './components/ShayariCard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
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

  const fetchShayaris = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const API_URL = process.env.REACT_APP_API_URL || 'https://poetry-mern-backend.onrender.com/api';
      const response = await fetch(`${API_URL}/getShayari?page=${currentPage}&limit=10`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch shayaris');
      }

      // Log the response to see its structure
      console.log('API Response:', data);

      // Check if data is an array (direct array response)
      if (Array.isArray(data)) {
        setShayaris(data);
        setTotalPages(Math.ceil(data.length / 10));
        setCurrentPage(1);
      }
      // Check if data has shayaris property
      else if (data.shayaris && Array.isArray(data.shayaris)) {
        setShayaris(data.shayaris);
        setTotalPages(data.totalPages || Math.ceil(data.shayaris.length / 10));
        setCurrentPage(data.currentPage || 1);
      }
      // Check if data is a paginated response
      else if (data.data && Array.isArray(data.data)) {
        setShayaris(data.data);
        setTotalPages(data.totalPages || Math.ceil(data.data.length / 10));
        setCurrentPage(data.currentPage || 1);
      }
      else {
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
  }, [currentPage]);

  useEffect(() => {
    fetchShayaris();
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true);
    }
  }, [fetchShayaris]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    setShayaris([]);
    setCurrentPage(1);
    setTotalPages(0);
    navigate('/');
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://poetry-mern-backend.onrender.com/api';
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
    <div className="app">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} isAdmin={isAdmin} handleLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <Home 
              shayaris={shayaris} 
              loading={loading} 
              error={error} 
              currentPage={currentPage} 
              totalPages={totalPages} 
              handlePageChange={handlePageChange} 
              isAdmin={isAdmin} 
              handleDelete={handleDelete} 
              notification={notification} 
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AddShayariForm showNotification={showNotification} fetchShayaris={fetchShayaris} />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div className="text-center p-8"><h1 className="text-2xl text-gray-600">Page Not Found</h1></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
