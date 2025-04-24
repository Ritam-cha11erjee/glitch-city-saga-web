
import { useEffect, useState } from 'react';
import ChoiceButton from './ChoiceButton';

interface DecisionAnalysisProps {
  decisions: string[];
  startTime: number;
  endTime: number;
  finalLocation: string;
  onRestart: () => void;
  darkMode: boolean;
}

const DecisionAnalysis: React.FC<DecisionAnalysisProps> = ({ 
  decisions, 
  startTime, 
  endTime,
  finalLocation,
  onRestart,
  darkMode
}) => {
  const [analysis, setAnalysis] = useState({
    bravery: 0,
    strategic: 0,
    impulsive: 0,
    chaotic: 0,
    completion: 0
  });
  
  useEffect(() => {
    // Analyze decisions
    let braveryScore = 50; // Base score
    let strategicScore = 50;
    let impulsiveScore = 50;
    let chaoticScore = 50;
    
    // Decisions that increase bravery
    const braveryDecisions = [
      'missionAccept', 'infiltrateHub', 'leadRaid', 'rebellionEvent', 
      'disruptSystem', 'destroyCity', 'succeedGlitchMob'
    ];
    
    // Decisions that increase strategic thinking
    const strategicDecisions = [
      'investigate', 'systemLordsAccept', 'continueDeception', 
      'secretResistanceSystem', 'provideIntel', 'keepKnowledge'
    ];
    
    // Decisions that indicate impulsiveness
    const impulsiveDecisions = [
      'firstContact', 'failGlitchMob', 'exploreCityRefuse', 'carryOutTask'
    ];
    
    // Decisions that indicate chaos/rebelliousness
    const chaoticDecisions = [
      'glitchMob', 'sabotageTask', 'contactGlitchMobSecretly', 
      'rebellionEvent', 'shareKnowledge'
    ];
    
    // Analyze each decision
    decisions.forEach(decision => {
      const parts = decision.split('→');
      if (parts.length >= 2) {
        const target = parts[1].split(':')[0].trim();
        
        if (braveryDecisions.includes(target)) braveryScore += 10;
        if (strategicDecisions.includes(target)) strategicScore += 10;
        if (impulsiveDecisions.includes(target)) impulsiveScore += 10;
        if (chaoticDecisions.includes(target)) chaoticScore += 10;
      }
    });
    
    // Calculate completion percentage based on number of decisions
    // Assuming maximum path length is about 8 decisions
    const completionScore = Math.min(100, Math.round((decisions.length / 8) * 100));
    
    // Cap scores at 100
    braveryScore = Math.min(100, braveryScore);
    strategicScore = Math.min(100, strategicScore);
    impulsiveScore = Math.min(100, impulsiveScore);
    chaoticScore = Math.min(100, chaoticScore);
    
    setAnalysis({
      bravery: braveryScore,
      strategic: strategicScore,
      impulsive: impulsiveScore,
      chaotic: chaoticScore,
      completion: completionScore
    });
  }, [decisions, finalLocation]);
  
  // Calculate time taken
  const timeTaken = Math.floor((endTime - startTime) / 1000);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minute${mins !== 1 ? 's' : ''} and ${secs} second${secs !== 1 ? 's' : ''}`;
  };
  
  return (
    <div className={`${darkMode ? 'bg-black/70' : 'bg-white/80'} backdrop-blur-md p-6 rounded-lg border ${darkMode ? 'border-neon-cyan/30' : 'border-gray-300'} w-full max-w-lg mx-auto`}>
      <h2 className={`text-2xl font-glitch mb-4 text-center ${darkMode ? 'text-neon-cyan' : 'text-blue-600'}`}>
        Decision Analysis
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <h3 className={`text-lg font-cyber mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Time Taken</h3>
          <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>{formatTime(timeTaken)}</p>
        </div>
        
        <div>
          <h3 className={`text-lg font-cyber mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Your Journey</h3>
          <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>
            You made {decisions.length} decision{decisions.length !== 1 ? 's' : ''}.
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className={`text-lg font-cyber mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Your Traits</h3>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={darkMode ? 'text-neon-cyan' : 'text-blue-600'}>Bravery</span>
              <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>{analysis.bravery}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-neon-cyan h-2 rounded-full" 
                style={{ width: `${analysis.bravery}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={darkMode ? 'text-neon-magenta' : 'text-purple-600'}>Strategic</span>
              <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>{analysis.strategic}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-neon-magenta h-2 rounded-full" 
                style={{ width: `${analysis.strategic}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={darkMode ? 'text-neon-yellow' : 'text-yellow-600'}>Impulsive</span>
              <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>{analysis.impulsive}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-neon-yellow h-2 rounded-full" 
                style={{ width: `${analysis.impulsive}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={darkMode ? 'text-red-400' : 'text-red-600'}>Chaotic</span>
              <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>{analysis.chaotic}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full" 
                style={{ width: `${analysis.chaotic}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={darkMode ? 'text-green-400' : 'text-green-600'}>Story Completion</span>
              <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>{analysis.completion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full" 
                style={{ width: `${analysis.completion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <ChoiceButton 
          text="PLAY AGAIN" 
          onClick={onRestart}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default DecisionAnalysis;
