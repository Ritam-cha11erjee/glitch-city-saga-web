
import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  
  const ambientAudio = useAudio('/sounds/ambient-cyberpunk.mp3', { 
    loop: true, 
    volume: isMuted ? 0 : 0.3,
    autoplay: true 
  });

  useEffect(() => {
    if (ambientAudio.audio) {
      ambientAudio.audio.volume = isMuted ? 0 : 0.3;
    }
  }, [isMuted, ambientAudio.audio]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMute} 
        className="bg-muted/30 backdrop-blur-sm hover:bg-muted/50 text-foreground rounded-full w-10 h-10 flex items-center justify-center"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default AudioControls;
