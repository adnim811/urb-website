import { Link } from 'react-router-dom';
import './Header.css';
import logoPath from '../assets/URB_Logo_NoBackground.png';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">
          <img src={logoPath} alt="URB Consulting Logo" />
        </Link>
      </div>
      <nav className="site-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/students">For Students</Link></li>
          <li><Link to="/clients">For Clients</Link></li>
          <li><Link to="/contact" className="cta-button">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; 