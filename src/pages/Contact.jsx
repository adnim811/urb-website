import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiGooglecalendar } from 'react-icons/si';
import asciiArt from '../assets/ascii-art.png';
import '../styles/Contact.css';

const ContactParticles = () => {
  const generateParticleProps = () => ({
    '--x': `${Math.random() * 100}%`,
    '--y': `${Math.random() * 100}%`,
    '--duration': `${15 + Math.random() * 15}s`,
    '--delay': `${-Math.random() * 20}s`,
    '--size': `${3 + Math.random() * 3}px`,
  });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      backgroundColor: '#ffffff'
    }}>
      {Array.from({ length: 75 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            backgroundColor: '#e31837',
            borderRadius: '50%',
            opacity: 0.4,
            width: 'var(--size)',
            height: 'var(--size)',
            left: 'var(--x)',
            top: 'var(--y)',
            transition: 'opacity 0.3s ease',
            willChange: 'transform',
            animation: 'moveParticle var(--duration) ease-in-out infinite',
            animationDelay: 'var(--delay)',
            ...generateParticleProps()
          }}
        />
      ))}
    </div>
  );
};

function Contact() {
  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <style>
        {`
          @keyframes moveParticle {
            0% { transform: translate(0, 0); }
            25% { transform: translate(100px, -50px); }
            50% { transform: translate(200px, 0); }
            75% { transform: translate(100px, 50px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>

      <ContactParticles />
      
      <div className="contact-container">
        <div className="thought-layout">
          {/* ASCII Art with drawing animation */}
          <motion.div className="ascii-art-container">
            <motion.img
              src={asciiArt}
              alt="ASCII Art"
              className="ascii-art"
              initial={{ opacity: 0, clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)' }}
              animate={{ 
                opacity: 1,
                clipPath: [
                  'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)',
                  'polygon(-10% -10%, 110% 110%, 110% -10%, -10% -10%)',
                  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                ]
              }}
              transition={{ 
                opacity: { duration: 0.01, delay: 0 },
                clipPath: { 
                  duration: 2.2,
                  delay: 0.2,
                  ease: "easeInOut",
                  times: [0, 0.8, 1]
                }
              }}
            />
          </motion.div>

          {/* Thought bubbles */}
          <motion.div
            className="thought-bubbles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.5 }}
          >
            <div className="bubble small"></div>
            <div className="bubble medium"></div>
            <div className="bubble large"></div>
          </motion.div>

          {/* Speech bubble */}
          <motion.div 
            className="speech-bubble"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 3.0,
              ease: "easeOut"
            }}
          >
            <h2 className="connect-heading">Let's Connect!</h2>

            <p className="connect-text">
              I love meeting people from all walks of life. Whether you want to chat business, share an idea, need advice, or simply make an introduction — My inbox is always open!
            </p>

            <div className="contact-links">
              {/* LinkedIn */}
              <motion.a
                className="icon-link"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/adnim/"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
              >
                <FaLinkedin size={32} color="#0A66C2" />
                <span className="icon-text">Connect</span>
              </motion.a>

              {/* Envelope Email */}
              <motion.a
                className="icon-link"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:adnim@umich.edu"
                title="Email Me"
              >
                <FaEnvelope size={30} color="#000000" />
                <div className="icon-text email-text">
                  <span>Email Me</span>
                  <span className="email-address">adnim@umich.edu</span>
                </div>
              </motion.a>

              {/* Google Calendar */}
              <motion.a
                className="icon-link"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="https://calendar.app.google/63sfrRvz3LheLkkTA"
                target="_blank"
                rel="noopener noreferrer"
                title="Let's Chat"
              >
                <SiGooglecalendar size={32} color="#4285F4" />
                <span className="icon-text">Book a Meeting</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
