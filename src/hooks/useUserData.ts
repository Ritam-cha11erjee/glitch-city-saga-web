
import { useState, useEffect } from 'react';
import { User, UserEssence } from '../types/user';

const DEFAULT_USER: User = {
  name: 'Player',
  avatar: null,
  chaptersCompleted: 0,
  storiesStarted: 0,
  averageCompletionTime: 0,
  essence: {
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
  }
};

export const useUserData = () => {
  const [userData, setUserData] = useState<User>(DEFAULT_USER);
  const [loaded, setLoaded] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('cosmic_tales_user_data');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoaded(true);
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('cosmic_tales_user_data', JSON.stringify(userData));
    }
  }, [userData, loaded]);

  const updateUserData = (data: Partial<User>) => {
    setUserData(prev => {
      // For essence, we properly merge the values instead of replacing
      const updatedEssence = { ...prev.essence };
      
      if (data.essence) {
        Object.entries(data.essence).forEach(([key, value]) => {
          // For each key, we're updating the ongoing average
          const currentValue = updatedEssence[key] || 0;
          const chapterCount = prev.chaptersCompleted || 1;
          
          // Calculate the new running average for each trait
          updatedEssence[key] = (currentValue * chapterCount + value) / (chapterCount + 1);
        });
      }
      
      return {
        ...prev,
        ...data,
        essence: updatedEssence
      };
    });
  };

  const recordGameCompletion = (storyType: string, completionTime: number) => {
    setUserData(prev => {
      const newChaptersCompleted = prev.chaptersCompleted + 1;
      const totalTime = prev.averageCompletionTime * prev.chaptersCompleted + completionTime;
      const newAverageTime = Math.round(totalTime / newChaptersCompleted);
      
      return {
        ...prev,
        chaptersCompleted: newChaptersCompleted,
        averageCompletionTime: newAverageTime,
        lastPlayed: {
          storyType,
          location: 'completed',
          timestamp: Date.now()
        }
      };
    });
  };

  const recordGameStart = (storyType: string, location: string) => {
    setUserData(prev => ({
      ...prev,
      storiesStarted: prev.storiesStarted + 1,
      lastPlayed: {
        storyType,
        location,
        timestamp: Date.now()
      }
    }));
  };

  return {
    userData,
    updateUserData,
    recordGameCompletion,
    recordGameStart
  };
};
