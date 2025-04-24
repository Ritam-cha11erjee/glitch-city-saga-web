
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
    scene: string;
    weather: string;
    mood: string;
  };
}

interface StoryDataType {
  [key: string]: StoryLocation;
}

const roadTripData: StoryDataType = {
  start: {
    text: "You're super excited for a road trip across India! You're packed and ready to go. Your travel buddies are: your super-organized Auntie Beena; your uncle, Pappu, who is a bit of a goofball; and your cousin, Rohan, who is always glued to his phone. You pile into your car, a very old Tata Sumo that smells like old socks and has a 'Horn OK Please' sign at the back. Where do you want to go first?",
    choices: [
      {
        text: "Visit the world's largest samosa",
        target: "samosa",
        essenceChange: { exploration: 1, curiosity: 1 }
      },
      {
        text: "See the Magnetic Hill",
        target: "magneticHill",
        essenceChange: { curiosity: 2 }
      },
    ],
    visualState: {
      scene: "startingGarage",
      weather: "sunny",
      mood: "excited",
    },
  },
  samosa: {
    text: "You drive towards the World's Largest Samosa. Halfway there, the Tata Sumo starts making a strange noise. Pappu Uncle thinks it sounds like a hungry cow. Rohan is too busy with his phone to notice. Auntie Beena checks the engine and sighs. 'The radiator is leaking,' she says. 'We need to find water... and *fast*!' What do you do?",
    choices: [
      {
        text: "Stop at a nearby dhaba",
        target: "dhabaStop",
        essenceChange: { harmony: 1, caution: 1 }
      },
      {
        text: "Try to find a mechanic",
        target: "mechanicStop",
        essenceChange: { knowledge: 1, commerce: 1 }
      },
    ],
    visualState: {
      scene: "roadside",
      weather: "sunny",
      mood: "annoyed",
    },
  },
  magneticHill: {
    text: "You head to Magnetic Hill. As you get closer, the car's GPS goes crazy. It starts giving directions in Bollywood song lyrics. Rohan suggests following it; he thinks it's 'lit.' Auntie Beena wants to use a paper map. Pappu Uncle just wants to get there. What do you do?",
    choices: [
      {
        text: "Follow the Bollywood GPS",
        target: "bollywoodGPS",
        essenceChange: { chaos: 2, risk: 1 }
      },
      {
        text: "Use the paper map",
        target: "paperMap",
        essenceChange: { caution: 1, knowledge: 1 }
      },
    ],
    visualState: {
      scene: "weirdRoad",
      weather: "cloudy",
      mood: "confused",
    },
  },
  dhabaStop: {
    text: "You stop at a dhaba. The owner is a friendly Sardarji with a booming laugh. He gives you water for the radiator but then insists you join him for chai and pakoras. Auntie Beena is worried about getting delayed. Pappu Uncle is trying to learn Bhangra from the waiters. Rohan is busy capturing everything for his Insta story. What do you do?",
    choices: [
      {
        text: "Politely decline and leave",
        target: "leaveDhaba",
        essenceChange: { caution: 1 }
      },
      {
        text: "Join the chai party",
        target: "chaiParty",
        essenceChange: { harmony: 1, chaos: 1 }
      },
    ],
    visualState: {
      scene: "dhaba",
      weather: "sunny",
      mood: "silly",
    },
  },
  mechanicStop: {
    text: "You find a mechanic. He's a wizened old man with oily hands and a talent for jugaad. He fixes the radiator with some chewing gum and a coconut shell. Pappu Uncle tries to pay him with a funny poem. Rohan tries to get a WiFi password. What do you do?",
    choices: [
      {
        text: "Offer a proper payment",
        target: "properPayment",
        essenceChange: { harmony: 1, diplomacy: 1 }
      },
      {
        text: "Haggle for a better price",
        target: "hagglePayment",
        essenceChange: { commerce: 2 }
      },
    ],
    visualState: {
      scene: "mechanicShop",
      weather: "rain",
      mood: "weird",
    },
  },
  bollywoodGPS: {
    text: "You follow the Bollywood GPS. It leads you down a very bumpy, very narrow road. You end up at a dead end... which is a giant film set for a Bollywood dance sequence. Rohan wants to join the dancers. Auntie Beena is checking the car for damage. Pappu Uncle is trying to sing along. What do you do?",
    choices: [
      {
        text: "Join the dance",
        target: "bollywoodDance",
        essenceChange: { chaos: 2, energy: 1 }
      },
      {
        text: "Find a way around",
        target: "findAround",
        essenceChange: { caution: 1, knowledge: 1 }
      },
    ],
    visualState: {
      scene: "deadEnd",
      weather: "cloudy",
      mood: "playful",
    },
  },
  paperMap: {
    text: "You use the paper map. It's very old and smells like mothballs. You make good progress, but Auntie Beena realizes she forgot her reading glasses, so Pappu Uncle has to read the map... loudly... and in the style of a Bollywood movie dialogue. Rohan is live-streaming the whole thing. What do you do?",
    choices: [
      {
        text: "Enjoy the Bollywood directions",
        target: "bollywoodDirections",
        essenceChange: { chaos: 1, harmony: 1 }
      },
      {
        text: "Try to find a store for glasses",
        target: "findGlasses",
        essenceChange: { caution: 1, commerce: 1 }
      },
    ],
    visualState: {
      scene: "road",
      weather: "sunny",
      mood: "dramatic",
    },
  },
  leaveDhaba: {
    text: "You politely decline the chai party. The Sardarji waves goodbye, and the waiters look disappointed. You get back on the road, but the Tata Sumo now smells even more like spices. You finally reach the World's Largest Samosa. It's... very large. Pappu Uncle tries to take a selfie with it. Auntie Beena takes a picture for her scrapbook. Rohan makes an Insta reel with the samosa. The trip continues...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { knowledge: 1 } }],
    visualState: {
      scene: "samosa",
      weather: "sunny",
      mood: "relieved",
    },
  },
  chaiParty: {
    text: "You join the chai party. You drink chai (masala, of course) with the Sardarji and the waiters. Auntie Beena sneezes a lot from the spices. Pappu Uncle learns a new Bhangra step. Rohan gets a million views on his dhaba stories. You finally leave, hours later, with a bag of special dhaba masala as a souvenir. The trip continues...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { harmony: 2 } }],
    visualState: {
      scene: "dhaba",
      weather: "sunny",
      mood: "happy",
    },
  },
  properPayment: {
    text: "You offer the mechanic proper payment. He accepts it with a smile and gives you some tips on driving in India. You leave the garage and finally reach the Magnetic Hill. Everything is tilted and weird. Pappu Uncle tries to roll a ball uphill. Auntie Beena checks her compass repeatedly. Rohan tries to film a gravity-defying dance video. The trip continues...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { diplomacy: 1, knowledge: 1 } }],
    visualState: {
      scene: "magneticHill",
      weather: "cloudy",
      mood: "spooky",
    },
  },
  hagglePayment: {
    text: "You haggle with the mechanic for a better price. He respects your bargaining skills and gives you a discount, along with a few extra nuts and bolts. You leave the garage, feeling proud of your deal. You finally reach the Magnetic Hill. Everything is tilted and weird. Pappu Uncle tries to roll a ball uphill. Auntie Beena checks her compass repeatedly. Rohan tries to film a gravity-defying dance video. The trip continues...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { commerce: 2 } }],
    visualState: {
      scene: "magneticHill",
      weather: "cloudy",
      mood: "spooky",
    },
  },
  bollywoodDance: {
    text: "You join the Bollywood dance! It's incredibly energetic and colorful. Auntie Beena, surprisingly, is a great dancer. Pappu Uncle tries to do the 'thumka.' Rohan gets a huge number of followers on his dance video. You eventually leave, covered in glitter, and continue the trip...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { energy: 2, chaos: 1 } }],
    visualState: {
      scene: "deadEnd",
      weather: "cloudy",
      mood: "excited",
    },
  },
  findAround: {
    text: "You find a way around the Bollywood set. It involves a very narrow, very bumpy detour through a field of sunflowers. Auntie Beena gets stung by a bee. Pappu Uncle tries to befriend a scarecrow. Rohan complains about the lack of cell service. You finally get back on track and continue the trip...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { caution: 2 } }],
    visualState: {
      scene: "sunflowerField",
      weather: "sunny",
      mood: "frustrated",
    },
  },
  bollywoodDirections: {
    text: "You listen to Pappu Uncle's Bollywood directions. It's surprisingly helpful, but also very dramatic. You find a Bollywood-themed amusement park on the way. Auntie Beena buys a sari. Pappu Uncle tries to reenact a fight scene with a cardboard sword. Rohan tries to get the actors to say modern slang. You finally arrive at your destination, a bit later than planned, but with many memories...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { chaos: 1, harmony: 1 } }],
    visualState: {
      scene: "bollywoodPark",
      weather: "sunny",
      mood: "happy",
    },
  },
  findGlasses: {
    text: "You find a store to buy Auntie Beena new glasses. It's a very trendy store with tiny, expensive glasses. Auntie Beena tries on a pair that makes her look like a bug. Pappu Uncle tries on a pair that makes him look like a superhero. Rohan takes a picture of them both. You finally find a normal pair and continue the trip, with Auntie Beena able to see the map again...",
    choices: [{ text: "Continue the trip", target: "theEnd", essenceChange: { commerce: 1, knowledge: 1 } }],
    visualState: {
      scene: "glassesStore",
      weather: "sunny",
      mood: "stylish",
    },
  },
  theEnd: {
    text: "After many more silly detours and wacky events, you finally reach your destination: a giant statue of a potato... made of gold. Pappu Uncle is thrilled. Auntie Beena is exhausted. Rohan is already planning the TikTok video about the golden potato. You all agree that it was the most inconvenient, hilarious road trip ever!",
    choices: [],
    visualState: {
      scene: "potatoStatue",
      weather: "sunny",
      mood: "triumphant",
    },
  },
};

export default roadTripData;
