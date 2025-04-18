import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FiFigma } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import hyderabad1 from '../assets/Hyderabad_1.jpg';

const ProjectCard = ({ 
  title = "Project Title", 
  description = "This is a sample project description that will be replaced with actual content. It showcases the project's key features and goals.", 
  image = hyderabad1,
  technologies = ["React", "Node.js", "MongoDB"],
  liveLink,
  figmaLink,
  githubLink,
  youtubeLink,
  category = "Web Development"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '1rem',
      }}
    >
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%', // 16:9 aspect ratio
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#e31837',
          marginBottom: '0.25rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {category}
        </div>
        
        <h3 style={{ 
          fontSize: '1.75rem',
          marginBottom: '0.75rem',
          fontFamily: "'DM Serif Display', serif",
          color: '#1a1a1a',
          lineHeight: '1.2'
        }}>
          {title}
        </h3>

        <p style={{ 
          fontSize: '1rem',
          color: '#666',
          marginBottom: '1.5rem',
          lineHeight: 1.6
        }}>
          {description}
        </p>

        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {technologies.map((tech, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#e31837',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                color: '#ffffff',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{ 
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          {figmaLink && (
            <motion.a
              href={figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: '#000',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
            >
              <FiFigma size={20} />
            </motion.a>
          )}
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: '#000',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
            >
              <FiGithub size={20} />
            </motion.a>
          )}
          {youtubeLink && (
            <motion.a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: '#FF0000',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
            >
              <FaYoutube size={20} />
            </motion.a>
          )}
          {liveLink && liveLink !== "#" && (
            <motion.a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: '#000',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
            >
              <FiExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 