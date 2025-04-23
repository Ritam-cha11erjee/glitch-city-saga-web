
import { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { cn } from '@/lib/utils';

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const clickSound = useAudio('/sounds/button-click.mp3');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a slight delay before showing the button for staggered animation
    const timer = setTimeout(() => setIsVisible(true), Math.random() * 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    clickSound.play();
    onClick();
  };
  
  const getButtonColorClasses = () => {
    switch (variant) {
      case 'secondary':
        return {
          base: 'text-neon-magenta border-neon-magenta',
          hover: 'hover:bg-neon-magenta/10',
          glow: 'shadow-[0_0_10px_rgba(255,0,255,0.7)]'
        };
      case 'accent':
        return {
          base: 'text-neon-yellow border-neon-yellow',
          hover: 'hover:bg-neon-yellow/10',
          glow: 'shadow-[0_0_10px_rgba(255,255,0,0.7)]'
        };
      default:
        return {
          base: 'text-neon-cyan border-neon-cyan',
          hover: 'hover:bg-neon-cyan/10',
          glow: 'shadow-[0_0_10px_rgba(0,255,255,0.7)]'
        };
    }
  };
  
  const colors = getButtonColorClasses();

  return (
    <button
      className={cn(
        'relative px-6 py-3 mb-4 w-full max-w-lg transition-all duration-300 border-2 rounded-md backdrop-blur-sm bg-black/30',
        colors.base,
        colors.hover,
        isHovered ? colors.glow : '',
        isVisible ? 'animate-scale-in opacity-100' : 'opacity-0',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="font-glitch tracking-wider">{text}</span>
    </button>
  );
};

export default ChoiceButton;
