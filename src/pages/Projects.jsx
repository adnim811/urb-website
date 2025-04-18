import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { FiSearch } from 'react-icons/fi';
import project1Image from '../assets/Aditya_Project1.jpg';
import project2Image from '../assets/Aditya_Project2.jpg';
import project3Image from '../assets/Aditya_Project3.jpg';
import project4Image from '../assets/Aditya_Project4.jpg';
import project5Image from '../assets/Aditya_Project5.jpg';
import project6Image from '../assets/Aditya_Project6.jpg';

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample categories - replace with your actual categories
  const categories = ['All', 'Product Management', 'Coding', 'Analysis'];

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      title: "Parcel Data API",
      description: "For my 2024 internship, I led the development of a property prioritization tool to help the sales team make sense of inbound leads. The tool pulled in real estate footprint, parcel, and zoning data to assess each property's ADU feasibility, then assigned a dynamic score based on factors like lot size, setbacks, and local regulations. I collaborated cross-functionally to design the product roadmap in Jira and worked closely with engineers and designers to build a scalable system that enabled faster decision-making and more targeted outreach.",
      technologies: ["Product Management", "Figma", "Customer Interviews", "API"],
      category: "Product Management",
      image: project6Image
    },
    {
      title: "Google Discover",
      description: "For my UT330 Interaction Design project, I led a redesign of the Google Maps Explore tab to better connect urban residents with local events and public activities. Through user research, system design, and prototyping, we developed \"Google Discover\"—a new feature that integrates real-time event listings, filtering, and booking into Google Maps, making it easier for users to find and engage with live experiences in their city.",
      technologies: ["User Research", "Prototyping", "System Design", "Figma"],
      category: "Product Management",
      figmaLink: "https://www.figma.com/proto/pwY1TqfE2Xmui8YtYFKSjC/UT330-Assignment-4--Google-Explore-Page-Re-design?page-id=40%3A2&node-id=460-92&node-type=canvas&viewport=727%2C103%2C0.14&t=ejM5JmtoRTKmjFiP-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=460%3A92",
      liveLink: "https://www.figma.com/deck/clg1wDv2TijwFC5lqEM4ah",
      image: project1Image
    },
    {
      title: "Mine Escape",
      description: "A priority queue algorithm project developed for my Data Structures and Algorithms course, built in C++. The challenge involved navigating a grid of tiles representing a mine with TNT. Using an optimized priority queue, I implemented an algorithm to efficiently determine the safest and most cost-effective path to escape the mine, demonstrating both algorithmic problem-solving and performance-conscious data structure design.",
      technologies: ["C++", "Data Structures and Algorithms", "VSCode"],
      category: "Coding",
      githubLink: "https://github.com/adnim811/Mine-Escape-",
      liveLink: "https://github.com/adnim811/Mine-Escape-",
      image: project2Image
    },
    {
      title: "2 Cities in 2 Minutes",
      description: "This project explored urban innovation by comparing two global tech hubs: Silicon Valley and Dubai. I analyzed how Silicon Valley fosters innovation through startups and R&D, pioneering new technologies, while Dubai emphasizes rapid adoption of emerging tools like AI, blockchain, and smart infrastructure to enhance daily urban life. The study highlighted their contrasting but effective approaches to using technology in shaping the future of cities.",
      technologies: ["Research", "Video Editing", "Storytelling", "Adobe Creative Suite"],
      category: "Analysis",
      youtubeLink: "https://youtu.be/jQWbr3I_y9k?si=UPpqC5gnyfFbfhC-",
      liveLink: "https://youtu.be/jQWbr3I_y9k?si=UPpqC5gnyfFbfhC-",
      image: project3Image
    },
    {
      title: "Charlotte Mixed-Use Development",
      description: "This project focused on designing a mixed-use, multi-family development in Charlotte's Uptown Central Business District. I collaborated with a cross-disciplinary team to conduct a full market analysis, develop a unit mix strategy, calculate return on investment, and draft a phased construction timeline. We proposed a nine-story complex with ground-floor retail, modern amenities, and sustainable features tailored to young professionals.",
      technologies: ["Real Estate", "Zoning", "Finance", "Urban Development"],
      category: "Analysis",
      liveLink: "https://docs.google.com/presentation/d/1lwM6aqRlQvnT1pmAz4MIk6NVmQTne-w5pQ667_Xs9uA/edit?usp=sharing",
      image: project4Image
    },
    {
      title: "Space Invaders",
      description: "I led the development of a custom-built Space Invaders game using an Arduino, integrating hardware and software to create a playable retro-style experience. I programmed game logic in C++, designed pixel-based animations for enemy movement and player control, and connected input buttons and LED matrices to simulate gameplay. The project demonstrated my ability to combine embedded systems programming with interactive design, resulting in a fully functional and engaging hardware-based game.",
      technologies: ["C++", "Arduino", "Product Design", "Hardware"],
      category: "Coding",
      image: project5Image
    }
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
        padding: '0 2rem 4rem 2rem',
        marginTop: '-1.5rem',
        fontFamily: "'Open Sans', sans-serif",
        position: 'relative',
      }}
    >
      {/* Top fade overlay */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 40%, rgba(255, 255, 255, 0) 100%)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            marginBottom: '0.75rem',
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
            margin: '0 auto 2rem',
            textAlign: 'center',
            lineHeight: 1.6
          }}
        >
          A collection of my work in leadership, product design, coding, and more. Each project represents a unique challenge and solution.
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
                  backgroundColor: selectedCategory === category ? '#e31837' : '#000000',
                  color: '#ffffff',
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

      {/* Bottom fade overlay */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '5rem',
        background: 'linear-gradient(to top, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.9,
      }} />
    </motion.section>
  );
}

export default Projects;
