
import React, { useState, useEffect } from 'react';
import GameScreen from '@/components/GameScreen';
import AudioControls from '@/components/AudioControls';
import ImmersiveMenuBackground from '@/components/ImmersiveMenuBackground';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Add some delay/smoothing to mouse movements
      setMousePosition(prev => ({
        x: prev.x + (e.clientX - prev.x) * 0.1,
        y: prev.y + (e.clientY - prev.y) * 0.1
      }));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="bg-background min-h-screen overflow-hidden relative">
      {/* Dynamic background */}
      <ImmersiveMenuBackground darkMode={true} mousePosition={mousePosition} />
      
      {/* Game content */}
      <GameScreen />
      
      {/* Audio controls */}
      <AudioControls />
    </div>
  );
};

export default Index;
