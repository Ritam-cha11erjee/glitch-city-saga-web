import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ChoiceButton from './ChoiceButton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface DecisionAnalysisProps {
  decisions: string[];
  startTime: number;
  endTime: number;
  finalLocation: string;
  onRestart: () => void;
  onReturnToMenu?: () => void;
  darkMode: boolean;
  userEssence?: {[key: string]: number};
}

const DecisionAnalysis: React.FC<DecisionAnalysisProps> = ({
  decisions,
  startTime,
  endTime,
  finalLocation,
  onRestart,
  onReturnToMenu,
  darkMode,
  userEssence
}) => {
  // Calculate metrics
  const timeTaken = Math.floor((endTime - startTime) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  
  // Calculate personality traits based on decisions
  const riskScore = calculateRiskScore(decisions, userEssence);
  const diplomacyScore = calculateDiplomacyScore(decisions, userEssence);
  const explorationScore = calculateExplorationScore(decisions, userEssence);
  
  // Create chart data
  const chartData = {
    labels: ['Risk Taking', 'Diplomacy', 'Exploration'],
    datasets: [
      {
        label: 'Your Score',
        data: [riskScore, diplomacyScore, explorationScore],
        backgroundColor: darkMode 
          ? ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']
          : ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
        borderColor: darkMode
          ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)']
          : ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: darkMode ? '#aaa' : '#333',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#aaa' : '#333',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <Card className={`w-full ${darkMode ? 'bg-black/70 text-white' : 'bg-white/90 text-black'} backdrop-blur-md border-primary/30`}>
      <CardHeader>
        <CardTitle className="text-2xl text-center font-glitch">Decision Analysis</CardTitle>
        <CardDescription className={darkMode ? "text-white/60" : "text-black/60"}>
          Your journey ended at: {finalLocation}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Journey Stats</h3>
            <p>Time taken: {minutes}m {seconds}s</p>
            <p>Decisions made: {decisions.length}</p>
            <p>Ending: {getFinalAssessment(finalLocation)}</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Your Traits</h3>
            <p>Risk Taking: {getRiskAssessment(riskScore)}</p>
            <p>Diplomacy: {getDiplomacyAssessment(diplomacyScore)}</p>
            <p>Exploration: {getExplorationAssessment(explorationScore)}</p>
          </div>
        </div>
        
        <AspectRatio ratio={16/9} className="mt-4 bg-primary/5 rounded-lg p-2">
          <div className="w-full h-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </AspectRatio>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Key Decisions</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {decisions.map((decision, index) => (
              <li key={index} className={darkMode ? "text-white/80" : "text-black/80"}>
                {decision}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-center space-x-4 pt-4">
          <ChoiceButton 
            text="START OVER" 
            onClick={onRestart} 
            variant="secondary"
          />
          {onReturnToMenu && (
            <ChoiceButton 
              text="RETURN TO MENU" 
              onClick={onReturnToMenu}
              variant="accent"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

function calculateRiskScore(decisions: string[], userEssence?: {[key: string]: number}): number {
  if (userEssence) {
    const riskValue = (userEssence.risk || 0) + (userEssence.chaos || 0);
    const cautionValue = (userEssence.caution || 0) + (userEssence.harmony || 0);
    
    // Scale to 1-10
    return Math.min(10, Math.max(1, 5 + riskValue - cautionValue));
  }
  
  // For non-essence based stories
  let score = 5; // Start at neutral
  
  const riskChoices = [
    'brute force', 'fight', 'hack', 'power', 'challenge',
    'danger', 'risky', 'combat', 'attack', 'infiltrate'
  ];
  const cautionChoices = [
    'careful', 'caution', 'stealth', 'peace', 'hide',
    'avoid', 'escape', 'safe', 'diplomatic', 'slow'
  ];
  
  decisions.forEach(decision => {
    const lowerDecision = decision.toLowerCase();
    riskChoices.forEach(term => {
      if (lowerDecision.includes(term)) score += 1;
    });
    cautionChoices.forEach(term => {
      if (lowerDecision.includes(term)) score -= 1;
    });
  });
  
  return Math.min(10, Math.max(1, score)); // Ensure score is between 1 and 10
}

function calculateDiplomacyScore(decisions: string[], userEssence?: {[key: string]: number}): number {
  if (userEssence) {
    const diplomacyValue = (userEssence.diplomacy || 0) + (userEssence.harmony || 0) + (userEssence.commerce || 0);
    const conflictValue = (userEssence.chaos || 0) + (userEssence.isolation || 0);
    
    // Scale to 1-10
    return Math.min(10, Math.max(1, 5 + diplomacyValue - conflictValue));
  }
  
  // For non-essence based stories
  let score = 5; // Start at neutral
  
  const diplomacyChoices = [
    'peace', 'talk', 'ally', 'friend', 'cooperate', 
    'negotiate', 'help', 'assist', 'support', 'trade'
  ];
  const conflictChoices = [
    'attack', 'fight', 'refuse', 'reject', 'destroy',
    'sabotage', 'betray', 'alone', 'solo', 'isolate'
  ];
  
  decisions.forEach(decision => {
    const lowerDecision = decision.toLowerCase();
    diplomacyChoices.forEach(term => {
      if (lowerDecision.includes(term)) score += 1;
    });
    conflictChoices.forEach(term => {
      if (lowerDecision.includes(term)) score -= 1;
    });
  });
  
  return Math.min(10, Math.max(1, score)); // Ensure score is between 1 and 10
}

function calculateExplorationScore(decisions: string[], userEssence?: {[key: string]: number}): number {
  if (userEssence) {
    const explorationValue = (userEssence.exploration || 0) + (userEssence.curiosity || 0) + (userEssence.knowledge || 0);
    const cautiousValue = (userEssence.caution || 0);
    
    // Scale to 1-10
    return Math.min(10, Math.max(1, 5 + explorationValue - cautiousValue));
  }
  
  // For non-essence based stories
  let score = 5; // Start at neutral
  
  const explorationChoices = [
    'explore', 'discover', 'investigate', 'search', 'find',
    'seek', 'learn', 'journey', 'venture', 'curiosity'
  ];
  const avoidanceChoices = [
    'stay', 'remain', 'avoid', 'hide', 'back',
    'leave', 'escape', 'retreat', 'ignore', 'reject'
  ];
  
  decisions.forEach(decision => {
    const lowerDecision = decision.toLowerCase();
    explorationChoices.forEach(term => {
      if (lowerDecision.includes(term)) score += 1;
    });
    avoidanceChoices.forEach(term => {
      if (lowerDecision.includes(term)) score -= 1;
    });
  });
  
  return Math.min(10, Math.max(1, score)); // Ensure score is between 1 and 10
}

function getRiskAssessment(score: number): string {
  if (score >= 9) return "Extremely Bold";
  if (score >= 7) return "Risk Taker";
  if (score >= 5) return "Balanced";
  if (score >= 3) return "Cautious";
  return "Very Conservative";
}

function getDiplomacyAssessment(score: number): string {
  if (score >= 9) return "Natural Leader";
  if (score >= 7) return "Diplomatic";
  if (score >= 5) return "Reasonable";
  if (score >= 3) return "Independent";
  return "Lone Wolf";
}

function getExplorationAssessment(score: number): string {
  if (score >= 9) return "Pioneer";
  if (score >= 7) return "Adventurous";
  if (score >= 5) return "Curious";
  if (score >= 3) return "Methodical";
  return "Hesitant";
}

function getFinalAssessment(finalLocation: string): string {
  // Specific endings for starship story
  if (['ancientPathways', 'kythariTech'].includes(finalLocation)) {
    return "Alliance & Discovery";
  }
  if (['anomalyPower', 'xylosChallenge'].includes(finalLocation)) {
    return "Power & Risk";
  }
  if (['anomalyCaution', 'xylosPeaceful'].includes(finalLocation)) {
    return "Wisdom & Balance";
  }
  if (['leaveXylos'].includes(finalLocation)) {
    return "Isolation & Regret";
  }
  if (['xylosTrade'].includes(finalLocation)) {
    return "Trade & Progress";
  }
  
  // Glitch City specific endings
  if (['succeedGlitchMob', 'succeedIntel', 'leadRaid'].includes(finalLocation)) {
    return "Revolutionary Hero";
  }
  if (['failGlitchMob', 'failIntel'].includes(finalLocation)) {
    return "Captured Rebel";
  }
  if (['destroyCity'].includes(finalLocation)) {
    return "Destroyer";
  }
  if (['controlEntity'].includes(finalLocation)) {
    return "Digital Architect";
  }
  if (['continueAlone'].includes(finalLocation)) {
    return "Silent Guardian";
  }
  if (['embraceSystem'].includes(finalLocation)) {
    return "System Lord";
  }
  
  return "Story Complete";
}

export default DecisionAnalysis;
