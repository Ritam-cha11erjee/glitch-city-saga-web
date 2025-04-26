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
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
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
    
    const timeoutId = setTimeout(checkHover, 50);
    return () => clearTimeout(timeoutId);
  }, [mousePosition, dimensions]);
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${darkMode ? 'bg-gradient-to-b from-navy-900 to-black' : 'bg-gradient-to-b from-blue-100 to-white'}`}
    >
      <div className={`absolute inset-0 bg-gradient-radial ${darkMode ? 'from-purple-900/30' : 'from-blue-300/30'} via-transparent to-transparent`}></div>
      
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`beam-${index}`}
          className={`absolute h-[150vh] w-[30px] ${darkMode ? 'bg-gradient-to-b from-neon-cyan/5 via-neon-cyan/10 to-transparent' : 'bg-gradient-to-b from-blue-400/5 via-blue-400/10 to-transparent'}`}
          animate={{
            left: ['0%', '100%'],
            rotate: [15, 25, 15],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 7 + index * 2,
            repeat: Infinity,
            delay: index * 1.5,
            ease: "linear",
          }}
          style={{
            transformOrigin: 'center',
          }}
        />
      ))}
      
      {stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          className={`absolute rounded-full ${darkMode ? 'bg-white' : 'bg-blue-400'}`}
          animate={{
            opacity: star.hovered ? [0.6, 1, 0.8, 1] : star.opacity,
            scale: star.hovered ? [1, 1.5, 1.2, 1.8] : 1,
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
      
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className={`absolute w-32 h-32 rounded-full ${darkMode ? 'bg-gradient-radial from-neon-cyan/20 to-transparent' : 'bg-gradient-radial from-blue-400/20 to-transparent'}`}
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
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + index * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ImmersiveMenuBackground;
