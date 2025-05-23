import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page home-page">
      <main className="app-main">
        <section className="hero fade-on-scroll">
          <div className="hero-content">
            <h1>Connecting Students with Real-World Projects</h1>
            <p className="lead">URB Consulting bridges the gap between student developers and businesses seeking innovative solutions.</p>
            
            <div className="cta-buttons">
              <Link to="/students" className="btn btn-primary">I'm a Student</Link>
              <Link to="/clients" className="btn btn-secondary">I'm a Client</Link>
            </div>
          </div>
        </section>
        
        <section className="mission-section fade-on-scroll">
          <div className="card">
            <h2>Our Mission</h2>
            <p>
              URB Consulting connects talented student developers with businesses 
              and organizations that need technical solutions. We provide real-world 
              experience for students while delivering high-quality work for our clients.
            </p>
          </div>
        </section>
        
        <section className="features-section">
          <div className="feature-grid">
            <div className="feature-card fade-on-scroll">
              <h3>Student Development</h3>
              <p>We help students gain real-world experience and build their portfolios through practical projects.</p>
            </div>
            <div className="feature-card fade-on-scroll">
              <h3>Client Solutions</h3>
              <p>Businesses receive quality technical solutions at competitive rates while supporting student growth.</p>
            </div>
            <div className="feature-card fade-on-scroll">
              <h3>Mentorship</h3>
              <p>Our experienced mentors guide student teams throughout each project, ensuring professional outcomes.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home; 