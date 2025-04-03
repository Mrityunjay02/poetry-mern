import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ title = "Welcome to My Shayari Website" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on escape key
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl md:text-3xl font-bold hover:text-red-500 transition-colors duration-300"
              style={{ fontFamily: "'Dancing Script', cursive" }}
              aria-label="Poethatic Home"
            >
              Poethatic
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            <Link to="/" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
              About
            </Link>
            <Link to="/shayari" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
              My Shayari
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden mobile-menu-container" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-b-lg shadow-lg">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:bg-gray-700 block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 active:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white hover:bg-gray-700 block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 active:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              About
            </Link>
            <Link
              to="/shayari"
              className="text-gray-300 hover:text-white hover:bg-gray-700 block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 active:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              My Shayari
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
