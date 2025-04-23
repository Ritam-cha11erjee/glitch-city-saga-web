
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '', 
  glitchIntensity = 'medium' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  // Set up typewriter effect
  useEffect(() => {
    let index = 0;
    setDisplayText('');
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30); // typing speed

    return () => clearInterval(typeInterval);
  }, [text]);

  // Set up random glitching
  useEffect(() => {
    if (displayText === text) {
      const glitchFrequency = 
        glitchIntensity === 'low' ? 3000 :
        glitchIntensity === 'high' ? 1000 : 2000;

      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }, glitchFrequency);

      return () => clearInterval(glitchInterval);
    }
  }, [displayText, text, glitchIntensity]);

  return (
    <span 
      className={`${className} ${isGlitching ? 'animate-glitch' : ''}`}
      data-text={displayText}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;
