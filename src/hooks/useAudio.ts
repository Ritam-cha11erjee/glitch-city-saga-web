
import { useEffect, useRef, useState } from 'react';

interface UseAudioOptions {
  loop?: boolean;
  volume?: number;
  autoplay?: boolean;
}

export function useAudio(src: string, options: UseAudioOptions = {}) {
  const { loop = false, volume = 1, autoplay = false } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.loop = loop;
    audio.volume = volume;
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      if (autoplay) {
        play();
      }
    });
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });
    };
  }, [src, loop, volume, autoplay]);

  const play = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    play,
    pause,
    toggle,
    isPlaying,
    isLoaded,
    audio: audioRef.current,
  };
}
