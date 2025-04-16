import { motion } from 'framer-motion';
import WorldMap from '../components/WorldMap';

const About = () => {
  return (
    <motion.div 
      className="w-full py-6" 
      style={{ backgroundColor: '#2F2F2F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '8rem 2rem 6rem 6rem',
          position: 'relative',
          color: '#FFFFFF'
        }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-white max-w-3xl">
            <span style={{ marginLeft: '6rem' }}>
              Click on the points to explore my journey across the globe. Each location holds a special place in my story.
            </span>
          </p>
        </motion.div>
        <WorldMap />
      </motion.div>
    </motion.div>
  );
};

export default About;
