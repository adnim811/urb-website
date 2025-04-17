import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiGooglecalendar } from 'react-icons/si';
import asciiArt from '../assets/ascii-art.png';

function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: '#ffffff',
        color: '#000',
        minHeight: '100vh',
        padding: '0 2rem',
        fontFamily: "'Open Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* ASCII Art with drawing animation */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '0rem',
          left: '2rem',
          width: '350px',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <motion.img
          src={asciiArt}
          alt="ASCII Art"
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
          style={{
            width: '100%',
            height: 'auto',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Main content wrapper with thought bubble effect */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          delay: 3.0,
          ease: "easeOut"
        }}
        style={{
          marginTop: '15vh',
          position: 'relative',
          padding: '4rem 6rem',
          border: '3px solid black',
          borderRadius: '70% 70% 70% 70% / 60% 60% 60% 60%',
          background: 'white',
        }}
      >
        {/* Thought bubbles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.5 }}
          style={{
            position: 'absolute',
            left: '-100px',
            bottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            transform: 'rotate(-65deg)',
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '3px solid black',
            background: 'white',
          }} />
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '3px solid black',
            background: 'white',
            marginLeft: '35px',
          }} />
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid black',
            background: 'white',
            marginLeft: '70px',
          }} />
        </motion.div>

        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          Let's Connect!
        </h2>

        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '2.5rem',
            textAlign: 'center',
          }}
        >
          I love meeting people from all walks of life. Whether you want to chat business, share an idea, need advice, or simply make an introduction — My inbox is always open!
        </p>

        <div
          style={{
            display: 'flex',
            gap: '3rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* LinkedIn */}
          <motion.a
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/adnim/"
            target="_blank"
            rel="noopener noreferrer"
            title="Connect on LinkedIn"
            style={iconWrapper}
          >
            <FaLinkedin size={40} color="#0A66C2" />
            <span style={iconText}>Connect</span>
          </motion.a>

          {/* Envelope Email */}
          <motion.a
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:adnim@umich.edu"
            title="Email Me"
            style={iconWrapper}
          >
            <FaEnvelope size={38} color="#000000" />
            <div style={{...iconText, textAlign: 'center'}}>
              <span>Email Me</span>
              <span style={{ display: 'block', fontSize: '0.9rem', opacity: 0.8 }}>adnim@umich.edu</span>
            </div>
          </motion.a>

          {/* Google Calendar */}
          <motion.a
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            href="https://calendar.app.google/63sfrRvz3LheLkkTA"
            target="_blank"
            rel="noopener noreferrer"
            title="Let's Chat"
            style={iconWrapper}
          >
            <SiGooglecalendar size={40} color="#4285F4" />
            <span style={iconText}>Book a Meeting</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
}

const iconWrapper = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  transition: 'transform 0.2s ease',
  minWidth: '100px',
};

const iconText = {
  marginTop: '0.5rem',
};

export default Contact;
