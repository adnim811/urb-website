import React from 'react';
import { Link } from 'react-router-dom';

function Clients() {
  return (
    <div className="page clients-page">
      <main className="app-main">
        <h1>For Clients</h1>
        <p className="lead">Quality solutions delivered by motivated student developers</p>
        
        <section className="card">
          <h2>Our Services</h2>
          <ul>
            <li>Web Development</li>
            <li>Mobile App Development</li>
            <li>UX/UI Design</li>
            <li>Data Analysis</li>
            <li>Custom Software Solutions</li>
          </ul>
        </section>
        
        <section className="card">
          <h2>Why Choose URB?</h2>
          <p>
            By partnering with URB, you get access to a pool of talented and 
            motivated student developers eager to apply their skills. Our projects 
            are overseen by experienced mentors to ensure quality results.
          </p>
          <p>
            We offer competitive rates while providing valuable experience to the 
            next generation of tech professionals.
          </p>
          <p>
            <Link to="/contact" className="btn btn-primary">Request a Consultation</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Clients; 