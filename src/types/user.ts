
export interface UserEssence {
  harmony: number;
  chaos: number;
  energy: number;
  diplomacy: number;
  neutrality: number;
  curiosity: number;
  exploration: number;
  greed: number;
  knowledge: number;
  progress: number;
  risk: number;
  strength: number;
  isolation: number;
  commerce: number;
  caution: number;
  [key: string]: number;
}

export interface User {
  name: string;
  avatar: string | null;
  chaptersCompleted: number;
  storiesStarted: number;
  averageCompletionTime: number; // in seconds
  essence: UserEssence;
  lastPlayed?: {
    storyType: string;
    location: string;
    timestamp: number;
  };
}
