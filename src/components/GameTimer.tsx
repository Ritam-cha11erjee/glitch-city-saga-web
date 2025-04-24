
import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface GameTimerProps {
  startTime: number;
}

const GameTimer: React.FC<GameTimerProps> = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-md border border-neon-cyan/30 text-neon-cyan">
      <Timer className="w-4 h-4" />
      <span className="font-cyber">{formatTime(elapsedTime)}</span>
    </div>
  );
};

export default GameTimer;
