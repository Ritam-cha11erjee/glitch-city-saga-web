
import GameScreen from '@/components/GameScreen';
import AudioControls from '@/components/AudioControls';

const Index = () => {
  return (
    <div className="bg-background min-h-screen overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-background"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>

      {/* Game content */}
      <GameScreen />
      
      {/* Audio controls */}
      <AudioControls />
    </div>
  );
};

export default Index;
