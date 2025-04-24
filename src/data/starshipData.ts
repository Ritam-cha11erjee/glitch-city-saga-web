
interface Choice {
  text: string;
  target: string;
  essenceChange?: {
    [key: string]: number;
  };
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
    text: "You are the Conductor of the 'Aetheria', a starship on its first voyage through the cosmos. Your choices will determine the ship's capabilities and how you interact with other beings in space. You are in deep space. What will you do first?",
    choices: [
      {
        text: "Stabilize Ship Systems",
        target: "harmonize",
        essenceChange: { harmony: 1, energy: -5 },
      },
      {
        text: "Explore The Unknown",
        target: "explore",
        essenceChange: { chaos: 1, energy: 10 },
      },
    ],
    visualState: {
      color: "blue",
      energyFlow: "steady",
      background: "nebula",
    },
  },
  harmonize: {
    text: "You harmonize the Aetheria's core systems. A smooth blue energy flows through the ship. The vessel hums quietly with balanced power. You detect a signal from the Ky'thari civilization nearby.",
    choices: [
      {
        text: "Extend Peace Offering",
        target: "kythariPeace",
        essenceChange: { harmony: 2, diplomacy: 1 },
      },
      {
        text: "Send Reconnaissance Probe",
        target: "kythariExplore",
        essenceChange: { neutrality: 1, curiosity: 1 },
      },
    ],
    visualState: {
      color: "blue",
      energyFlow: "flowing",
      background: "nebula",
    },
  },
  explore: {
    text: "You engage the impulse drive and surge forward into uncharted space. The Aetheria vibrates with raw energy. Soon you discover a new star system – the Xylosian Verge, shimmering with possibilities.",
    choices: [
      {
        text: "Enter Xylosian Space",
        target: "xylosDiplomacy",
        essenceChange: { chaos: 1, exploration: 1 },
      },
      {
        text: "Scan For Resources",
        target: "xylosResources",
        essenceChange: { neutrality: 1, greed: 1 },
      },
    ],
    visualState: {
      color: "purple",
      energyFlow: "surging",
      background: "uncharted",
    },
  },
  kythariPeace: {
    text: "The Ky'thari respond favorably to your peace offering. Their crystalline forms resonate with your ship's energy signature. They offer knowledge of ancient cosmic pathways known only to their kind.",
    choices: [
      {
        text: "Accept Their Guidance",
        target: "ancientPathways",
        essenceChange: { harmony: 1, knowledge: 2 },
      },
      {
        text: "Exchange Technologies",
        target: "kythariTech",
        essenceChange: { neutrality: 1, progress: 1 },
      },
    ],
    visualState: {
      color: "green",
      energyFlow: "flowing",
      background: "kythari",
    },
  },
  kythariExplore: {
    text: "The Ky'thari react with caution to your probe. Their crystalline forms dim slightly as they share limited information. Your sensors detect an unusual spacetime anomaly in a nearby sector.",
    choices: [
      {
        text: "Investigate Anomaly",
        target: "anomaly",
        essenceChange: { curiosity: 2, risk: 1 },
      },
      {
        text: "Continue Exploration",
        target: "explore",
        essenceChange: { exploration: 1, neutrality: 1 },
      },
    ],
    visualState: {
      color: "blue",
      energyFlow: "pulsing",
      background: "kythari",
    },
  },
  xylosDiplomacy: {
    text: "The Xylosians, sentient metallic beings, observe your approach with interest. They value strength and capability above all. Their leader challenges you to demonstrate your ship's power in a controlled display.",
    choices: [
      {
        text: "Accept Challenge",
        target: "xylosChallenge",
        essenceChange: { chaos: 2, strength: 2 },
      },
      {
        text: "Demonstrate Peaceful Power",
        target: "xylosPeaceful",
        essenceChange: { harmony: 1, diplomacy: 1 },
      },
    ],
    visualState: {
      color: "red",
      energyFlow: "surging",
      background: "xylos",
    },
  },
  xylosResources: {
    text: "The Xylosians permit your resource gathering but remain distant. You extract valuable materials from their system's outer reaches, but miss an opportunity to forge a meaningful connection.",
    choices: [
      {
        text: "Depart With Resources",
        target: "leaveXylos",
        essenceChange: { greed: 1, isolation: 1 },
      },
      {
        text: "Initiate Trade Relations",
        target: "xylosTrade",
        essenceChange: { neutrality: 1, commerce: 1 },
      },
    ],
    visualState: {
      color: "orange",
      energyFlow: "uneven",
      background: "xylos",
    },
  },
  ancientPathways: {
    text: "The Ky'thari guide you through hidden cosmic pathways, revealing wonders beyond imagination. The Aetheria gains new navigational capabilities and your understanding of space expands. You feel deeply connected to the galactic tapestry.",
    choices: [],
    visualState: {
      color: "teal",
      energyFlow: "flowing",
      background: "ancient",
    },
  },
  kythariTech: {
    text: "Your technological exchange with the Ky'thari benefits both civilizations. The Aetheria's systems evolve in unexpected ways while you share Earth's scientific achievements. You've made powerful allies in this vast cosmos.",
    choices: [],
    visualState: {
      color: "green",
      energyFlow: "harmonious",
      background: "kythari",
    },
  },
    anomaly: {
    text: "You approach the spacetime anomaly with caution. It pulses with chaotic energy, warping reality around your ship. Sensors indicate immense power that could either enhance your systems or tear them apart. How will you proceed?",
    choices: [
      { 
        text: "Proceed With Caution", 
        target: "anomalyCaution", 
        essenceChange: { neutrality: 2, caution: 2 }
      },
      { 
        text: "Harness The Energy", 
        target: "anomalyPower", 
        essenceChange: { chaos: 3, risk: 3 }
      },
    ],
    visualState: { 
      color: "purple", 
      energyFlow: "erratic", 
      background: "anomaly" 
    }
  },
  anomalyCaution: {
    text: "You navigate the anomaly with careful precision. The Aetheria shudders as strange energies wash over its hull, but your cautious approach preserves its integrity. You gather valuable data but leave the anomaly's full potential untapped.",
    choices: [],
    visualState: { 
      color: "blue", 
      energyFlow: "stable", 
      background: "anomaly" 
    }
  },
  anomalyPower: {
    text: "You direct the Aetheria into the heart of the anomaly. Energy cascades through your systems as reality bends around you. The ship trembles at the edge of destruction but emerges transformed, crackling with power unlike anything humans have wielded before.",
    choices: [],
    visualState: { 
      color: "red", 
      energyFlow: "overload", 
      background: "anomaly" 
    }
  },
  xylosChallenge: {
    text: "The Aetheria's systems surge to full capacity in an impressive display of firepower and technological prowess. The Xylosians observe with growing respect. Your successful demonstration earns their allegiance and access to their advanced weaponry.",
    choices: [],
    visualState: { 
      color: "red", 
      energyFlow: "surging", 
      background: "xylosCombat" 
    }
  },
  xylosPeaceful: {
    text: "You orchestrate a harmonious display of the Aetheria's capabilities, demonstrating both power and precise control. The Xylosians admire your discipline and wisdom. They offer alliance and share their technological insights with your crew.",
    choices: [],
    visualState: { 
      color: "blue", 
      energyFlow: "controlled", 
      background: "xylosPeace" 
    }
  },
  leaveXylos: {
    text: "You depart from Xylosian space with valuable resources but no diplomatic connection. The Aetheria continues its journey in solitude. As stars streak by, you wonder about the alliance that might have been.",
    choices: [],
    visualState: { 
      color: "orange", 
      energyFlow: "stagnant", 
      background: "xylos" 
    }
  },
  xylosTrade: {
    text: "You establish trade relations with the Xylosians, exchanging resources for technological insights. The Aetheria is upgraded with their advanced metallurgical techniques. Your diplomatic success ensures a valuable ally in this sector of space.",
    choices: [],
    visualState: { 
      color: "green", 
      energyFlow: "balanced", 
      background: "xylosTrade" 
    }
  }
};

export default starshipData;
