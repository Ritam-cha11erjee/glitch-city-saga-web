
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
  const [typingComplete, setTypingComplete] = useState(false);

  // Set up typewriter effect
  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setTypingComplete(false);
    
    // Reset when text changes
    if (!text) return;
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTypingComplete(true);
      }
    }, 30); // typing speed

    return () => clearInterval(typeInterval);
  }, [text]);

  // Set up random glitching
  useEffect(() => {
    if (typingComplete && displayText.length > 0) {
      const glitchFrequency = 
        glitchIntensity === 'low' ? 3000 :
        glitchIntensity === 'high' ? 1000 : 2000;

      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }, glitchFrequency);

      return () => clearInterval(glitchInterval);
    }
  }, [typingComplete, displayText, glitchIntensity]);

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
