import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faFacebook, 
  faLinkedin, 
  faSnapchat, 
  faPinterest, 
  faThreads,
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  React.useEffect(() => {
    // Add Playfair Display font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="about-container">
      <div className="title-container">
        <h1 className="about-title">About</h1>
        <div className="title-underline"></div>
      </div>
      
      <div className="about-content">
        <h1 className="text-3xl font-bold mb-6 text-center">
   
        </h1>
        
        <p>Welcome to <span className="highlight">Poethatic</span>, where words come alive, emotions find a voice, and the essence of shayari touches the soul.</p>
        
        <p>My name is <span className="highlight">Mrityunjay Bhardwaj</span>, and I have always been captivated by the beauty of words and emotions. My journey with poetry began as a deep love for words and the emotions they carry, evolving into this platform where I share my thoughts with the world.</p>
        
        <p>Through Poethatic, I aim to create a sanctuary where words weave magic, emotions take flight, and every verse tells a story.</p>
        
        <p>Here, you will find a collection of my shayari that explores various themes—love, life, and reflections. Each piece is crafted with care and a touch of personal experience, hoping to resonate with your feelings and thoughts.</p>
        
        <p>Feel free to browse through the gallery of shayaris, and I hope you find something that speaks to you. Whether it's a moment of joy or contemplation, my poetry is here to accompany you.</p>
        
        <p>Thank you for visiting Poethatic. Your presence means a lot, and I hope you enjoy the journey through words and emotions. Let's embark on this poetic journey together, where every verse has a story and every word resonates with the heart.</p>
      </div>

      <div className="signature-section">
        <div className="signature">Mrityunjay Bhardwaj</div>
      </div>

      <div className="social-links">
        <a href="https://www.instagram.com/mjay._0/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
          <FontAwesomeIcon icon={faInstagram} />
          <span className="social-label">Instagram</span>
        </a>
        <a href="https://x.com/im_mjay_0" target="_blank" rel="noopener noreferrer" className="social-link x">
          <FontAwesomeIcon icon={faXTwitter} />
          <span className="social-label">X</span>
        </a>
        <a href="https://www.linkedin.com/in/mrityunjay-bhardwaj-38012a1b1/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
          <FontAwesomeIcon icon={faLinkedin} />
          <span className="social-label">LinkedIn</span>
        </a>
        <a href="https://www.facebook.com/mrityunjay2864" target="_blank" rel="noopener noreferrer" className="social-link facebook">
          <FontAwesomeIcon icon={faFacebook} />
          <span className="social-label">Facebook</span>
        </a>
        <a href="https://www.threads.net/@mjay._0" target="_blank" rel="noopener noreferrer" className="social-link threads">
          <FontAwesomeIcon icon={faThreads} />
          <span className="social-label">Threads</span>
        </a>
        <a href="https://www.snapchat.com/add/mjay_02" target="_blank" rel="noopener noreferrer" className="social-link snapchat">
          <FontAwesomeIcon icon={faSnapchat} />
          <span className="social-label">Snapchat</span>
        </a>
        <a href="https://in.pinterest.com/mjay_02/" target="_blank" rel="noopener noreferrer" className="social-link pinterest">
          <FontAwesomeIcon icon={faPinterest} />
          <span className="social-label">Pinterest</span>
        </a>
      </div>
    </div>
  );
};

export default About;
