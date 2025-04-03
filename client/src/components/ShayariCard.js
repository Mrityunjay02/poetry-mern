import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTwitter,
  faWhatsapp,
  faFacebook,
  faTelegram,
  faSnapchat
} from '@fortawesome/free-brands-svg-icons';
import { 
  faShare,
  faHeart,
  faCopy,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

const ShayariCard = ({ text, author = "Unknown", title = "", isAdmin, id, onDelete }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const handleShare = (platform) => {
    let shareUrl = '';
    const shayariText = `${title}\n\n${text}\n\n- ${author}`;
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shayariText)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shayariText)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shayariText)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shayariText)}`;
        break;
      case 'instagram':
        // Instagram sharing is limited to their app
        alert('Copy the text to share on Instagram');
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
    setShowShareMenu(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${title}\n\n${text}\n\n- ${author}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleEdit = () => {
    navigate('/admin', { state: { id, text, title, author } });
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        )}
        <p className="text-gray-600 mb-4 whitespace-pre-line">{text}</p>
        <p className="text-sm text-gray-500 italic">- {author}</p>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`text-${isLiked ? 'red' : 'gray'}-500 hover:text-red-600 transition-colors`}
          >
            <FontAwesomeIcon icon={faHeart} />
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faShare} />
            </motion.button>

            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl p-2 flex space-x-2"
              >
                <button onClick={() => handleShare('whatsapp')} className="text-green-500 hover:text-green-600">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </button>
                <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-700">
                  <FontAwesomeIcon icon={faFacebook} />
                </button>
                <button onClick={() => handleShare('twitter')} className="text-blue-400 hover:text-blue-500">
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button onClick={() => handleShare('telegram')} className="text-blue-500 hover:text-blue-600">
                  <FontAwesomeIcon icon={faTelegram} />
                </button>
                <button onClick={() => handleShare('instagram')} className="text-pink-600 hover:text-pink-700">
                  <FontAwesomeIcon icon={faInstagram} />
                </button>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className={`text-gray-500 hover:text-blue-600 transition-colors ${isCopied ? 'text-green-500' : ''}`}
          >
            <FontAwesomeIcon icon={faCopy} />
          </motion.button>
        </div>

        {isAdmin && (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faEdit} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} />
            </motion.button>
          </div>
        )}
      </div>

      {isCopied && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
};

export default ShayariCard;
