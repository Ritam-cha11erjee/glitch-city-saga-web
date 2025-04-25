
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ImmersiveMenuBackgroundProps {
  darkMode: boolean;
  mousePosition: { x: number, y: number };
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  hovered: boolean;
}

const ImmersiveMenuBackground: React.FC<ImmersiveMenuBackgroundProps> = ({ 
  darkMode, 
  mousePosition 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouseHoverStar, setMouseHoverStar] = useState<number | null>(null);
  const [lastProcessedPosition, setLastProcessedPosition] = useState({ x: 0, y: 0 });
  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Process mouse position with throttling to avoid rapid changes
  useEffect(() => {
    if (throttleTimeout) return;
    
    const timeout = setTimeout(() => {
      setLastProcessedPosition(mousePosition);
      setThrottleTimeout(null);
    }, 100); // Only process mouse movements every 100ms
    
    setThrottleTimeout(timeout);
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [mousePosition]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Generate stars based on dimensions but fewer than before
        const numberOfStars = Math.floor((width * height) / 15000); // Reduced density
        const newStars = Array.from({ length: numberOfStars }, (_, i) => ({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          rotation: Math.random() * 360,
          hovered: false
        }));
        
        setStars(newStars);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Check for stars near mouse position using the throttled position
  useEffect(() => {
    if (!dimensions.width) return;
    
    const checkHover = () => {
      const threshold = 100; // Increased hover area
      const mouseX = lastProcessedPosition.x;
      const mouseY = lastProcessedPosition.y;
      
      setStars(prevStars => 
        prevStars.map(star => {
          const distance = Math.sqrt(
            Math.pow(star.x - mouseX, 2) + 
            Math.pow(star.y - mouseY, 2)
          );
          
          return {
            ...star,
            hovered: distance < threshold
          };
        })
      );
    };
    
    checkHover();
  }, [lastProcessedPosition, dimensions]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-navy-900 to-black"
    >
      {/* Improved Background with Nebula Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" 
             style={{ top: '30%', left: '70%' }}></div>
        <div className="absolute inset-0 bg-gradient-radial from-pink-900/20 via-transparent to-transparent"
             style={{ top: '70%', left: '30%' }}></div>
        
        {/* Animated Cosmic Dust */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white/5 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${15 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Grid Lines - Slower and More Dramatic */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]"
        style={{ 
          backgroundSize: '60px 60px',
          transform: `translate(${-lastProcessedPosition.x / 40}px, ${-lastProcessedPosition.y / 40}px)`
        }}
      ></div>
      
      {/* Horizon Line with Glow */}
      <div className="absolute w-full h-px bottom-1/3 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent">
        <div className="absolute w-full h-2 top-0 blur-md bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"></div>
      </div>
      
      {/* Distorted Road Sign - Enhanced with Better Perspective */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: [0.95, 1.02, 0.98, 1.0],
            rotateY: [-3, 3, -2, 0],
            rotateX: [2, -2, 3, 0],
          }}
          transition={{ 
            duration: 8, // Slower animation
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            transform: `perspective(1200px) rotateY(${(lastProcessedPosition.x - dimensions.width / 2) / 60}deg) rotateX(${-(lastProcessedPosition.y - dimensions.height / 2) / 60}deg)`,
          }}
        >
          {/* Multi-layered sign for depth effect */}
          <div className="w-48 h-36 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-md flex items-center justify-center shadow-xl relative overflow-hidden">
            {/* Metallic reflection effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-yellow-300/40 via-transparent to-yellow-600/30"
              animate={{ 
                opacity: [0.6, 0.8, 0.5, 0.7],
                backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%']
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            {/* Scratches on the sign */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10L90 90M30 10L10 30M90 10L10 90' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}/>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-md"></div>
            
            {/* Glitchy text effect */}
            <motion.div 
              animate={{ 
                textShadow: ['0 0 8px rgba(255,255,255,0.7)', '0 0 12px rgba(255,0,255,0.9)', '0 0 8px rgba(0,0,255,0.7)'],
                x: [0, -2, 1, 0],
                y: [0, 1, -1, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
              className="font-glitch text-white text-2xl transform rotate-3 p-4 text-center z-10"
            >
              REALITY
              <br />
              DETOUR
            </motion.div>
            
            {/* Additional sign elements */}
            <div className="absolute -left-1 -right-1 top-0 h-4 bg-yellow-700"></div>
            <div className="absolute -left-1 -right-1 bottom-0 h-4 bg-yellow-700"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Moving Lines - Smoothed and slowed down */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`line-${index}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-70"
          initial={{ width: 0, left: "50%", top: `${15 + index * 9}%` }}
          animate={{ 
            width: ["0%", "70%", "0%"],
            left: ["50%", "15%", "50%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{ 
            duration: 5 + index * 0.8, // Slower movement
            repeat: Infinity, 
            repeatType: "loop",
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Stars - Reduced animation speed */}
      {stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          animate={{
            opacity: star.hovered ? [0.6, 0.9, 0.7, 0.9] : star.opacity,
            scale: star.hovered ? [1, 1.3, 1.1, 1.4] : 1,
            filter: star.hovered ? "brightness(1.5) blur(1px)" : "brightness(1) blur(0px)"
          }}
          transition={{ 
            duration: star.hovered ? 3 : 0, // Slower pulse
            repeat: star.hovered ? Infinity : 0,
            repeatType: "reverse"
          }}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.hovered ? star.size * 2 : star.size}px`,
            height: `${star.hovered ? star.size * 2 : star.size}px`,
          }}
        />
      ))}
      
      {/* Tiny Cars - Slowed down movement */}
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={`car-${index}`}
          className="absolute w-6 h-3 bg-neon-magenta rounded-sm"
          initial={{ 
            left: Math.random() * dimensions.width, 
            top: Math.random() * dimensions.height
          }}
          animate={{
            left: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width
            ],
            top: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height
            ],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20 + index * 4, // Much slower movement
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
        </motion.div>
      ))}
      
      {/* Floating Particles - New Addition */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white/50"
          initial={{ 
            x: Math.random() * dimensions.width, 
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width, 
              Math.random() * dimensions.width, 
              Math.random() * dimensions.width
            ],
            y: [
              Math.random() * dimensions.height, 
              Math.random() * dimensions.height, 
              Math.random() * dimensions.height
            ],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            filter: `blur(${Math.random()}px)`
          }}
        />
      ))}
      
      {/* Birds - These respond to mousemove but with dampened effect */}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={`bird-${index}`}
          className="absolute"
          initial={{ 
            left: Math.random() * dimensions.width, 
            top: Math.random() * dimensions.height * 0.6
          }}
          animate={{
            left: lastProcessedPosition.x + Math.sin(Date.now() / 2000 + index) * 150,
            top: lastProcessedPosition.y + Math.cos(Date.now() / 2000 + index) * 150,
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            left: { duration: 3 },  // Slower tracking
            top: { duration: 3 },   // Slower tracking
            rotate: { duration: 1, repeat: Infinity }
          }}
        >
          <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8C3 6 7 5 10 8C13 5 17 6 19 8" stroke="white" strokeWidth="1" />
            <path d="M10 8L10 15" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
      
      {/* Cyberspace Ripple Effect - New Feature */}
      <motion.div
        className="absolute rounded-full border border-neon-cyan/20"
        style={{
          left: lastProcessedPosition.x,
          top: lastProcessedPosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: [0, 200],
          height: [0, 200],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      />
    </div>
  );
};

export default ImmersiveMenuBackground;
