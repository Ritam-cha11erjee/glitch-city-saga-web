
import { useEffect, useRef, useState } from 'react';

interface CityBackgroundProps {
  darkMode: boolean;
  triggerAnimation?: boolean;
  shake?: boolean;
  currentLocation?: string;
}

const CityBackground: React.FC<CityBackgroundProps> = ({ 
  darkMode, 
  triggerAnimation = false,
  shake = false,
  currentLocation = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const [transitionEffect, setTransitionEffect] = useState(0);
  
  useEffect(() => {
    if (triggerAnimation) {
      setTransitionEffect(Math.random() > 0.5 ? 1 : 2);
      setTimeout(() => setTransitionEffect(0), 1000);
    }
  }, [triggerAnimation]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Buildings properties
    const buildings: {
      x: number;
      width: number;
      height: number;
      color: string;
      windows: {x: number, y: number, size: number, lit: boolean, flickerRate: number}[];
    }[] = [];
    
    // Initialize buildings
    const initBuildings = () => {
      buildings.length = 0;
      const buildingCount = Math.floor(canvas.width / 80);
      
      for (let i = 0; i < buildingCount; i++) {
        const width = 60 + Math.random() * 60;
        const height = 150 + Math.random() * 400;
        const x = i * (width - 10);
        
        // Building color based on theme
        const colorValue = darkMode ? 
          Math.floor(20 + Math.random() * 40) : 
          Math.floor(160 + Math.random() * 60);
        const color = darkMode ? 
          `rgb(${colorValue}, ${colorValue + 10}, ${colorValue + 20})` : 
          `rgb(${colorValue}, ${colorValue}, ${colorValue + 20})`;
        
        // Generate windows for this building
        const windows = [];
        const windowRows = Math.floor(height / 30);
        const windowCols = Math.floor(width / 20);
        
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            if (Math.random() > 0.3) { // 70% chance of window
              windows.push({
                x: col * 20 + 5,
                y: row * 30 + 10,
                size: 10 + Math.random() * 5,
                lit: Math.random() > 0.3,
                flickerRate: Math.random() * 0.02
              });
            }
          }
        }
        
        buildings.push({ x, width, height, color, windows });
      }
    };
    
    initBuildings();
    
    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (darkMode) {
        gradient.addColorStop(0, '#050720');
        gradient.addColorStop(1, '#0a0a2a');
      } else {
        gradient.addColorStop(0, '#6a8bbc');
        gradient.addColorStop(1, '#f9c4ac');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars in night mode
      if (darkMode) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height * 0.6;
          const r = Math.random() * 1.5;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw cityscape
      const horizon = canvas.height * 0.7;
      
      // Apply shake effect if enabled
      let shakeOffsetX = 0;
      let shakeOffsetY = 0;
      if (shake) {
        shakeOffsetX = (Math.random() - 0.5) * 5;
        shakeOffsetY = (Math.random() - 0.5) * 5;
      }
      
      // Draw buildings
      buildings.forEach(building => {
        // Draw building
        ctx.fillStyle = building.color;
        ctx.fillRect(
          building.x + shakeOffsetX, 
          horizon - building.height + shakeOffsetY, 
          building.width, 
          building.height
        );
        
        // Draw windows
        building.windows.forEach(window => {
          // Determine if window is lit
          if (Math.random() < window.flickerRate) {
            window.lit = !window.lit;
          }
          
          // Check if window is near mouse position for highlight effect
          const windowX = building.x + window.x;
          const windowY = horizon - building.height + window.y;
          const mouseDistance = Math.sqrt(
            Math.pow(windowX - mousePos.current.x, 2) + 
            Math.pow(windowY - mousePos.current.y, 2)
          );
          
          const isNearMouse = mouseDistance < 100;
          
          let windowColor;
          if (window.lit) {
            if (isNearMouse) {
              // Window close to mouse - brighter glow
              windowColor = darkMode ? 
                `rgba(0, 255, 255, 0.9)` : 
                `rgba(255, 220, 50, 0.9)`;
            } else {
              // Regular lit window
              const r = darkMode ? 200 + Math.random() * 55 : 255;
              const g = darkMode ? 200 + Math.random() * 55 : 220 + Math.random() * 35;
              const b = darkMode ? 100 : 50 + Math.random() * 50;
              windowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
            }
          } else {
            // Unlit window
            windowColor = darkMode ? 
              'rgba(30, 30, 50, 0.8)' : 
              'rgba(180, 180, 220, 0.5)';
          }
          
          ctx.fillStyle = windowColor;
          
          // Draw glowing windows
          if (window.lit && isNearMouse) {
            ctx.shadowColor = darkMode ? '#00ffff' : '#ffcc00';
            ctx.shadowBlur = 15;
          } else if (window.lit) {
            ctx.shadowColor = darkMode ? '#ffffaa' : '#ffcc00';
            ctx.shadowBlur = 5;
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fillRect(
            windowX + shakeOffsetX, 
            windowY + shakeOffsetY, 
            window.size, 
            window.size
          );
          
          ctx.shadowBlur = 0;
        });
      });
      
      // Draw ground
      const groundGradient = ctx.createLinearGradient(0, horizon, 0, canvas.height);
      if (darkMode) {
        groundGradient.addColorStop(0, '#0a0a1a');
        groundGradient.addColorStop(1, '#000005');
      } else {
        groundGradient.addColorStop(0, '#3a4a6a');
        groundGradient.addColorStop(1, '#2a3040');
      }
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, horizon, canvas.width, canvas.height - horizon);
      
      // Draw grid lines on ground
      ctx.strokeStyle = darkMode ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      const lineCount = 20;
      const lineSpacing = (canvas.height - horizon) / lineCount;
      
      for (let i = 1; i <= lineCount; i++) {
        const y = horizon + i * lineSpacing;
        const perspectiveWidth = (i / lineCount) * 0.8 + 0.2; // Wider at the front
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.globalAlpha = (1 - i / lineCount) * 0.5;
        ctx.stroke();
      }
      
      // Vertical grid lines
      const vLineCount = 30;
      const vLineSpacing = canvas.width / vLineCount;
      
      for (let i = 0; i <= vLineCount; i++) {
        const x = i * vLineSpacing;
        
        ctx.beginPath();
        ctx.moveTo(x, horizon);
        ctx.lineTo(x, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
      
      // Apply transition effects
      if (transitionEffect > 0) {
        ctx.fillStyle = transitionEffect === 1 ? 
          'rgba(0, 255, 255, 0.2)' : 
          'rgba(255, 0, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw glitch lines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 10; i++) {
          const y = Math.random() * canvas.height;
          const height = Math.random() * 5 + 1;
          ctx.fillRect(0, y, canvas.width, height);
        }
      }
      
      requestIdRef.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(requestIdRef.current);
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [darkMode, shake]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default CityBackground;
