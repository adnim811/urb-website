import React, { useEffect, useState } from 'react';
import './WhiteParticlesBackground.css';

const WhiteParticlesBackground = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate particles only once on component mount
    const newParticles = Array.from({ length: 100 }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 25}s`,
      delay: `${-Math.random() * 20}s`,
      size: `${2 + Math.random() * 4}px`,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="white-particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="white-particle"
          style={{
            '--x': particle.x,
            '--y': particle.y,
            '--duration': particle.duration,
            '--delay': particle.delay,
            '--size': particle.size
          }}
        />
      ))}
    </div>
  );
};

export default WhiteParticlesBackground; 