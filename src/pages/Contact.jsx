import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiGooglecalendar } from 'react-icons/si';
import asciiArt from '../assets/ascii-art.png';
import thoughtBubble1 from '../assets/Thought_Bubble 1.png';
import thoughtBubble2 from '../assets/Thought_Bubble 2.png';

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
              times: [0, 0.8, 1] // Controls the timing of each keyframe
            }
          }}
          style={{
            width: '100%',
            height: 'auto',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Thought Bubble 1 */}
      <motion.img
        src={thoughtBubble1}
        alt="Thought Bubble 1"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.4,
          delay: 2.5, // Adjusted delay to account for slower ASCII art
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          bottom: '300px',
          left: '400px',
          width: '200px',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Thought Bubble 2 */}
      <motion.img
        src={thoughtBubble2}
        alt="Thought Bubble 2"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.4,
          delay: 2.7, // Adjusted delay to account for slower ASCII art
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          bottom: '300px',
          left: '600px',
          width: '750px',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main content wrapper with delayed fade in */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          delay: 3.0, // Adjusted delay to account for slower ASCII art
          ease: "easeOut"
        }}
        style={{
          marginTop: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginBottom: '1.5rem',
          }}
        >
          Let's connect
        </h2>

        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '2.5rem',
          }}
        >
          I love hearing from other creatives, builders, and curious minds. Whether you want to chat product, share an idea, or just say hi — I'm all ears.
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
            <span style={iconText}>Email Me <br />
            adnim@umich.edu<br /> </span>
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
            <span style={iconText}>Let's Chat</span>
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
