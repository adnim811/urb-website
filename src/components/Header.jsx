import { Link } from 'react-router-dom';
import './Header.css';
import logoPath from '../assets/react.svg'; // Temporary placeholder until actual logo is available

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">
          <img src={logoPath} alt="URB Consulting Logo" />
          <span>URB</span>
        </Link>
      </div>
      <nav className="site-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/students">For Students</Link></li>
          <li><Link to="/clients">For Clients</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; 