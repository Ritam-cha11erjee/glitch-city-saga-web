
import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import GlitchText from './GlitchText';
import ChoiceButton from './ChoiceButton';
import GameMenu from './GameMenu';
import storyData from '../data/storyData';
import CityBackground from './CityBackground';
import DecisionAnalysis from './DecisionAnalysis';
import GameTimer from './GameTimer';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';

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
  const [gameEnded, setGameEnded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [screenShake, setScreenShake] = useState(false);
  const [decisionHistory, setDecisionHistory] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  
  // Define risky locations that should trigger screen shake
  const riskyLocations = ['missionAccept', 'infiltrateHub', 'carryOutTask', 'sabotageTask'];
  
  // Audio effects with proper options
  const transitionSound = useAudio('/sounds/glitch-transition.mp3', { volume: 0.5 });
  const buttonClickSound = useAudio('/sounds/button-click.mp3', { volume: 0.3 });
  
  // Initialize the game state from the story data
  useEffect(() => {
    if (storyData[currentLocation]) {
      setLocationText(storyData[currentLocation].text);
      setChoices(storyData[currentLocation].choices);
      
      // Check if this is a risky location
      setScreenShake(riskyLocations.includes(currentLocation));
      
      // Check if game has ended (no more choices)
      if (gameStarted && storyData[currentLocation].choices.length === 0) {
        handleGameEnd();
      }
    }
  }, [currentLocation, gameStarted]);
  
  const handleChoice = async (target: string, choiceText: string) => {
    buttonClickSound.play();
    setIsTransitioning(true);
    await transitionSound.play();
    
    // Record this decision
    setDecisionHistory(prev => [...prev, `${currentLocation} → ${target}: ${choiceText}`]);
    
    // Short delay to allow transition animation
    setTimeout(() => {
      setCurrentLocation(target);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    buttonClickSound.play();
  };
  
  const handleGameEnd = () => {
    setGameEnded(true);
    setEndTime(Date.now());
  };
  
  const handleRestart = () => {
    setCurrentLocation('download');
    setGameEnded(false);
    setDecisionHistory([]);
    setStartTime(Date.now());
    setEndTime(null);
    buttonClickSound.play();
  };
  
  // Start screen UI
  if (!gameStarted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
        <CityBackground darkMode={darkMode} />
        
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
          <Sun className="h-4 w-4 text-yellow-500" />
          <Switch 
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Moon className="h-4 w-4 text-blue-300" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-glitch text-neon-cyan mb-8 text-center animate-text-glow z-10">
          GLITCH CITY
        </h1>
        
        <GameMenu onStartGame={handleStartGame} />
      </div>
    );
  }
  
  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-opacity duration-500 relative ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      } ${darkMode ? 'bg-black' : 'bg-gray-100'}`}
    >
      <CityBackground 
        darkMode={darkMode} 
        triggerAnimation={isTransitioning} 
        shake={screenShake} 
        currentLocation={currentLocation}
      />
      
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
        <Sun className="h-4 w-4 text-yellow-500" />
        <Switch 
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        <Moon className="h-4 w-4 text-blue-300" />
      </div>
      
      {startTime && !gameEnded && (
        <div className="absolute top-4 left-4 z-20">
          <GameTimer startTime={startTime} />
        </div>
      )}
      
      <div className={`w-full max-w-3xl mx-auto z-10 ${screenShake ? 'animate-shake' : ''}`}>
        <div className={`${darkMode ? 'bg-black/50' : 'bg-white/70'} backdrop-blur-sm border ${darkMode ? 'border-primary/30' : 'border-gray-300'} rounded-lg p-6 md:p-8 mb-8`}>
          <div className="mb-2 flex items-center">
            <div className="h-3 w-3 rounded-full bg-neon-yellow mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-neon-magenta mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-neon-cyan"></div>
            <div className="flex-1 text-right">
              <span className={`text-xs font-cyber ${darkMode ? 'text-white/60' : 'text-black/60'}`}>LOCATION:/{currentLocation}/</span>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6"></div>
          
          <div className="prose prose-invert max-w-none">
            <GlitchText 
              text={locationText} 
              className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-white' : 'text-black'}`}
              glitchIntensity="low"
            />
          </div>
        </div>
        
        {gameEnded ? (
          <DecisionAnalysis 
            decisions={decisionHistory} 
            startTime={startTime || 0} 
            endTime={endTime || Date.now()} 
            finalLocation={currentLocation}
            onRestart={handleRestart}
            darkMode={darkMode}
          />
        ) : choices.length > 0 ? (
          <div className="flex flex-col items-center w-full space-y-4">
            {choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                text={choice.text}
                onClick={() => handleChoice(choice.target, choice.text)}
                variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className={`${darkMode ? 'text-white/70' : 'text-black/70'} mb-4`}>THE END</p>
            <ChoiceButton 
              text="START OVER" 
              onClick={handleRestart}
              variant="secondary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
