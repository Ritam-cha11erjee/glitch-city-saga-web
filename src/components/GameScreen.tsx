
import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import GlitchText from './GlitchText';
import ChoiceButton from './ChoiceButton';
import storyData from '../data/storyData';

interface Choice {
  text: string;
  target: string;
}

const GameScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState('download');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [locationText, setLocationText] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  
  // Audio effects
  const transitionSound = useAudio('/sounds/glitch-transition.mp3');
  
  // Initialize the game state from the story data
  useEffect(() => {
    if (storyData[currentLocation]) {
      setLocationText(storyData[currentLocation].text);
      setChoices(storyData[currentLocation].choices);
    }
  }, [currentLocation]);
  
  const handleChoice = (target: string) => {
    setIsTransitioning(true);
    transitionSound.play();
    
    // Short delay to allow transition animation
    setTimeout(() => {
      setCurrentLocation(target);
      setIsTransitioning(false);
    }, 1000);
  };
  
  // Start screen UI
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative bg-black">
        <div className="absolute inset-0 grid-background opacity-30"></div>
        
        <h1 className="text-5xl md:text-7xl font-glitch text-neon-cyan mb-8 text-center animate-text-glow">
          GLITCH CITY
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-xl text-center mb-12">
          A digital realm where reality fragments and choices reshape your destiny
        </p>
        
        <ChoiceButton 
          text="BEGIN SIMULATION" 
          onClick={() => setGameStarted(true)} 
        />
        
        <p className="mt-8 text-sm text-white/60">Created with React & TailwindCSS</p>
      </div>
    );
  }
  
  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-black/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6 md:p-8 mb-8">
          <div className="mb-2 flex items-center">
            <div className="h-3 w-3 rounded-full bg-neon-yellow mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-neon-magenta mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-neon-cyan"></div>
            <div className="flex-1 text-right">
              <span className="text-xs font-cyber text-white/60">LOCATION:/{currentLocation}/</span>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6"></div>
          
          <div className="prose prose-invert max-w-none">
            <GlitchText 
              text={locationText} 
              className="text-lg md:text-xl leading-relaxed"
              glitchIntensity="low"
            />
          </div>
        </div>
        
        {choices.length > 0 ? (
          <div className="flex flex-col items-center w-full space-y-4">
            {choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                text={choice.text}
                onClick={() => handleChoice(choice.target)}
                variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className="text-white/70 mb-4">THE END</p>
            <ChoiceButton 
              text="START OVER" 
              onClick={() => {
                handleChoice('download');
              }}
              variant="secondary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
