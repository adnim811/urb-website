import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';

function Hero() {
  const MotionLink = motion(Link);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'white' }}
    >
      <ParticlesBackground />
      <main
        style={{
          backgroundColor: 'transparent',
          color: '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(1rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem)',
          fontFamily: "'Open Sans', sans-serif",
          position: 'relative',
          zIndex: 1
        }}
      >
        <motion.a
          href="https://www.linkedin.com/in/adnim"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          <motion.img
            src={profileImg}
            alt="Aditya Nimbalkar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            transition={{ duration: 0.6 }}
            style={{
              width: 'clamp(120px, 25vw, 180px)',
              height: 'clamp(120px, 25vw, 180px)',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(3rem, 10vw, 5rem)',
            fontWeight: '700',
            marginBottom: '1.2rem',
          }}
        >
          Aditya Nimbalkar
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 400,
            opacity: 0.7,
          }}
        >
          <Typewriter
            words={[
              'Product Management',
              'Entrepreneurship',
              'Built Environment',
              'Community Building',
              'Urban Technology',
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1600}
          />
        </motion.div>

        <MotionLink
          to="/projects"
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="button"
          style={{ marginTop: '3rem' }}
        >
          View My Work →
        </MotionLink>
      </main>
    </motion.section>
  );
}

export default Hero;
