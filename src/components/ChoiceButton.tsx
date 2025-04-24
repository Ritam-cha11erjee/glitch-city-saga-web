
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  description?: string;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  description
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getButtonClasses = () => {
    const baseClasses = "relative w-full text-lg py-3 font-cyber transition-all duration-300 border";
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30 hover:animate-button-glow`;
      case 'secondary':
        return `${baseClasses} bg-neon-magenta/20 border-neon-magenta text-neon-magenta hover:bg-neon-magenta/30 hover:animate-button-glow`;
      case 'accent':
        return `${baseClasses} bg-neon-yellow/20 border-neon-yellow text-neon-yellow hover:bg-neon-yellow/30 hover:animate-button-glow`;
      default:
        return baseClasses;
    }
  };
  
  return (
    <div className="w-full relative">
      <Button 
        onClick={onClick}
        className={getButtonClasses()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </Button>
      
      {description && isHovered && (
        <div className="absolute left-0 right-0 -bottom-10 z-20 bg-black/80 backdrop-blur-sm border border-primary/20 rounded p-1 text-xs text-white/80 transition-all duration-200">
          {description}
        </div>
      )}
    </div>
  );
};

export default ChoiceButton;
