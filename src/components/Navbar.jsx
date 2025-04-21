import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const location = useLocation();
  const [textColor, setTextColor] = useState('#000000');
  const nameRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Function to parse RGB/RGBA color string
  const parseColor = (color) => {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3])
      };
    }
    return null;
  };

  // Function to determine the best contrast color
  const getContrastColor = (bgColor) => {
    if (!bgColor) return '#000000';
    const luminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  useEffect(() => {
    const updateTextColor = () => {
      if (!nameRef.current) return;

      // Get all elements at the point where the name is
      const rect = nameRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const elements = document.elementsFromPoint(x, y);

      // Find the first element with a background color
      let backgroundColor = null;
      for (const element of elements) {
        if (element === nameRef.current) continue;
        
        const style = window.getComputedStyle(element);
        const bg = style.backgroundColor;
        
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          backgroundColor = bg;
          break;
        }
      }

      // If no background color found, use body's background
      if (!backgroundColor) {
        backgroundColor = window.getComputedStyle(document.body).backgroundColor;
      }

      // Parse the color and set the contrast
      const bgColor = parseColor(backgroundColor);
      if (bgColor) {
        setTextColor(getContrastColor(bgColor));
      }
    };

    // Update color on mount and scroll
    updateTextColor();
    const handleScroll = () => {
      requestAnimationFrame(updateTextColor);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateTextColor);
    
    // Also update on route changes
    const observer = new MutationObserver(updateTextColor);
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTextColor);
      observer.disconnect();
    };
  }, []);

  const currentPath = location.hash.slice(2) || '';

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      pointerEvents: 'none',
    },
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 100,
        }}
      >
        <Link
          ref={nameRef}
          to="/"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            color: textColor,
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
          }}
        >
          Aditya Nimbalkar
        </Link>
      </motion.div>

      {isMobile ? (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 101,
              background: 'none',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'fixed',
                  top: '5rem',
                  right: '1rem',
                  backgroundColor: 'rgba(32, 32, 32, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '1rem',
                  borderRadius: '12px',
                  zIndex: 100,
                }}
              >
                <nav>
                  <ul
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {['About', 'Projects', 'Resume'].map((route) => {
                      const routePath = route.toLowerCase();
                      return (
                        <li key={route}>
                          <Link
                            to={`/${routePath}`}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                              position: 'relative',
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              padding: '0.75rem 1.5rem',
                              borderRadius: '8px',
                              backgroundColor: currentPath === routePath
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'transparent',
                              transition: 'all 0.2s ease',
                              display: 'block',
                              opacity: currentPath === routePath ? 1 : 0.8,
                              width: '100%',
                              textAlign: 'center',
                            }}
                            onMouseEnter={(e) => {
                              if (currentPath !== routePath) {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.opacity = '1';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (currentPath !== routePath) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.opacity = '0.8';
                              }
                            }}
                          >
                            {route}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          position: 'relative',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          backgroundColor: location.pathname === '/contact'
                            ? '#0096f7'
                            : 'rgba(0, 150, 247, 0.8)',
                          transition: 'all 0.3s ease',
                          display: 'block',
                          opacity: 1,
                          width: '100%',
                          textAlign: 'center',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#0096f7';
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (location.pathname !== '/contact') {
                            e.target.style.backgroundColor = 'rgba(0, 150, 247, 0.8)';
                          }
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: 'rgba(32, 32, 32, 0.5)',
              backdropFilter: 'blur(8px)',
              padding: '0.75rem 2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: '1rem',
              left: '0',
              right: '0',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 'fit-content',
              zIndex: 100,
              fontFamily: "'Open Sans', sans-serif",
              borderRadius: '100px',
            }}
          >
            <nav>
              <ul
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {['About', 'Projects', 'Resume'].map((route) => {
                  const routePath = route.toLowerCase();
                  return (
                    <li key={route}>
                      <Link
                        to={`/${routePath}`}
                        style={{
                          position: 'relative',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '100px',
                          backgroundColor: currentPath === routePath
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'transparent',
                          transition: 'all 0.2s ease',
                          display: 'block',
                          opacity: currentPath === routePath ? 1 : 0.8,
                        }}
                        onMouseEnter={(e) => {
                          if (currentPath !== routePath) {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.opacity = '1';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentPath !== routePath) {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.opacity = '0.8';
                          }
                        }}
                      >
                        {route}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 100,
            }}
          >
            <Link
              to="/contact"
              style={{
                position: 'relative',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.6rem 1.25rem',
                borderRadius: '100px',
                backgroundColor: location.pathname === '/contact'
                  ? '#0096f7'
                  : 'rgba(0, 150, 247, 0.8)',
                transition: 'all 0.3s ease',
                display: 'block',
                opacity: 1,
                boxShadow: '0 0 20px rgba(0, 150, 247, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0096f7';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 25px rgba(0, 150, 247, 0.4)';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/contact') {
                  e.target.style.backgroundColor = 'rgba(0, 150, 247, 0.8)';
                }
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 20px rgba(0, 150, 247, 0.3)';
              }}
            >
              Contact
            </Link>
          </motion.div>
        </>
      )}
    </>
  );
}

export default Navbar;
