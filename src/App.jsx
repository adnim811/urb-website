import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Students from './pages/Students';
import Clients from './pages/Clients';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Main content wrapper with scroll effects
function ContentWrapper({ children }) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const header = document.querySelector('.site-header');
      
      if (header) {
        // Add blur effect to header as user scrolls
        if (scrollTop > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Apply fade effect to elements scrolling under header
      const contentElements = document.querySelectorAll('.fade-on-scroll');
      const headerHeight = header ? header.offsetHeight : 80;
      
      contentElements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        // Check if element is scrolling under the header
        if (elementRect.top < headerHeight + 20) {
          const opacity = Math.max(0, (elementRect.bottom - headerHeight) / elementRect.height);
          element.style.opacity = opacity.toFixed(2);
        } else {
          element.style.opacity = 1;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="content-wrapper">{children}</div>;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <ContentWrapper>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentWrapper>
      </div>
    </Router>
  );
}

export default App;
