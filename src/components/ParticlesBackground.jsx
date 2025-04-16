import React from 'react';
import './ParticlesBackground.css';

const ParticlesBackground = () => {
  const generateParticleProps = () => ({
    '--x': `${Math.random() * 100}%`,
    '--y': `${Math.random() * 100}%`,
    '--duration': `${15 + Math.random() * 15}s`,
    '--delay': `${-Math.random() * 20}s`,
    '--size': `${3 + Math.random() * 3}px`,
  });

  return (
    <div className="particles-container">
      {Array.from({ length: 75 }).map((_, index) => (
        <div
          key={index}
          className="particle"
          style={generateParticleProps()}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground; 