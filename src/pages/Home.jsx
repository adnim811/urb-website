import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page home-page">
      <main className="app-main">
        <section className="hero">
          <h1>Welcome to URB Consulting</h1>
          <p className="lead">Bridging the gap between student developers and real-world projects.</p>
          
          <div className="cta-buttons">
            <Link to="/students" className="btn btn-primary">I'm a Student</Link>
            <Link to="/clients" className="btn btn-secondary">I'm a Client</Link>
          </div>
        </section>
        
        <section className="card">
          <h2>Our Mission</h2>
          <p>
            URB Consulting connects talented student developers with businesses 
            and organizations that need technical solutions. We provide real-world 
            experience for students while delivering high-quality work for our clients.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home; 