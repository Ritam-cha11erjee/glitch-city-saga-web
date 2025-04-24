
import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import GlitchText from './GlitchText';
import ChoiceButton from './ChoiceButton';
import GameMenu from './GameMenu';
import CityBackground from './CityBackground';
import StarshipBackground from './StarshipBackground';
import DecisionAnalysis from './DecisionAnalysis';
import GameTimer from './GameTimer';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import glitchCityData from '../data/storyData';
import starshipData from '../data/starshipData';

interface Choice {
  text: string;
  target: string;
  essenceChange?: {
    [key: string]: number;
  };
  description?: string;
}

const GameScreen: React.FC = () => {
  const [storyType, setStoryType] = useState<'glitchCity' | 'starship' | null>(null);
  const [currentLocation, setCurrentLocation] = useState('');
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userEssence, setUserEssence] = useState<{[key: string]: number}>({
    harmony: 0,
    chaos: 0,
    energy: 0,
    diplomacy: 0,
    neutrality: 0,
    curiosity: 0,
    exploration: 0,
    greed: 0,
    knowledge: 0,
    progress: 0,
    risk: 0,
    strength: 0,
    isolation: 0,
    commerce: 0,
    caution: 0
  });
  
  // Define risky locations that should trigger screen shake
  const riskyLocations = {
    glitchCity: ['missionAccept', 'infiltrateHub', 'carryOutTask', 'sabotageTask'],
    starship: ['anomaly', 'anomalyPower', 'xylosChallenge', 'anomalyCaution']
  };
  
  // Audio effects with proper options
  const transitionSound = useAudio('/sounds/glitch-transition.mp3', { volume: 0.5 });
  const buttonClickSound = useAudio('/sounds/button-click.mp3', { volume: 0.3 });
  const spaceEngineSound = useAudio('/sounds/space-engine.mp3', { volume: 0.2, loop: true });
  
  // Track mouse position for star interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Initialize the game state from the story data
  useEffect(() => {
    if (!gameStarted || !storyType) return;
    
    const storyData = storyType === 'glitchCity' ? glitchCityData : starshipData;
    
    if (storyData[currentLocation]) {
      setLocationText(storyData[currentLocation].text);
      setChoices(storyData[currentLocation].choices || []);
      
      // Check if this is a risky location
      setScreenShake(riskyLocations[storyType]?.includes(currentLocation) || false);
      
      // Handle space engine sound for starship
      if (storyType === 'starship' && gameStarted) {
        spaceEngineSound.play();
      }
      
      // Check if game has ended (no more choices)
      if (gameStarted && (!storyData[currentLocation].choices || storyData[currentLocation].choices.length === 0)) {
        handleGameEnd();
      }
    }
  }, [currentLocation, gameStarted, storyType]);
  
  // Stop engine sound when game ends
  useEffect(() => {
    if (gameEnded && storyType === 'starship') {
      spaceEngineSound.stop();
    }
    return () => {
      spaceEngineSound.stop();
    };
  }, [gameEnded, storyType]);
  
  const handleChoice = async (target: string, choiceText: string, essenceChange?: {[key: string]: number}) => {
    buttonClickSound.play();
    setIsTransitioning(true);
    await transitionSound.play();
    
    // Record this decision
    setDecisionHistory(prev => [...prev, `${currentLocation} → ${target}: ${choiceText}`]);
    
    // Update user essence if exists
    if (essenceChange) {
      setUserEssence(prev => {
        const newEssence = {...prev};
        Object.entries(essenceChange).forEach(([key, value]) => {
          newEssence[key] = (newEssence[key] || 0) + value;
        });
        return newEssence;
      });
    }
    
    // Short delay to allow transition animation
    setTimeout(() => {
      setCurrentLocation(target);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleStartGame = (type: 'glitchCity' | 'starship') => {
    setStoryType(type);
    setGameStarted(true);
    setCurrentLocation(type === 'glitchCity' ? 'download' : 'start');
    setStartTime(Date.now());
    buttonClickSound.play();
    
    // Reset essence for new games
    setUserEssence({
      harmony: 0,
      chaos: 0,
      energy: 0,
      diplomacy: 0,
      neutrality: 0,
      curiosity: 0,
      exploration: 0,
      greed: 0,
      knowledge: 0,
      progress: 0,
      risk: 0,
      strength: 0,
      isolation: 0,
      commerce: 0,
      caution: 0
    });
  };
  
  const handleGameEnd = () => {
    setGameEnded(true);
    setEndTime(Date.now());
    if (storyType === 'starship') {
      spaceEngineSound.stop();
    }
  };
  
  const handleRestart = () => {
    setCurrentLocation(storyType === 'glitchCity' ? 'download' : 'start');
    setGameEnded(false);
    setDecisionHistory([]);
    setStartTime(Date.now());
    setEndTime(null);
    buttonClickSound.play();
    
    // Reset essence for new games
    setUserEssence({
      harmony: 0,
      chaos: 0,
      energy: 0,
      diplomacy: 0,
      neutrality: 0,
      curiosity: 0,
      exploration: 0,
      greed: 0,
      knowledge: 0,
      progress: 0,
      risk: 0,
      strength: 0,
      isolation: 0,
      commerce: 0,
      caution: 0
    });
  };
  
  const handleReturnToMenu = () => {
    setGameStarted(false);
    setStoryType(null);
    setGameEnded(false);
    setDecisionHistory([]);
    setEndTime(null);
    setStartTime(null);
    buttonClickSound.play();
    spaceEngineSound.stop();
  };
  
  // Start screen UI
  if (!gameStarted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
        {storyType === 'starship' ? (
          <StarshipBackground 
            darkMode={darkMode} 
            mousePosition={mousePosition} 
          />
        ) : (
          <CityBackground darkMode={darkMode} />
        )}
        
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
          <Sun className="h-4 w-4 text-yellow-500" />
          <Switch 
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Moon className="h-4 w-4 text-blue-300" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-glitch text-neon-cyan mb-8 text-center animate-text-glow z-10">
          COSMIC TALES
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
      {storyType === 'starship' ? (
        <StarshipBackground 
          darkMode={darkMode} 
          triggerAnimation={isTransitioning} 
          shake={screenShake} 
          currentLocation={currentLocation}
          mousePosition={mousePosition}
        />
      ) : (
        <CityBackground 
          darkMode={darkMode} 
          triggerAnimation={isTransitioning} 
          shake={screenShake} 
          currentLocation={currentLocation}
        />
      )}
      
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
              <span className={`text-xs font-cyber ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                LOCATION:/{currentLocation}/
              </span>
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
            onReturnToMenu={handleReturnToMenu}
            darkMode={darkMode}
            userEssence={storyType === 'starship' ? userEssence : undefined}
          />
        ) : choices.length > 0 ? (
          <div className="flex flex-col items-center w-full space-y-4">
            {choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                text={choice.text}
                onClick={() => handleChoice(choice.target, choice.text, choice.essenceChange)}
                description={choice.description}
                variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className={`${darkMode ? 'text-white/70' : 'text-black/70'} mb-4`}>THE END</p>
            <div className="space-x-4">
              <ChoiceButton 
                text="START OVER" 
                onClick={handleRestart}
                variant="secondary"
              />
              <ChoiceButton 
                text="RETURN TO MENU" 
                onClick={handleReturnToMenu}
                variant="accent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
