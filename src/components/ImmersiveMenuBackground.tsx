
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

interface NeonLight {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  delay: number;
  angle: number;
}

interface HoloPad {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  delay: number;
}

const ImmersiveMenuBackground: React.FC<ImmersiveMenuBackgroundProps> = ({ 
  darkMode, 
  mousePosition 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [neonLights, setNeonLights] = useState<NeonLight[]>([]);
  const [holoPads, setHoloPads] = useState<HoloPad[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Generate background elements based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Generate stars
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
        
        // Generate neon lights
        const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#33FF99', '#FF3366'];
        const newNeonLights = Array.from({ length: 15 }, (_, i) => ({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          width: Math.random() * 100 + 50,
          height: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
          angle: Math.random() * 180
        }));
        setNeonLights(newNeonLights);
        
        // Generate holographic pads
        const newHoloPads = Array.from({ length: 8 }, (_, i) => ({
          id: i,
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.8 + height * 0.1,
          size: Math.random() * 120 + 80,
          alpha: Math.random() * 0.3 + 0.1,
          delay: Math.random() * 3
        }));
        setHoloPads(newHoloPads);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Star hover effect
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
      {/* Base gradients */}
      <div className={`absolute inset-0 bg-gradient-radial ${darkMode ? 'from-purple-900/30' : 'from-blue-300/30'} via-transparent to-transparent`}></div>
      
      {/* Parallax city silhouette */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30vh] z-10 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1440' height='300' viewBox='0 0 1440 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 300V99h30v30h30v-30h30v-40h10v20h20v-50h20v30h10v-10h10v-10h20v20h5v-30h15v-10h10v20h15v-30h5v-9h10v29h10v-40h10v20h10v-10h10v30h20v-20h10v10h10v-10h10v-10h10v20h10v-30h20v40h10v-20h10v10h30v-20h10v-10h5v30h15v-10h10v-10h10v-10h10v30h10v-10h10v-10h10v30h10v-20h10v10h10v-10h15v-10h15v30h10v-20h15v-10h5v40h10v-10h10v-10h10v30h10v-10h5v-5h5v-5h10v20h5v-10h5v-20h20v10h10v-10h5v-10h15v20h5v-10h5v10h15v-10h5v-5h10v-5h5v20h10v-10h10v-20h10v-10h10v20h10v10h10v-10h10v-10h10v30h30v-10h10v-30h10v20h5v-10h15v10h10v-10h10v-10h10v30h10v-20h10v10h10v-10h10v-10h10v-10h10v40h10v-10h10v-20h10v30h10v-30h10v10h10v-10h5v30h5v-30h10v20h10v-30h10v20h10v20h10v-10h10v-10h10v-20h10v40h20v-20h10v10h20v-20h10v-10h5v30h5v-10h20v-10h10v30h20v-10h10v-20h10v30h20v-10h10v-10h10v-10h10v20h10v-20h10v10h10v-10h10v-5h10v-5h10v20h10v-10h10v-20h10v10h10v-10h10v30h10v-20h10v10h10v-20h10v10h10v10h10v-10h10v20h10v-30h10v10h10v-10h10v30h10v-20h10v10h10v-10h10v-20h20v30h10v-20h10v10h10v-10h10v30h20v-30h10v20h10v-10h10v-10h10v20h10v-10h10v-10h10v-10h10v30h20v-20h10v10h10v-10h20v10h10v-10h10v20h20V40h10v60h20v30h10v20h10v-20h10v-20h10v-20h10v40h10v-20h10v30h10v20h10v-40h10v10h10v-20h10v30h10v-10h10v-10h10v30h10v-30h10v10h10v-10h10v20h10v-10h10v-10h10v20h10v-20h10v-10h10v30h10v-20h10v-5h10v-5h10v20h10v-10h10v-10h10v30h20v-30h10v10h10v-10h10v20h20v-30h10v20h20V0H0v300z' fill='%235603AD' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          transform: `translateX(${-mousePosition.x / 80}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Moving light beams */}
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
      
      {/* Neon lights */}
      {neonLights.map(light => (
        <motion.div
          key={`neon-${light.id}`}
          className="absolute rounded-sm"
          style={{
            left: `${light.x}px`,
            top: `${light.y}px`,
            width: `${light.width}px`,
            height: `${light.height}px`,
            backgroundColor: light.color,
            boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
            transform: `rotate(${light.angle}deg)`,
            transformOrigin: 'center',
            opacity: 0.7,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            boxShadow: [
              `0 0 5px ${light.color}, 0 0 10px ${light.color}`,
              `0 0 15px ${light.color}, 0 0 30px ${light.color}`,
              `0 0 5px ${light.color}, 0 0 10px ${light.color}`
            ]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: light.delay,
          }}
        />
      ))}
      
      {/* Holographic projection pads */}
      {holoPads.map(pad => (
        <motion.div
          key={`holo-${pad.id}`}
          className="absolute rounded-full"
          style={{
            left: `${pad.x}px`,
            top: `${pad.y}px`,
            width: `${pad.size}px`,
            height: `${pad.size * 0.4}px`,
            background: darkMode 
              ? `radial-gradient(circle, rgba(0,255,255,${pad.alpha}) 0%, rgba(0,100,255,${pad.alpha/3}) 70%, transparent 100%)`
              : `radial-gradient(circle, rgba(100,200,255,${pad.alpha}) 0%, rgba(100,150,255,${pad.alpha/3}) 70%, transparent 100%)`,
            transform: `translateX(${(mousePosition.x - dimensions.width/2) / 40}px) translateY(${(mousePosition.y - dimensions.height/2) / 40}px) rotateX(60deg)`,
          }}
          animate={{
            opacity: [pad.alpha * 0.5, pad.alpha, pad.alpha * 0.5],
            boxShadow: [
              '0 0 10px rgba(0,200,255,0.3)',
              '0 0 20px rgba(0,200,255,0.6)',
              '0 0 10px rgba(0,200,255,0.3)'
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: pad.delay,
          }}
        >
          {/* Holographic content */}
          <motion.div 
            className="w-full h-full flex justify-center items-center overflow-hidden"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="h-[40%] w-[80%] flex flex-col gap-1 mt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={`holo-line-${pad.id}-${i}`}
                  className="h-1 bg-blue-300/50"
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
      
      {/* Stars */}
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
      
      {/* Floating orbs with parallax effect */}
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
          style={{
            filter: `blur(${index % 2 === 0 ? 5 : 10}px)`,
          }}
        />
      ))}
      
      {/* Digital rain effect (vertical lines of code-like characters) - pixelated effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`digitalrain-${index}`}
            className={`absolute top-0 w-[2px] ${darkMode ? 'bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-400/20 to-transparent'}`}
            style={{
              height: `${Math.random() * 50 + 30}%`,
              left: `${(index / 15) * 100}%`,
              transform: `translateX(${(mousePosition.x - dimensions.width/2) / 80}px)`,
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + index % 6,
              repeat: Infinity,
              delay: index * 0.7,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImmersiveMenuBackground;
