import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import worldMapPng from '../assets/world_map_pixel.png';
import hyderabad1 from '../assets/Hyderabad_1.jpg';
import hyderabad2 from '../assets/Hyderabad_2.jpg';
import hyderabadAditya from '../assets/Hyderabad_Aditya.jpg';
import BuddhaPortfolio from '../assets/Buddha_Portfolio.png';
import bay1 from '../assets/Aditya_Bay1.jpg';
import bay2 from '../assets/Aditya_Bay2.jpg';
import bay3 from '../assets/Aditya_Bay3.jpg';
import bay4 from '../assets/Aditya_Bay4.jpg';
import aa1 from '../assets/Aditya_AA1.jpg';
import aa2 from '../assets/Aditya_AA2.jpg';
import aa3 from '../assets/Aditya_AA3.jpg';
import aa4 from '../assets/Aditya_AA4.jpg';
import seattle1 from '../assets/Aditya_Seattle1.jpg';
import { FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Utility function to calculate the great circle path between two points
const calculateGreatCirclePath = (start, end, width, height) => {
  // Convert percentage coordinates to pixel coordinates
  const startX = (start.x / 100) * width;
  const startY = (start.y / 100) * height;
  const endX = (end.x / 100) * width;
  const endY = (end.y / 100) * height;

  // Calculate control point for the curve
  const midX = (startX + endX) / 2;
  const midY = startY + (endY - startY) / 2 - Math.abs(endX - startX) * 0.2;

  return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
};

const WorldMap = () => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pathProgress, setPathProgress] = useState(0);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const location = useLocation();

  const pins = [
    {
      id: 1,
      name: "India",
      coordinates: { x: 67.5, y: 52 },
      images: [
        {
          src: hyderabad1,
          description: "Born in Hyderabad, India, I grew up deeply connected to my roots while witnessing the city's rapid transformation into a tech hub—sparking my fascination with urban development and the blend of tradition and modernity."
        },
        {
          src: hyderabadAditya,
          description: "Playing street cricket with my childhood friends is one of my favorite memories. Every match felt like a World Cup final, and we'd play until our moms called us home. Those evenings taught me more about friendship, joy, and passion than any classroom ever could."
        },
        {
          src: hyderabad2,
          description: "I've always been drawn to nature—an animal lover and lifelong vegetarian. Living in India briefly, I was surrounded by its raw, vibrant beauty, which deepened my respect for all living beings. If money didn't matter, I'd spend my life caring for animals, creating spaces where they feel safe, loved, and free."
        },
        {
          src: BuddhaPortfolio,
          description: "My journey is rooted in spiritual exploration. Siddhartha shaped my path, and a Bodhi Tree leaf I keep with me at all times from Bodhgaya reminds me of presence and connection. Meditation taught me we're all linked by invisible energy—grounding my belief that true innovation flows from aligning with nature's rhythms."
        }
      ],
      year: "2004 - 2010"
    },
    {
      id: 2,
      name: "Ann Arbor, Michigan",
      coordinates: { x: 25, y: 35 },
      images: [
        {
          src: aa1,
          description: "I moved to Ann Arbor to pursue a B.S. in Urban Technology at the University of Michigan, where I've been active in campus life - Founding President @ URB Consulting, serving as VP Internal @ Product Motion, joining IASA, and playing pickup basketball."
        },
        {
          src: aa2,
          description: "My experience at Michigan has been incredibly positive—from football games and tailgates to late-night study sessions, the work-hard, play-hard culture and the amazing people I've met have made it unforgettable. I've built lifelong friendships and memories here."
        },
        {
          src: aa3,
          description: "College hasn't just been about campus—I've made unforgettable memories traveling to places like Chicago, NYC, and Cincinnati with friends. These years have been filled with moments I know I'll one day look back on with nostalgia, grateful for the experiences that shaped me."
        },
        {
          src: aa4,
          description: "Tapping into my entrepreneurial side, I founded the first and only urban tech consulting org on campus, managing an 8-person exec team and scaling it to 50+ members. We hosted professional and social events while creating meaningful opportunities for students to gain work and leadership experience. My goal is to come back in 2035 and URB is still strong."
        }
      ],
      year: "2022 - 2025"
    },
    {
      id: 3,
      name: "Bay Area, California",
      coordinates: { x: 14, y: 41 },
      images: [
        {
          src: bay1,
          description: "The Bay Area has always felt like home—I grew up in Cupertino, where I first picked up a basketball, learned the values that guide me today, and was immersed in the spirit of innovation at the heart of Silicon Valley. It's where my love for community, curiosity, and technology first took root."
        },
        {
          src: bay2,
          description: "Middle school was all about adventure—exploring quarries, wandering woods, and getting lost without phones. It felt like Stranger Things—curious, a bit reckless, and full of discovery. Those moments taught me the joy of exploring and the value of getting a little lost."
        },
        {
          src: bay3,
          description: "I grew up in Boy Scouts, spending nine years learning leadership, resilience, and service through hands-on experiences that shaped who I am today. In September 2022, I earned the rank of Eagle Scout—an achievement that reflects my commitment to growth and giving back to my community."
        },
        {
          src: bay4,
          description: "I moved from Cupertino to Milpitas just before high school, in a fully new environment. Over the years, I grew academically, socially, and spiritually, building friendships, and learning more about myself. Graduation wasn't just the end of school—it was a milestone of personal growth and transformation."
        }
      ],
      year: "2010 - 2022"
    },
    {
      id: 4,
      name: "Seattle, Washington",
      coordinates: { x: 14, y: 34 },
      images: [
        {
          src: seattle1,
          description: "I'm an incoming Technical Program Manager intern at Microsoft in Seattle, where I'll be joining the Cloud Operations + Innovations (CO+I) team—and I'm incredibly excited to learn and grow in such an inspiring environment."
        }
      ],
      year: "2025"
    }
  ];

  const handlePinClick = (pinId) => {
    setSelectedPin(selectedPin === pinId ? null : pinId);
    setCurrentImageIndex(0); // Reset image index when changing pins
  };

  const handleNextImage = () => {
    const currentPin = pins.find(p => p.id === selectedPin);
    if (currentPin && currentImageIndex < currentPin.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Create ordered path segments
  const pathSegments = [
    { from: pins[0], to: pins[2] }, // Hyderabad to Bay Area
    { from: pins[2], to: pins[1] }, // Bay Area to Ann Arbor
    { from: pins[1], to: pins[3] }  // Ann Arbor to Seattle
  ];

  // Effect to initialize map dimensions and handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const mapImage = document.getElementById('world-map-image');
      if (mapImage) {
        setMapDimensions({
          width: mapImage.offsetWidth,
          height: mapImage.offsetHeight
        });
      }
    };

    // Initial update
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Effect to handle path animation sequence
  useEffect(() => {
    // Reset animation state when component mounts or route changes
    setIsAnimating(true);
    setCurrentPathIndex(0);

    // Start the animation loop
    const interval = setInterval(() => {
      if (isAnimating) {
        setCurrentPathIndex((prev) => (prev + 1) % pathSegments.length);
      }
    }, 2500); // Total time for each path

    // Cleanup on unmount or route change
    return () => {
      clearInterval(interval);
      setIsAnimating(false);
    };
  }, [location.pathname]); // Restart animation when route changes

  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      paddingBottom: '1rem',
    }}>
      <div style={{ 
        position: 'relative',
        width: '90%',
        margin: '0 auto',
        paddingBottom: '1rem',
      }}>
        <img 
          id="world-map-image"
          src={worldMapPng} 
          alt="World Map"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
          onLoad={() => {
            // Trigger dimension update when image loads
            const mapImage = document.getElementById('world-map-image');
            if (mapImage) {
              setMapDimensions({
                width: mapImage.offsetWidth,
                height: mapImage.offsetHeight
              });
            }
          }}
        />

        {/* SVG layer for paths */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.path
              key={currentPathIndex}
              d={calculateGreatCirclePath(
                pathSegments[currentPathIndex].from.coordinates,
                pathSegments[currentPathIndex].to.coordinates,
                mapDimensions.width,
                mapDimensions.height
              )}
              fill="none"
              stroke="#e31837"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.6,
                transition: { 
                  pathLength: { duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.5, ease: "easeInOut" }
                }
              }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              onAnimationComplete={() => {
                // Ensure animation continues
                setIsAnimating(true);
              }}
            />
          </AnimatePresence>
        </svg>
        
        {/* Pins */}
        {pins.map((pin) => (
          <div
            key={pin.id}
            style={{
              position: 'absolute',
              left: `${pin.coordinates.x}%`,
              top: `${pin.coordinates.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            <motion.button
              onClick={() => handlePinClick(pin.id)}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'relative',
                width: '14px',
                height: '14px',
                transform: 'rotate(45deg)',
                backgroundColor: '#e31837',
                border: '2px solid white',
                padding: 0,
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '0',
                WebkitTransform: 'rotate(45deg)',
              }}
            />

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: 'absolute',
                top: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>
              {pin.name}
            </motion.div>
          </div>
        ))}

        {/* Portal container for modal */}
        <AnimatePresence>
          {selectedPin && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0, // shorthand for top: 0, right: 0, bottom: 0, left: 0
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  zIndex: 9998,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => setSelectedPin(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: 'fixed',
                  top: '100px',
                  right: '80px',
                  backgroundColor: '#1A1A1A',
                  color: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
                  width: '550px',
                  height: '750px',
                  overflowY: 'auto',
                  zIndex: 9999,
                  margin: 0,
                }}
              >
                <button
                  onClick={() => setSelectedPin(null)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease',
                    zIndex: 10000,
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <FiX size={24} />
                </button>

                {selectedPin && (
                  <>
                    <h2 style={{ 
                      fontSize: '2rem', 
                      marginBottom: '1.5rem', 
                      paddingRight: '2rem'
                    }}>
                      {pins.find(p => p.id === selectedPin)?.name}
                      <span style={{ 
                        fontSize: '1rem', 
                        opacity: 0.7, 
                        marginLeft: '1rem',
                        fontWeight: 'normal' 
                      }}>
                        {pins.find(p => p.id === selectedPin)?.year}
                      </span>
                    </h2>

                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                      <AnimatePresence mode="wait">
                        {pins.find(p => p.id === selectedPin)?.images[currentImageIndex]?.src ? (
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              width: '100%',
                              height: '400px',
                            }}
                          >
                            <img
                              src={pins.find(p => p.id === selectedPin)?.images[currentImageIndex]?.src}
                              alt={`Location ${currentImageIndex + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '12px',
                              }}
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              width: '100%',
                              height: '400px',
                              backgroundColor: '#2A2A2A',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#808080',
                            }}
                          >
                            Image placeholder
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Arrow navigation */}
                      <button
                        onClick={handlePrevImage}
                        disabled={currentImageIndex === 0}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '16px',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0,0,0,0.8)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '48px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
                          zIndex: 99999,
                          opacity: currentImageIndex === 0 ? 0.5 : 1,
                          transition: 'opacity 0.2s ease',
                          pointerEvents: 'auto',
                          fontSize: '24px',
                          color: 'white',
                          fontFamily: 'system-ui',
                        }}
                      >
                        ‹
                      </button>
                      
                      <button
                        onClick={handleNextImage}
                        disabled={currentImageIndex === (pins.find(p => p.id === selectedPin)?.images.length || 0) - 1}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '16px',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0,0,0,0.8)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '48px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: currentImageIndex === (pins.find(p => p.id === selectedPin)?.images.length || 0) - 1 ? 'not-allowed' : 'pointer',
                          zIndex: 99999,
                          opacity: currentImageIndex === (pins.find(p => p.id === selectedPin)?.images.length || 0) - 1 ? 0.5 : 1,
                          transition: 'opacity 0.2s ease',
                          pointerEvents: 'auto',
                          fontSize: '24px',
                          color: 'white',
                          fontFamily: 'system-ui',
                        }}
                      >
                        ›
                      </button>

                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        borderRadius: '16px',
                        padding: '4px 14px',
                        fontSize: '1rem',
                        fontWeight: 500,
                        zIndex: 9999,
                      }}>
                        {`${currentImageIndex + 1} / ${pins.find(p => p.id === selectedPin)?.images.length}`}
                      </div>
                    </div>

                    <p style={{ 
                      fontSize: '1.1rem', 
                      lineHeight: '1.6',
                      color: '#E0E0E0',
                    }}>
                      {pins.find(p => p.id === selectedPin)?.images[currentImageIndex]?.description}
                    </p>
                  </>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorldMap; 