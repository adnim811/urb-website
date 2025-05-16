import React from 'react';
import { Link } from 'react-router-dom';

function Students() {
  return (
    <div className="page students-page">
      <main className="app-main">
        <h1>For Students</h1>
        <p className="lead">Gain real-world experience while building your portfolio</p>
        
        <section className="card">
          <h2>Why Join URB?</h2>
          <ul>
            <li>Work on real projects for actual clients</li>
            <li>Build your portfolio with professional work</li>
            <li>Gain experience working in teams</li>
            <li>Learn from mentors and peers</li>
            <li>Expand your professional network</li>
          </ul>
        </section>
        
        <section className="card">
          <h2>How It Works</h2>
          <p>
            As a student developer at URB, you'll be matched with projects that 
            align with your skills and interests. You'll collaborate with a team of 
            fellow students under the guidance of experienced mentors to deliver 
            solutions for our clients.
          </p>
          <p>
            <Link to="/contact" className="btn btn-primary">Apply to Join</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Students; 