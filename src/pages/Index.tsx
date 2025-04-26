
import { useRef, useEffect } from 'react';
import GameScreen from '@/components/GameScreen';
import AudioControls from '@/components/AudioControls';

const Index = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Create interactive background
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const bg = backgroundRef.current;
    
    // Create particles with various colors and sizes
    const particleCount = 30;
    const particles: HTMLDivElement[] = [];
    
    const colors = [
      'rgba(0, 255, 255, 0.5)',  // cyan
      'rgba(255, 0, 255, 0.5)',  // magenta
      'rgba(255, 255, 0, 0.5)',  // yellow
      'rgba(0, 255, 0, 0.5)',    // green
      'rgba(0, 0, 255, 0.5)',    // blue
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = 4 + Math.random() * 10;
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      particle.style.filter = 'blur(1px)';
      
      // Store initial position for animation
      particle.dataset.x = (Math.random() * 100).toString();
      particle.dataset.y = (Math.random() * 100).toString();
      particle.dataset.speedX = (Math.random() * 0.1 - 0.05).toString();
      particle.dataset.speedY = (Math.random() * 0.1 - 0.05).toString();
      
      bg.appendChild(particle);
      particles.push(particle);
      
      // Fade in with delay
      setTimeout(() => {
        particle.style.transition = 'opacity 1s ease-in';
        particle.style.opacity = (0.3 + Math.random() * 0.7).toString();
      }, i * 100);
    }
    
    // Animate particles
    let animationId: number;
    
    const animate = () => {
      particles.forEach(particle => {
        // Get current position and speed
        let x = parseFloat(particle.dataset.x || '0');
        let y = parseFloat(particle.dataset.y || '0');
        let speedX = parseFloat(particle.dataset.speedX || '0');
        let speedY = parseFloat(particle.dataset.speedY || '0');
        
        // Update position
        x += speedX;
        y += speedY;
        
        // Bounce off edges
        if (x < 0 || x > 100) {
          speedX *= -1;
          x = Math.max(0, Math.min(100, x));
        }
        if (y < 0 || y > 100) {
          speedY *= -1;
          y = Math.max(0, Math.min(100, y));
        }
        
        // Store updated values
        particle.dataset.x = x.toString();
        particle.dataset.y = y.toString();
        particle.dataset.speedX = speedX.toString();
        particle.dataset.speedY = speedY.toString();
        
        // Apply position
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden relative">
      {/* Animated background grid */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black"
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(149,0,255,0.15)_0%,transparent_70%)]"></div>
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>

      {/* Game content */}
      <GameScreen />
      
      {/* Audio controls */}
      <AudioControls />
    </div>
  );
};

export default Index;
