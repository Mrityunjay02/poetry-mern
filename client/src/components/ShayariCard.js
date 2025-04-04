import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTwitter,
  faWhatsapp,
  faFacebook,
  faTelegram,
  faSnapchat
} from '@fortawesome/free-brands-svg-icons';
import { faShare, faHeart, faCopy } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const ShayariCard = ({ text, author = "Unknown", title = "", isAdmin, id, onDelete }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleEdit = () => {
    navigate('/edit', { state: { text, id, title, author } });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this shayari?')) {
      await onDelete(id);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      showToast('Shayari copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      showToast('Failed to copy. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Beautiful Shayari from Poethatic',
          text: text,
          url: window.location.href
        });
        showToast('Shared successfully!');
      } else {
        await handleCopy();
        showToast('Link copied! You can now share it.');
      }
    } catch (err) {
      showToast('Failed to share. Please try again.');
    }
  };

  const socialLinks = [
    {
      label: 'WhatsApp',
      icon: faWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(`${text}\n\n- ${author}`)}`,
      color: 'bg-green-500'
    },
    {
      label: 'Facebook',
      icon: faFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      color: 'bg-blue-600'
    },
    {
      label: 'Twitter',
      icon: faTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text}\n\n- ${author}`)}`,
      color: 'bg-sky-500'
    },
    {
      label: 'Instagram',
      icon: faInstagram,
      url: 'https://www.instagram.com/',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      label: 'Telegram',
      icon: faTelegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${text}\n\n- ${author}`)}`,
      color: 'bg-blue-500'
    },
    {
      label: 'Snapchat',
      icon: faSnapchat,
      url: 'https://www.snapchat.com/',
      color: 'bg-yellow-400'
    }
  ];

  if (!text) {
    return null;
  }

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg mb-8 mx-auto max-w-3xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Gradient Border */}
      <div className="absolute -inset-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,182,255,0.1),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(148,182,255,0.1),_transparent_50%)] opacity-50" />

      {/* Main Content Container */}
      <div className="relative p-6 sm:p-8">
        {/* Title Section */}
        {title && (
          <div className="text-center mb-6">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#4a5568'
              }}>
              {title}
            </motion.h3>
          </div>
        )}

        {/* Shayari Text */}
        <div className="relative mb-6">
          <FaQuoteLeft className="absolute top-0 left-0 text-pink-400/20 text-3xl" />
          <div className="space-y-4 px-8 py-2">
            {text.split('\n').map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-lg sm:text-xl md:text-2xl text-center leading-relaxed tracking-wide"
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  color: '#2d3748',
                  textShadow: '0 0 1px rgba(0,0,0,0.1)',
                  lineHeight: '2'
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <FaQuoteRight className="absolute bottom-0 right-0 text-pink-400/20 text-3xl" />
        </div>

        {/* Author Section */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-right text-gray-600 italic mt-4 text-base sm:text-lg"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          - {author}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Social Share Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 ${link.color} text-white rounded-full flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={link.icon} className="text-lg" />
              </motion.a>
            ))}
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="font-medium">Edit</span>
              </button>

              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg flex items-center justify-center gap-2 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="font-medium">Delete</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Notification Toast */}
        {showNotification && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          >
            {notificationMessage}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ShayariCard;
