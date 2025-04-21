import React, { useRef, useEffect } from 'react';

const Skills = () => {
  // Store the color assignments in a ref to maintain them across renders
  const skillColors = useRef({});
  
  // Array of possible colors
  const colors = [
    "#2563eb", // Blue
    "#059669", // Green
    "#dc2626", // Red
    "#ea580c", // Orange
  ];

  // Combine all skills into a single array
  const allSkills = [
    // Technical Skills
    "Python", "React", "Next.js", "JavaScript", "TypeScript",
    "Node.js", "SQL", "MongoDB", "GraphQL", "REST APIs",
    "Git", "AWS", "Docker",
    // Software & Tools
    "Figma", "Adobe XD", "Sketch", "JIRA", "Confluence",
    "Tableau", "Power BI", "GitHub", "VS Code", "Postman",
    "Notion", "Slack",
    // Product Management
    "Agile", "Scrum", "Product Strategy", "User Research",
    "Market Analysis", "Roadmapping", "A/B Testing",
    "Competitive Analysis", "GTM Strategy", "Product Analytics",
    "Sprint Planning", "User Personas",
    // Interests
    "Urban Tech", "Smart Cities", "Real Estate", "Construction Tech",
    "Guitar", "Basketball", "Neuroscience", "AI/ML",
    "Sustainable Design", "IoT", "Digital Twins", "Urban Planning"
  ];

  // Assign colors once when component mounts
  useEffect(() => {
    if (Object.keys(skillColors.current).length === 0) {
      allSkills.forEach(skill => {
        skillColors.current[skill] = colors[Math.floor(Math.random() * colors.length)];
      });
    }
  }, []);

  return (
    <div style={{
      backgroundColor: '#050505',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 2rem 3rem 2rem',  // Format: top right bottom left
      zIndex: 5  // Add z-index to ensure skills are above particles
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {allSkills.map((skill, index) => (
          <span
            key={skill} // Using skill as key instead of index for better stability
            style={{
              backgroundColor: skillColors.current[skill] || colors[0],
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              fontSize: '0.9rem',
              color: 'white',
              fontWeight: '500',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'default',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
              zIndex: 5
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills; 