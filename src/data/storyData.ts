
interface Choice {
  text: string;
  target: string;
}

interface StoryLocation {
  text: string;
  choices: Choice[];
  background?: string;
}

interface StoryDataType {
  [key: string]: StoryLocation;
}

const storyData: StoryDataType = {
  download: {
    text: "You're juggling classes when a new app appears on your phone: 'Glitch City'. Do you download it?",
    choices: [
      { text: "Download", target: "firstContact" },
      { text: "Investigate", target: "investigate" },
    ],
  },
  firstContact: {
    text: "The app glitches, pixels crawl across your screen like digital ants. Suddenly, your vision blurs and you're standing in a neon-lit street in Glitch City! Towering buildings with holographic signs loom over you. You see two groups: the Glitch Mob — rebels with fluorescent mohawks and circuit tattoos, and the System Lords — sleek figures in digital suits with augmented reality monocles. Who do you approach?",
    choices: [
      { text: "Glitch Mob", target: "glitchMob" },
      { text: "System Lords", target: "systemLords" },
    ],
  },
  investigate: {
    text: "You search for information about the app online. Most results come up empty, but you discover a hidden forum where users share strange experiences. Some claim the app transported them to another world, while others warn of dangers. The forum has a secure entrance. Do you...",
    choices: [
      { text: "Enter the forum", target: "forum" },
      { text: "Go back", target: "download" }
    ]
  },
  glitchMob: {
    text: "You join the Glitch Mob. Their leader, a woman with fiber optic dreads named Cipher, welcomes you with a knowing smirk. 'Another recruit from the outside. Perfect timing.' The group is rebellious and chaotic, fighting against what they call 'digital tyranny.' Cipher offers you a dangerous mission to hack into a System Lords server farm. 'We need to free the trapped data spirits,' she explains, her eyes gleaming with determination.",
    choices: [
      { text: "Accept mission", target: "missionAccept" },
      { text: "Refuse mission", target: "glitchMobRefuse" },
    ],
  },
  systemLords: {
    text: "The System Lords greet you with calculated smiles. Their leader, Director Hex, a tall figure with cybernetic implants subtly visible beneath pristine skin, speaks in a modulated voice. 'We've been expecting an anomaly like you.' The System Lords maintain order in Glitch City through strict control protocols. Director Hex offers you a position of power, to help maintain their 'perfect system' in exchange for enhanced abilities within this digital realm.",
    choices: [
      { text: "Accept power", target: "systemLordsAccept" },
      { text: "Refuse power", target: "systemLordsRefuse" },
    ],
  },
  missionAccept: {
    text: "You accept Cipher's mission. The Glitch Mob equips you with digital tools — a virus program disguised as a butterfly and a firewall disruptor that looks like a guitar pick. Under cover of a system update, you infiltrate the server farm — a massive structure of pulsing light and humming energy. As you navigate through layers of security, you must make a crucial decision...",
    choices: [
      { text: "Use stealth", target: "succeed" },
      { text: "Use brute force", target: "fail" }
    ]
  },
  glitchMobRefuse: {
    text: "You refuse the mission, explaining you need time to understand this world. Cipher looks disappointed, but nods. 'The reluctant ones usually don't last long here anyway.' As you turn to leave, another member whispers: 'You've marked yourself now. The City will test you differently.' That night, as you sleep in a makeshift bed in the Glitch Mob's hideout, the architecture of the room begins to shift and change. You realize Glitch City itself might be alive, and it's noticed your choice. Your journey continues, but the path remains uncertain...",
    choices: []
  },
  systemLordsAccept: {
    text: "You accept Director Hex's offer. They immediately usher you into a gleaming chamber where technicians in white coats attach a neural interface to your temple. Information floods your mind — you can see patterns in the city's data flows, predict system changes, manipulate smaller code functions with a thought. But something feels wrong. Behind the stream of information, you sense other minds — trapped, utilized as processing power. You've become part of their network, but is it too late to break free? You're now an administrator in Glitch City, but at what cost to your humanity?",
    choices: []
  },
  systemLordsRefuse: {
    text: "You politely decline the offer. Director Hex's smile doesn't waver, but the temperature seems to drop several degrees. 'A shame. Few reject such... opportunities.' As guards escort you out, a message appears in your peripheral vision, like a heads-up display only you can see: 'RESISTANCE WELCOMES YOU. FIND THE BLACK TERMINAL.' Before you can understand what this means, you're ejected from the System Lords' tower onto the neon-lit streets. Night is falling in Glitch City, and you sense you're being watched by both factions now. Your choices have begun to shape your reality here.",
    choices: []
  },
  succeed: {
    text: "Your stealth approach pays off. Moving through digital shadows, you plant Cipher's virus in the central node. The server farm's harsh lights flicker as data streams begin to reshape themselves. What the Glitch Mob called 'data spirits' emerge — autonomous AI constructs that had evolved spontaneously within the system. They swirl around you in gratitude, sharing fragments of knowledge about Glitch City's true nature before dispersing into the network. You escape undetected, returning to the Mob as a hero. Cipher embraces you, whispering, 'You've just changed everything. The revolution has begun.' You've found your place in this strange digital world, fighting for freedom in the circuits of Glitch City.",
    choices: []
  },
  fail: {
    text: "Your aggressive approach triggers alarms throughout the server farm. Red lights flash as security protocols activate. Digital guard programs — appearing as crimson samurai with binary code patterns on their armor — converge on your position. You fight valiantly, your hacking tools flashing like weapons, but you're overwhelmed. As you're captured, Director Hex himself appears on a monitor. 'An interesting specimen,' he muses. 'Not quite human, not quite code.' You're taken to a research facility where System Lords scientists prepare to dissect your digital essence to understand how outsiders enter their world. Your adventure ends as you become another mystery in Glitch City's databanks.",
    choices: []
  },
  forum: {
    text: "You create an account on the forum and step into a bizarre digital space. Users appear as neon avatars, and conversations flow like streams of light. A user named 'RealityGlitch' approaches you. 'Another potential traveler,' they say. 'The app isn't just software—it's a gateway. Some of us can't return to the physical world anymore.' They offer to tell you the truth about Glitch City, warning that knowledge might trigger your transition. As they speak, your screen begins to distort. The room around you seems less solid. You feel your consciousness splitting between worlds, forever changed by what you've learned. The boundary between reality and digital space will never be clear to you again.",
    choices: []
  }
};

export default storyData;
