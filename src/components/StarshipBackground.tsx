
import { useState, useEffect, useRef } from 'react';

interface StarshipBackgroundProps {
  darkMode: boolean;
  triggerAnimation?: boolean;
  shake?: boolean;
  currentLocation?: string;
  mousePosition?: { x: number; y: number };
}

const StarshipBackground: React.FC<StarshipBackgroundProps> = ({
  darkMode,
  triggerAnimation = false,
  shake = false,
  currentLocation = 'start',
  mousePosition = { x: 0, y: 0 }
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stars, setStars] = useState<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    twinkleSpeed: number;
    twinklePhase: number;
    originalSize: number;
  }>>([]);
  
  const [planets, setPlanets] = useState<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    active: boolean;
  }>>([]);
  
  const [lasers, setLasers] = useState<Array<{
    x: number;
    y: number;
    length: number;
    speed: number;
    color: string;
    active: boolean;
    direction: number;
  }>>([]);

  // Determine background color based on story location
  const getBackgroundColor = () => {
    if (!currentLocation) return darkMode ? '#050A20' : '#0A1535';
    
    switch (currentLocation) {
      case 'anomaly':
      case 'anomalyPower':
      case 'anomalyCaution':
        return darkMode ? '#1A0A30' : '#2C1A4A';
      case 'xylosCombat':
      case 'xylosChallenge':
        return darkMode ? '#300A0A' : '#4A1A1A';
      case 'kythari':
      case 'kythariPeace':
      case 'kythariExplore':
      case 'kythariTech':
        return darkMode ? '#0A301A' : '#1A4A2C';
      case 'ancient':
      case 'ancientPathways':
        return darkMode ? '#1A2030' : '#2C3A4A';
      default:
        return darkMode ? '#050A20' : '#0A1535';
    }
  };

  // Initialize stars
  useEffect(() => {
    const initStars = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const { width, height } = canvas;
      
      const newStars = Array(150).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        originalSize: Math.random() * 2 + 1,
        color: Math.random() > 0.8 ? 
          `hsl(${Math.random() * 60 + 180}, 100%, 80%)` : 
          `hsl(${Math.random() * 360}, 80%, 80%)`,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      }));
      
      setStars(newStars);
    };

    initStars();
    
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle planets appearing randomly
  useEffect(() => {
    const spawnPlanet = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const { width, height } = canvas;
      
      // Random hue for planet
      const hue = Math.random() * 360;
      const saturation = 70 + Math.random() * 30;
      const lightness = 40 + Math.random() * 30;
      
      const newPlanet = {
        x: width + 100, // Start off-screen
        y: Math.random() * height * 0.8 + height * 0.1,
        size: Math.random() * 60 + 40,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        speed: Math.random() * 0.5 + 0.2,
        active: true
      };
      
      setPlanets(prev => [...prev, newPlanet]);
      
      // Remove planet after it exits screen
      setTimeout(() => {
        setPlanets(prev => prev.filter(p => p !== newPlanet));
      }, 60000);
    };
    
    // Spawn planets at random intervals
    const planetInterval = setInterval(spawnPlanet, 15000 + Math.random() * 20000);
    return () => clearInterval(planetInterval);
  }, []);

  // Handle lasers in combat situations
  useEffect(() => {
    if (['xylosChallenge', 'anomalyPower', 'anomalyCaution'].includes(currentLocation) && shake) {
      const spawnLaser = () => {
        if (!canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const { width, height } = canvas;
        
        // Create new laser
        const newLaser = {
          x: width * 0.3 + Math.random() * width * 0.1,
          y: height * 0.5 + (Math.random() - 0.5) * height * 0.2,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 10 + 10,
          color: Math.random() > 0.5 ? '#FF3366' : '#33FFDD',
          active: true,
          direction: Math.random() > 0.5 ? 1 : -1
        };
        
        setLasers(prev => [...prev, newLaser]);
        
        // Remove laser after it completes animation
        setTimeout(() => {
          setLasers(prev => prev.filter(l => l !== newLaser));
        }, 2000);
      };
      
      // Spawn lasers frequently during combat
      const laserInterval = setInterval(spawnLaser, 400 + Math.random() * 800);
      return () => clearInterval(laserInterval);
    }
  }, [currentLocation, shake]);

  // Animation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    
    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const delta = time - lastTime;
      lastTime = time;
      
      // Clear canvas
      ctx.fillStyle = getBackgroundColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling effect
      stars.forEach(star => {
        const distance = Math.sqrt(
          Math.pow(star.x - mousePosition.x, 2) + 
          Math.pow(star.y - mousePosition.y, 2)
        );
        
        // Mouse hover effect (stars near mouse grow and brighten)
        const mouseEffect = distance < 100 ? (1 - distance / 100) * 3 : 0;
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        
        // Calculate size with both twinkling and mouse hover effects
        const size = star.originalSize * (1 + twinkle * 0.5 + mouseEffect);
        
        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        
        // Change color based on mouse proximity
        if (mouseEffect > 0) {
          const hue = (time / 50) % 360;
          ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
        } else {
          ctx.fillStyle = star.color;
        }
        
        ctx.fill();
      });

      // Draw planets
      planets.forEach(planet => {
        planet.x -= planet.speed;
        
        // Draw planet
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
        
        // Draw planet rings for some planets
        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.ellipse(
            planet.x, 
            planet.y, 
            planet.size * 1.5, 
            planet.size * 0.5, 
            Math.PI / 4, 
            0, 
            Math.PI * 2
          );
          ctx.strokeStyle = `${planet.color}88`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });

      // Draw lasers
      lasers.forEach(laser => {
        laser.x += laser.speed * laser.direction;
        
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y);
        ctx.lineTo(laser.x - laser.length * laser.direction, laser.y);
        ctx.strokeStyle = laser.color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Add glow effect
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw the starship
      drawStarship(ctx, canvas.width, canvas.height, time, shake);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [stars, planets, lasers, darkMode, shake, currentLocation, mousePosition]);

  // Draw starship function
  const drawStarship = (
    ctx: CanvasRenderingContext2D, 
    canvasWidth: number, 
    canvasHeight: number, 
    time: number,
    shake: boolean
  ) => {
    // Position the starship
    const shipX = canvasWidth * 0.3;
    const shipY = canvasHeight * 0.5;
    
    // Apply shake effect if needed
    const shakeX = shake ? (Math.random() - 0.5) * 10 : 0;
    const shakeY = shake ? (Math.random() - 0.5) * 10 : 0;
    
    ctx.save();
    ctx.translate(shipX + shakeX, shipY + shakeY);
    
    // Draw engine exhaust/jet trail
    const jetLength = 120 + Math.sin(time * 0.01) * 20;
    const jetWidth = 30 + Math.sin(time * 0.02) * 5;
    
    // Gradient for jet trail
    const jetGradient = ctx.createLinearGradient(-jetLength, 0, 0, 0);
    jetGradient.addColorStop(0, 'rgba(0, 100, 255, 0)');
    jetGradient.addColorStop(0.4, 'rgba(0, 150, 255, 0.2)');
    jetGradient.addColorStop(0.8, 'rgba(100, 200, 255, 0.7)');
    jetGradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
    
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(-jetLength, jetWidth);
    ctx.lineTo(-jetLength, -jetWidth);
    ctx.closePath();
    ctx.fillStyle = jetGradient;
    ctx.fill();
    
    // Draw ship body
    ctx.beginPath();
    ctx.moveTo(80, 0);  // Nose of ship
    ctx.lineTo(40, -25);
    ctx.lineTo(-40, -30);
    ctx.lineTo(-50, 0);
    ctx.lineTo(-40, 30);
    ctx.lineTo(40, 25);
    ctx.closePath();
    
    // Ship body gradient
    const bodyGradient = ctx.createLinearGradient(0, -30, 0, 30);
    bodyGradient.addColorStop(0, '#303060');
    bodyGradient.addColorStop(0.5, '#505080');
    bodyGradient.addColorStop(1, '#303060');
    
    ctx.fillStyle = bodyGradient;
    ctx.fill();
    
    ctx.strokeStyle = '#8080A0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw wings
    ctx.beginPath();
    ctx.moveTo(20, -25);
    ctx.lineTo(0, -60);
    ctx.lineTo(-30, -30);
    ctx.closePath();
    
    ctx.moveTo(20, 25);
    ctx.lineTo(0, 60);
    ctx.lineTo(-30, 30);
    ctx.closePath();
    
    ctx.fillStyle = '#404060';
    ctx.fill();
    ctx.stroke();
    
    // Draw cockpit
    ctx.beginPath();
    ctx.ellipse(30, 0, 25, 15, 0, 0, Math.PI * 2);
    
    // Cockpit gradient based on energy flow
    let cockpitColor = '#88DDFF';
    if (['anomalyPower', 'xylosCombat', 'xylosChallenge'].includes(currentLocation)) {
      cockpitColor = '#FF8866';
    } else if (['kythariPeace', 'kythariTech', 'xylosTrade'].includes(currentLocation)) {
      cockpitColor = '#88FF99';
    }
    
    const cockpitGradient = ctx.createRadialGradient(30, 0, 5, 30, 0, 25);
    cockpitGradient.addColorStop(0, '#FFFFFF');
    cockpitGradient.addColorStop(0.7, cockpitColor);
    cockpitGradient.addColorStop(1, '#304060');
    
    ctx.fillStyle = cockpitGradient;
    ctx.fill();
    ctx.stroke();
    
    // Draw ship lights (pulsing)
    const lights = [
      { x: -35, y: -20, color: '#FFFF00' },
      { x: -35, y: 20, color: '#FF0000' },
      { x: 60, y: -10, color: '#00FFFF' },
      { x: 60, y: 10, color: '#00FFFF' },
      { x: 0, y: -40, color: '#FFFFFF' },
      { x: 0, y: 40, color: '#FFFFFF' }
    ];
    
    lights.forEach(light => {
      const pulse = Math.sin(time * 0.002 + light.x * 0.1) * 0.5 + 0.5;
      const radius = 3 + pulse * 2;
      
      ctx.beginPath();
      ctx.arc(light.x, light.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = light.color;
      ctx.fill();
      
      // Glow effect
      ctx.beginPath();
      ctx.arc(light.x, light.y, radius * 3, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(
        light.x, light.y, radius,
        light.x, light.y, radius * 3
      );
      glowGradient.addColorStop(0, `${light.color}88`);
      glowGradient.addColorStop(1, `${light.color}00`);
      
      ctx.fillStyle = glowGradient;
      ctx.fill();
    });
    
    ctx.restore();
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full transition-all duration-700 ${
        triggerAnimation ? 'opacity-0' : 'opacity-100'
      } ${shake ? 'animate-shake' : ''}`}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default StarshipBackground;
