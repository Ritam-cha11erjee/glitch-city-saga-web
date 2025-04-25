
import { useState, useEffect, useRef } from 'react';

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
  const typingRef = useRef<number | null>(null);
  
  // Reset and start typewriter effect when text changes
  useEffect(() => {
    // Clear any existing interval
    if (typingRef.current) clearInterval(typingRef.current);
    
    // Reset states
    setDisplayText('');
    setTypingComplete(false);
    
    if (!text) return;
    
    let currentIndex = 0;
    const textLength = text.length;
    
    // Use a more reliable interval approach
    typingRef.current = window.setInterval(() => {
      if (currentIndex < textLength) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        if (typingRef.current) clearInterval(typingRef.current);
        setTypingComplete(true);
      }
    }, 30); // typing speed
    
    // Cleanup function
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [text]);

  // Set up random glitching
  useEffect(() => {
    if (!typingComplete || !displayText.length) return;
    
    const glitchFrequency = 
      glitchIntensity === 'low' ? 3000 :
      glitchIntensity === 'high' ? 1000 : 2000;
    
    let glitchInterval: number;
    
    const startGlitching = () => {
      glitchInterval = window.setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }, glitchFrequency);
    };
    
    startGlitching();
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, [typingComplete, displayText, glitchIntensity]);

  return (
    <span 
      className={`${className} ${isGlitching ? 'animate-glitch' : ''}`}
      data-text={text}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;
