import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { FiSearch } from 'react-icons/fi';

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample categories - replace with your actual categories
  const categories = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Data Science'];

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      title: "Project One",
      description: "A sample project showcasing various features and technologies. This description will be replaced with actual project details.",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Web Development",
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "Project Two",
      description: "Another sample project with different features and implementation details. Replace with actual project information.",
      technologies: ["React Native", "Firebase"],
      category: "Mobile Apps",
      githubLink: "#",
      liveLink: "#"
    },
    {
      title: "Project Three",
      description: "A third sample project demonstrating different aspects of development and design. Update with real project content.",
      technologies: ["Figma", "Adobe XD"],
      category: "UI/UX Design",
      githubLink: "#",
      liveLink: "#"
    },
    // Add more project templates as needed
  ];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        padding: '4rem 2rem',
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}
        >
          My Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            textAlign: 'center',
            lineHeight: 1.6
          }}
        >
          A collection of my work in web development, design, and more. Each project represents a unique challenge and solution.
        </motion.p>

        {/* Search and Filter Section */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Search Input */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px'
          }}>
            <FiSearch style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '999px',
                border: '2px solid #eee',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
            />
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: selectedCategory === category ? '#5a0817' : '#f3f4f6',
                  color: selectedCategory === category ? '#fff' : '#666',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Projects;
