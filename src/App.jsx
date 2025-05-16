import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Students from './pages/Students';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>URB Consulting</h4>
              <p>Bridging the gap between student developers and real-world projects.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/students">For Students</a></li>
                <li><a href="/clients">For Clients</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>info@urbconsulting.com</p>
              <p>(123) 456-7890</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} URB Consulting. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
