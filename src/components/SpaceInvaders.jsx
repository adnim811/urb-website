import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const SpaceInvaders = ({ onClose }) => {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize enemies
  useEffect(() => {
    const initialEnemies = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (i % 4) * 25 + 12.5,
      y: Math.floor(i / 4) * 10 + 10,
    }));
    setEnemies(initialEnemies);
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setPlayerPosition(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerPosition(prev => Math.min(95, prev + 5));
      } else if (e.key === ' ') {
        // Shoot
        setBullets(prev => [...prev, { id: Date.now(), x: playerPosition, y: 90 }]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPosition, onClose]);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Move bullets
      setBullets(prev => prev
        .map(bullet => ({ ...bullet, y: bullet.y - 2 }))
        .filter(bullet => bullet.y > 0)
      );

      // Move enemies
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        y: enemy.y + 0.05
      })));

      // Check collisions
      setBullets(prev => {
        const remainingBullets = [];
        for (const bullet of prev) {
          let hitEnemy = false;
          setEnemies(prevEnemies => {
            const remaining = prevEnemies.filter(enemy => {
              const hit = Math.abs(enemy.x - bullet.x) < 5 && Math.abs(enemy.y - bullet.y) < 5;
              if (hit) {
                setScore(s => s + 100);
                hitEnemy = true;
              }
              return !hit;
            });
            return remaining;
          });
          if (!hitEnemy) remainingBullets.push(bullet);
        }
        return remainingBullets;
      });

      // Check game over
      setEnemies(prev => {
        if (prev.some(enemy => enemy.y > 90)) {
          setGameOver(true);
          return [];
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, []);

  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: -1000 }}
      transition={{ type: 'spring', damping: 20 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 1000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ 
        position: 'relative', 
        width: '600px', 
        height: '400px', 
        border: '2px solid #e31837',
        backgroundColor: 'black',
        overflow: 'hidden'
      }}>
        {/* Player */}
        <div style={{
          position: 'absolute',
          left: `${playerPosition}%`,
          bottom: '5%',
          width: '20px',
          height: '20px',
          backgroundColor: '#e31837',
          transform: 'translateX(-50%)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }} />

        {/* Bullets */}
        {bullets.map(bullet => (
          <div
            key={bullet.id}
            style={{
              position: 'absolute',
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
              width: '4px',
              height: '8px',
              backgroundColor: '#fff',
              transform: 'translateX(-50%)'
            }}
          />
        ))}

        {/* Enemies */}
        {enemies.map(enemy => (
          <div
            key={enemy.id}
            style={{
              position: 'absolute',
              left: `${enemy.x}%`,
              top: `${enemy.y}%`,
              width: '15px',
              height: '15px',
              backgroundColor: '#e31837',
              transform: 'translateX(-50%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: 'rotate(180deg) translateX(50%)'
            }}
          />
        ))}

        {/* Game Over */}
        {gameOver && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#e31837',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            GAME OVER<br />
            Score: {score}<br />
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#e31837',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div style={{
        color: 'white',
        marginTop: '20px',
        textAlign: 'center'
      }}>
        Score: {score}<br />
        Use ← → to move, SPACE to shoot, ESC to exit
      </div>
    </motion.div>
  );
};

export default SpaceInvaders; 