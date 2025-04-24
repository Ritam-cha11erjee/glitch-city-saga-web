
interface Choice {
  text: string;
  target: string;
  essenceChange?: {
    [key: string]: number;
  };
  description?: string;
}

interface StoryLocation {
  text: string;
  choices: Choice[];
  visualState?: {
    color: string;
    energyFlow: string;
    background: string;
  };
}

interface StoryDataType {
  [key: string]: StoryLocation;
}

const starshipData: StoryDataType = {
  start: {
    text: "You are the Conductor of the 'Aetheria', a starship on its first trip. Your choices will change the ship and how you meet other beings in space.  You are in space. What do you do first?",
    choices: [
      {
        text: "Make Ship Ready",
        target: "harmonize",
        essenceChange: { harmony: 1, energy: -5 },
        description: "Make the ship's core stable.",
      },
      {
        text: "Go Explore",
        target: "explore",
        essenceChange: { chaos: 1, energy: 10 },
        description: "Go into the unknown.",
      },
    ],
    visualState: {
      color: "blue",
      energyFlow: "steady",
      background: "nebula",
    },
  },
  harmonize: {
    text: "You make the Aetheria's core stable. A smooth blue energy flows in the ship. The ship hums quietly. You get a signal from the Ky'thari nearby.",
    choices: [
      {
        text: "Offer peace",
        target: "kythariPeace",
        essenceChange: { harmony: 2, diplomacy: 1 },
        description: "Show you want to be friends.",
      },
      {
        text: "Send a probe",
        target: "kythariExplore",
        essenceChange: { neutrality: 1, curiosity: 1 },
        description: "Get more info first.",
      },
    ],
    visualState: {
      color: "blue",
      energyFlow: "flowing",
      background: "nebula",
    },
  },
  explore: {
    text: "You use the impulse drive and move fast. The Aetheria vibrates with energy. You find a new star system – the Xylosian Verge.",
    choices: [
      {
        text: "Go to Xylos",
        target: "xylosDiplomacy",
        essenceChange: { chaos: 1, exploration: 1 },
        description: "Enter the system and meet them.",
      },
      {
        text: "Scan for stuff",
        target: "xylosResources",
        essenceChange: { neutrality: 1, greed: 1 },
        description: "Look for valuable things.",
      },
    ],
    visualState: {
      color: "purple",
      energyFlow: "surging",
      background: "uncharted",
    },
  },
  kythariPeace: {
    text: "The Ky'thari like your peace offering. Their forms match your ship's energy. They offer knowledge of old paths.",
    choices: [
      {
        text: "Take their help",
        target: "ancientPathways",
        essenceChange: { harmony: 1, knowledge: 2 },
        description: "Follow the path.",
      },
      {
        text: "Trade tech",
        target: "kythariTech",
        essenceChange: { neutrality: 1, progress: 1 },
        description: "Share technology.",
      },
    ],
    visualState: {
      color: "green",
      energyFlow: "flowing",
      background: "kythari",
    },
  },
  kythariExplore: {
    text: "The Ky'thari are unsure about your probe. They give little info, their forms dimming a bit. You learn of something strange nearby.",
    choices: [
      {
        text: "Check anomaly",
        target: "anomaly",
        essenceChange: { curiosity: 2, risk: 1 },
        description: "Explore the unknown.",
      },
      {
        text: "Keep going",
        target: "explore",
        essenceChange: { exploration: 1, neutrality: 1 },
        description: "Move on.",
      },
    ],
    visualState: {
      color: "blue",
      energyFlow: "pulsing",
      background: "kythari",
    },
  },
  xylosDiplomacy: {
    text: "The Xylosians, beings of metal, are interested in you. They like strength. They want to test your ship's power.",
    choices: [
      {
        text: "Accept test",
        target: "xylosChallenge",
        essenceChange: { chaos: 2, strength: 2 },
        description: "Show your ship's power.",
      },
      {
        text: "Show peaceful power",
        target: "xylosPeaceful",
        essenceChange: { harmony: 1, diplomacy: 1 },
        description: "Show a controlled display.",
      },
    ],
    visualState: {
      color: "red",
      energyFlow: "surging",
      background: "xylos",
    },
  },
  xylosResources: {
    text: "The Xylosians let you take resources, but are not friendly. You get materials, but miss making friends.",
    choices: [
      {
        text: "Leave Xylos",
        target: "leaveXylos",
        essenceChange: { greed: 1, isolation: 1 },
        description: "Depart.",
      },
      {
        text: "Try to trade",
        target: "xylosTrade",
        essenceChange: { neutrality: 1, commerce: 1 },
        description: "Try to improve relations.",
      },
    ],
    visualState: {
      color: "orange",
      energyFlow: "uneven",
      background: "xylos",
    },
  },
  ancientPathways: {
    text: "The Ky'thari guide you through old paths, showing hidden routes and wonders. The Aetheria gains new abilities. You feel connected to the galaxy.",
    choices: [],
    visualState: {
      color: "teal",
      energyFlow: "flowing",
      background: "ancient",
    },
  },
  kythariTech: {
    text: "You trade tech with the Ky'thari, improving both your ship and them. You become strong allies. The Aetheria becomes more efficient.",
    choices: [],
    visualState: {
      color: "green",
      energyFlow: "harmonious",
      background: "kythari",
    },
  },
  anomaly: {
    text: "You investigate the anomaly. It's a strange area in space and time, with wild energy. Do you go carefully, or try to use its power?",
    choices: [
      { 
        text: "Go slowly", 
        target: "anomalyCaution", 
        essenceChange: { neutrality: 2, caution: 2 },
        description: "Proceed with caution."
      },
      { 
        text: "Use power", 
        target: "anomalyPower", 
        essenceChange: { chaos: 3, risk: 3 },
        description: "Harness the anomaly's energy."
      },
    ],
    visualState: { 
      color: "purple", 
      energyFlow: "erratic", 
      background: "anomaly" 
    }
  },
  anomalyCaution: {
    text: "You go through the anomaly carefully. The Aetheria is shaken by the energy, but is okay. You get data, but don't use the anomaly's full power.",
    choices: [],
    visualState: { 
      color: "blue", 
      energyFlow: "stable", 
      background: "anomaly" 
    }
  },
  anomalyPower: {
    text: "You try to use the anomaly's power. The Aetheria gets a lot of energy, becoming very powerful, but unstable. You risk destroying the ship, but gain a lot of power.",
    choices: [],
    visualState: { 
      color: "red", 
      energyFlow: "overload", 
      background: "anomaly" 
    }
  },
  xylosChallenge: {
    text: "You accept the Xylosian challenge. The Aetheria shows its power. You earn their respect. They offer help and weapons.",
    choices: [],
    visualState: { 
      color: "red", 
      energyFlow: "surging", 
      background: "xylosCombat" 
    }
  },
  xylosPeaceful: {
    text: "You show controlled power. The Aetheria displays a beautiful, smooth show, showing both strength and control. The Xylosians are impressed by your control and wisdom. They offer help and share their tech.",
    choices: [],
    visualState: { 
      color: "blue", 
      energyFlow: "controlled", 
      background: "xylosPeace" 
    }
  },
  leaveXylos: {
    text: "You leave Xylos with the resources, but without making friends. The Aetheria feels alone. You keep going, but regret the missed chance.",
    choices: [],
    visualState: { 
      color: "orange", 
      energyFlow: "stagnant", 
      background: "xylos" 
    }
  },
  xylosTrade: {
    text: "You trade with the Xylosians, making a good relationship. The Aetheria is improved by the new tech. You continue your journey with a new ally.",
    choices: [],
    visualState: { 
      color: "green", 
      energyFlow: "balanced", 
      background: "xylosTrade" 
    }
  }
};

export default starshipData;
