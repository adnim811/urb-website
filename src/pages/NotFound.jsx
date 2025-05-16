import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page not-found-page">
      <main className="app-main">
        <h1 className="fade-on-scroll">404 - Page Not Found</h1>
        <p className="fade-on-scroll">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary fade-on-scroll">
          Return to Home
        </Link>
      </main>
    </div>
  );
}

export default NotFound; 