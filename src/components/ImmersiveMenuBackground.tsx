
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
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Generate stars based on dimensions
        const numberOfStars = Math.floor((width * height) / 10000);
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
  
  // Check for stars near mouse position
  useEffect(() => {
    if (!dimensions.width) return;
    
    const checkHover = () => {
      const threshold = 80;
      const mouseX = mousePosition.x;
      const mouseY = mousePosition.y;
      
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
  }, [mousePosition, dimensions]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-navy-900 to-black"
    >
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent"></div>
      
      {/* Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]"
        style={{ 
          backgroundSize: '40px 40px',
          transform: `translate(${-mousePosition.x / 20}px, ${-mousePosition.y / 20}px)`
        }}
      ></div>
      
      {/* Distorted Road Sign */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: [0.9, 1, 0.95, 1],
            rotateY: [-5, 5, -3, 0],
            rotateX: [3, -3, 5, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            transform: `perspective(1000px) rotateY(${(mousePosition.x - dimensions.width / 2) / 50}deg) rotateX(${-(mousePosition.y - dimensions.height / 2) / 50}deg)`,
          }}
          className="w-48 h-36 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-md"></div>
          <motion.div 
            animate={{ 
              textShadow: ['0 0 8px rgba(255,0,0,0.7)', '0 0 12px rgba(255,0,255,0.9)', '0 0 8px rgba(0,0,255,0.7)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-glitch text-white text-2xl transform rotate-3 p-4 text-center"
          >
            REALITY
            <br />
            DETOUR
          </motion.div>
        </motion.div>
      </div>
      
      {/* Moving Lines */}
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={`line-${index}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-70"
          initial={{ width: 0, left: "50%", top: `${10 + index * 8}%` }}
          animate={{ 
            width: ["0%", "80%", "0%"],
            left: ["50%", "10%", "50%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{ 
            duration: 3 + index * 0.4, 
            repeat: Infinity, 
            repeatType: "loop",
            delay: index * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Stars */}
      {stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          animate={{
            opacity: star.hovered ? [0.6, 1, 0.8, 1] : star.opacity,
            scale: star.hovered ? [1, 1.5, 1.2, 1.8] : 1,
            filter: star.hovered ? "brightness(1.5) blur(1px)" : "brightness(1) blur(0px)"
          }}
          transition={{ 
            duration: star.hovered ? 1.5 : 0,
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
      
      {/* Tiny Cars */}
      {Array.from({ length: 6 }).map((_, index) => (
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
            duration: 10 + index * 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
        </motion.div>
      ))}
      
      {/* Birds */}
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={`bird-${index}`}
          className="absolute"
          initial={{ 
            left: Math.random() * dimensions.width, 
            top: Math.random() * dimensions.height * 0.6
          }}
          animate={{
            left: mousePosition.x + Math.sin(Date.now() / 1000 + index) * 150,
            top: mousePosition.y + Math.cos(Date.now() / 1000 + index) * 150,
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            left: { duration: 2 },
            top: { duration: 2 },
            rotate: { duration: 0.5, repeat: Infinity }
          }}
        >
          <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8C3 6 7 5 10 8C13 5 17 6 19 8" stroke="white" strokeWidth="1" />
            <path d="M10 8L10 15" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default ImmersiveMenuBackground;
