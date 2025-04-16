import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import worldMapPng from '../assets/world_map_pixel.png';
import hyderabad1 from '../assets/Hyderabad_1.jpg';
import hyderabad2 from '../assets/Hyderabad_2.jpg';
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

  const pins = [
    {
      id: 1,
      name: "Hyderabad, India",
      coordinates: { x: 67.5, y: 52 },
      images: [
        {
          src: hyderabad1,
          description: "Born and raised in Hyderabad, India, my journey began in this vibrant city of rich cultural heritage. Growing up here instilled in me a deep connection to my roots and traditions, while the city's rapid transformation into a tech hub sparked my fascination with urban development and the intersection of tradition and modernity."
        },
        {
          src: hyderabad2,
          description: "The first few years of my life were shaped by being around nature. I love animals and am vegetarian."
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
          src: hyderabad1,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          src: hyderabad1,
          description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
          src: hyderabad1,
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
        {
          src: hyderabad1,
          description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
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
          src: hyderabad1,
          description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
        },
        {
          src: hyderabad1,
          description: "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio."
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

  // Add useEffect to initialize map dimensions
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

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create ordered path segments
  const pathSegments = [
    { from: pins[0], to: pins[2] }, // Hyderabad to Bay Area
    { from: pins[2], to: pins[1] }, // Bay Area to Ann Arbor
    { from: pins[1], to: pins[3] }  // Ann Arbor to Seattle
  ];

  // Effect to handle path animation sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPathIndex((prev) => (prev + 1) % pathSegments.length);
    }, 2500); // Total time for each path (animation + visibility)

    return () => clearInterval(interval);
  }, []);

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
                      {pins.find(p => p.id === selectedPin)?.images[currentImageIndex]?.src ? (
                        <img
                          src={pins.find(p => p.id === selectedPin)?.images[currentImageIndex]?.src}
                          alt={`Location ${currentImageIndex + 1}`}
                          style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '400px',
                          backgroundColor: '#2A2A2A',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#808080',
                        }}>
                          Image placeholder
                        </div>
                      )}

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