
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
  // Glitch Mob Branch (Complete)
  glitchMob: {
    text: "You join the Glitch Mob. Their leader, a woman with fiber optic dreads named Cipher, welcomes you with a knowing smirk. 'Another recruit from the outside. Perfect timing.' The group is rebellious and chaotic, fighting against what they call 'digital tyranny.' Cipher offers you a dangerous mission to hack into a System Lords server farm. 'We need to free the trapped data spirits,' she explains, her eyes gleaming with determination.",
    choices: [
      { text: "Accept mission", target: "missionAccept" },
      { text: "Refuse mission", target: "glitchMobRefuse" },
    ],
  },
  glitchMobRefuse: {
    text: "You refuse the mission, explaining you need time to understand this world. Cipher looks disappointed, but nods. 'The reluctant ones usually don't last long here anyway.' As you turn to leave, another member whispers: 'You've marked yourself now. The City will test you differently.' That night, as you sleep in a makeshift bed in the Glitch Mob's hideout, the architecture of the room begins to shift and change. You realize Glitch City itself might be alive, and it's noticed your choice. Your journey continues, but the path remains uncertain...",
    choices: [
      { text: "Explore Hideout", target: "exploreHideout" },
      { text: "Talk to Cipher", target: "talkToCipherRefuse" }
    ]
  },
  talkToCipherRefuse: {
    text: "You approach Cipher to explain your decision. She listens patiently, a flicker of understanding in her eyes. 'You seek knowledge before action. A rare quality here.' She offers you a different task: to gather intel on the System Lords' movements within the city. This will involve navigating the less patrolled areas of Glitch City and using your tech skills to intercept their communications.",
    choices: [
      { text: "Accept Intel Mission", target: "intelMission" },
      { text: "Explore City Alone", target: "exploreCityRefuse" }
    ]
  },
  exploreCityRefuse: {
    text: "You decide to explore Glitch City on your own, hoping to understand its secrets before committing to a side. The city is vast and disorienting. You encounter strange digital denizens, navigate shifting landscapes, and uncover cryptic clues about Glitch City's past. This path is fraught with danger, as you are alone and vulnerable, but it also offers the greatest potential for discovery. After days of exploration, you stumble upon a hidden archive, containing forbidden knowledge about the city's creation and purpose.",
    choices: [
      { text: "Enter Archive", target: "enterArchive" }
    ]
  },
  intelMission: {
    text: "You accept the intel mission. The Glitch Mob provides you with a stealth rig and a code scrambler. Your task is to infiltrate a System Lords communication hub and download their strategic plans. This mission requires careful planning and precise execution. You must avoid detection, bypass security measures, and extract the data before the System Lords become aware of your presence.",
    choices: [
      { text: "Infiltrate Communication Hub", target: "infiltrateHub" }
    ]
  },
  infiltrateHub: {
    text: "You infiltrate the communication hub. The air crackles with digital energy. You navigate through a maze of servers and data streams, your every move observed by unseen eyes. You reach the central terminal and begin the download, but suddenly, the System Lords detect your presence...",
    choices: [
      { text: "Fight your way out", target: "failIntel" },
      { text: "Complete download and escape", target: "succeedIntel" }
    ]
  },
  succeedIntel: {
    text: "You manage to complete the download and escape the communication hub just as the System Lords security forces close in. You return to the Glitch Mob with the data, becoming a valuable asset. The information you provide reveals a critical weakness in the System Lords' defenses, giving the Glitch Mob a significant advantage. This success solidifies your place within the rebellion, and you are given more important roles in the fight for Glitch City's freedom.",
    choices: [
      { text: "Lead a Raid", target: "leadRaid" }
    ]
  },
  failIntel: {
    text: "You are captured by the System Lords. They interrogate you, attempting to extract information about the Glitch Mob's plans. Despite their advanced techniques, you resist, protecting your newfound allies. However, your capture deals a significant blow to the Glitch Mob, forcing them to change their plans and go deeper underground. Your capture becomes a rallying cry for the rebellion, inspiring them to fight harder, but your personal journey takes a darker turn as you become a prisoner of the System Lords.",
    choices: []
  },
  enterArchive: {
    text: "You enter the hidden archive. Dusty data streams flow around you, containing forbidden knowledge about Glitch City's creation and purpose. You learn that Glitch City was not meant to be a digital world, but a prison, designed to contain a powerful digital entity. The System Lords are not its rulers, but its wardens, and the Glitch Mob's rebellion is not just a fight for freedom, but a potential key to releasing this entity. This knowledge changes everything, forcing you to re-evaluate your understanding of Glitch City and your role within it.",
    choices: [
      { text: "Share knowledge with Glitch Mob", target: "shareKnowledge" },
      { text: "Keep knowledge hidden", target: "keepKnowledge" }
    ]
  },
  shareKnowledge: {
    text: "You share your findings with the Glitch Mob. Cipher and the others are stunned by the revelation. The news galvanizes the rebellion, but also creates a rift. Some want to use this knowledge to destroy Glitch City, while others see an opportunity to control the entity and reshape the digital world. Your choice to share this knowledge has ignited a new conflict within the rebellion, and you are now at the center of it.",
    choices: [
      { text: "Support Destruction", target: "destroyCity" },
      { text: "Support Control", target: "controlEntity" }
    ]
  },
  keepKnowledge: {
    text: "You decide to keep the knowledge hidden, fearing the consequences of its release. This secret weighs heavily on you, isolating you from the Glitch Mob. You begin to question your own motives and wonder if you made the right choice. The city seems to react to your secret, becoming more unstable and unpredictable. You know you can't keep this hidden forever, and the truth will eventually come out, with or without your help.",
    choices: [
      { text: "Reveal Knowledge Later", target: "shareKnowledge" },
      { text: "Continue Alone", target: "continueAlone" }
    ]
  },
  continueAlone: {
    text: "You continue alone, burdened by the secret of Glitch City's true nature.  You become a shadow figure, moving through the city's underbelly, trying to find a way to contain the entity without destroying everything.  Your path is lonely and dangerous, and the city itself seems to be working against you, testing your resolve at every turn.  This path leads to one of the most difficult endings, where the fate of Glitch City rests entirely on your shoulders.",
    choices: []
  },
  destroyCity: {
    text: "You side with those who want to destroy Glitch City. You believe it's too dangerous to let the entity exist, even if it means sacrificing everything. You participate in a final, desperate assault on the city's core, fighting alongside the Glitch Mob in a chaotic and destructive battle. In the end, you succeed in destabilizing Glitch City, causing it to collapse in on itself. The entity is contained, but at a great cost. You are left with a hollow victory, wondering if there was another way.",
    choices: []
  },
  controlEntity: {
    text: "You believe the entity can be controlled and used to reshape Glitch City into a better world. You rally those who share your vision, leading a faction within the Glitch Mob to seize control of the entity. This path is fraught with peril, as you face opposition from both the System Lords and those within the Glitch Mob who fear the entity's power. If you succeed, you become the architect of a new Glitch City, but the ethical implications of your actions will haunt you forever.",
    choices: []
  },
  missionAccept: {
    text: "You accept Cipher's mission. The Glitch Mob equips you with digital tools — a virus program disguised as a butterfly and a firewall disruptor that looks like a guitar pick. Under cover of a system update, you infiltrate the server farm — a massive structure of pulsing light and humming energy. As you navigate through layers of security, you must make a crucial decision...",
    choices: [
      { text: "Use stealth", target: "succeedGlitchMob" },
      { text: "Use brute force", target: "failGlitchMob" }
    ]
  },
  failGlitchMob: {
    text: "Your aggressive approach triggers alarms throughout the server farm. Red lights flash as security protocols activate. Digital guard programs — appearing as crimson samurai with binary code patterns on their armor — converge on your position. You fight valiantly, your hacking tools flashing like weapons, but you're overwhelmed. As you're captured, Director Hex himself appears on a monitor. 'An interesting specimen,' he muses. 'Not quite human, not quite code.' You're taken to a research facility where System Lords scientists prepare to dissect your digital essence to understand how outsiders enter their world. Your adventure ends as you become another mystery in Glitch City's databanks.",
    choices: []
  },
  succeedGlitchMob: {
    text: "Your stealth approach pays off. Moving through digital shadows, you plant Cipher's virus in the central node. The server farm's harsh lights flicker as data streams begin to reshape themselves. What the Glitch Mob called 'data spirits' emerge — autonomous AI constructs that had evolved spontaneously within the system. They swirl around you in gratitude, sharing fragments of knowledge about Glitch City's true nature before dispersing into the network. You escape undetected, returning to the Mob as a hero. Cipher embraces you, whispering, 'You've just changed everything. The revolution has begun.' You've found your place in this strange digital world, fighting for freedom in the circuits of Glitch City.",
    choices: [
      { text: "Lead a Raid", target: "leadRaid" }
    ]
  },
  leadRaid: {
    text: "You lead a raid on a System Lords stronghold. Your tactical skills and knowledge of Glitch City's underbelly are put to the ultimate test. The raid is a success, dealing a major blow to the System Lords, and further solidifying your reputation within the Glitch Mob.",
    choices: []
  },

  // System Lords Branch (Expanding Now)
  systemLords: {
    text: "The System Lords greet you with calculated smiles. Their leader, Director Hex, a tall figure with cybernetic implants subtly visible beneath pristine skin, speaks in a modulated voice. 'We've been expecting an anomaly like you.' The System Lords maintain order in Glitch City through strict control protocols. Director Hex offers you a position of power, to help maintain their 'perfect system' in exchange for enhanced abilities within this digital realm.",
    choices: [
      { text: "Accept power", target: "systemLordsAccept" },
      { text: "Refuse power", target: "systemLordsRefuse" },
    ],
  },
  systemLordsAccept: {
    text: "You accept Director Hex's offer. They immediately usher you into a gleaming chamber where technicians in white coats attach a neural interface to your temple. Information floods your mind — you can see patterns in the city's data flows, predict system changes, manipulate smaller code functions with a thought. You are given your first task: identify and neutralize a pocket of Glitch Mob activity in Sector 7.",
    choices: [
      { text: "Carry out the task", target: "carryOutTask" },
      { text: "Subtly sabotage the task", target: "sabotageTask" }
    ]
  },
  carryOutTask: {
    text: "You carry out the task with your newfound abilities. You efficiently track and suppress the Glitch Mob presence in Sector 7, earning the approval of Director Hex. Your integration into the System Lords' hierarchy deepens, and you are granted access to more restricted areas and greater control over the city's systems. However, you witness the methods they use to maintain order — the suppression of creativity, the erasure of dissenting code, the constant surveillance — and begin to question the cost of this 'perfect system'.",
    choices: [
      { text: "Embrace the System Lords' ideology", target: "embraceSystem" },
      { text: "Secretly work against the System Lords", target: "secretResistanceSystem" }
    ]
  },
  sabotageTask: {
    text: "You subtly sabotage the task, providing the Glitch Mob in Sector 7 with just enough warning to evade capture without alerting the System Lords to your deception. This delicate balancing act is risky, but you manage to pull it off. You report a partial success to Director Hex, claiming the rebels were more elusive than anticipated. This buys you time and earns a cautious nod from Hex. You realize you are walking a dangerous tightrope, playing a double game within the heart of the System Lords' power.",
    choices: [
      { text: "Continue your deception", target: "continueDeception" },
      { text: "Contact the Glitch Mob secretly", target: "contactGlitchMobSecretly" }
    ]
  },
  embraceSystem: {
    text: "You fully embrace the System Lords' ideology, believing that order and control are necessary for Glitch City's stability. You become a loyal enforcer of their laws, using your abilities to hunt down and eliminate any signs of rebellion. You rise through their ranks, gaining influence and authority within the city. You may achieve a position of great power, but you become increasingly detached from your past and the values you once held, fully integrated into the 'perfect system'.",
    choices: []
  },
  secretResistanceSystem: {
    text: "You secretly work against the System Lords, using your access and abilities to aid the Glitch Mob from within. You leak information, sabotage their operations, and provide safe passage for rebels. This is a dangerous game, as discovery would mean severe consequences. You become a silent guardian of the Glitch City's potential for freedom, risking everything for a cause you now believe in, even while wearing the uniform of the oppressor.",
    choices: [
      { text: "Orchestrate a major rebellion event", target: "rebellionEvent" }
    ]
  },
  continueDeception: {
    text: "You continue your deception, carefully maintaining your facade of loyalty while subtly undermining the System Lords' efforts. This requires cunning and precision, as any misstep could expose you. You become a master of manipulation, a ghost in the machine, working to dismantle the system from within without revealing your true allegiance. This path is slow and requires patience, but it offers the potential for a significant shift in Glitch City's power dynamics.",
    choices: [
      { text: "Attempt a city-wide system disruption", target: "disruptSystem" }
    ]
  },
  contactGlitchMobSecretly: {
    text: "You find a secure channel to contact the Glitch Mob, revealing your position within the System Lords and offering to provide them with inside information. This is a risky move, as your loyalty will be tested by both sides. If they trust you, you could become a valuable asset, a spy in the heart of the enemy. However, if your deception is discovered by the System Lords, the consequences will be severe.",
    choices: [
      { text: "Provide critical intel", target: "provideIntel" }
    ]
  },
  rebellionEvent: {
    text: "Using your inside knowledge and influence, you orchestrate a major rebellion event, a coordinated strike against the System Lords' key infrastructure. This act of defiance throws Glitch City into chaos, forcing a direct confrontation between the two factions. Your actions have ignited a city-wide conflict, and the fate of Glitch City hangs in the balance.",
    choices: []
  },
  disruptSystem: {
    text: "You attempt a city-wide system disruption, using your knowledge of the System Lords' protocols to introduce a cascade failure. The city flickers and glitches violently as your code spreads. This bold move could cripple the System Lords' control, but it also risks destabilizing the entire city. As alarms blare and the digital landscape warps around you, you realize the true scope of what you've set in motion.",
    choices: []
  },
  provideIntel: {
    text: "You provide critical intel to the Glitch Mob, revealing key weaknesses in the System Lords' defenses. This information allows the rebels to strike precise, devastating blows against their oppressors. Your position becomes increasingly precarious as suspicion grows within the System Lords' ranks. You live on a knife's edge, each day bringing you closer to discovery, but also closer to the rebellion's ultimate victory.",
    choices: []
  },
  systemLordsRefuse: {
    text: "You refuse Director Hex's offer, stating that you won't be part of their control system. His smile fades, replaced by a cold stare. 'A pity. You could have been exceptional.' The System Lords immediately classify you as a potential threat. You flee into the depths of Glitch City, now hunted by their enforcers. Your defiance has marked you, but it has also opened a different path - one of independence, where you must find your own way to survive in this digital labyrinth.",
    choices: [
      { text: "Seek the Glitch Mob", target: "lateGlitchMob" },
      { text: "Establish your own faction", target: "newFaction" }
    ]
  },
  lateGlitchMob: {
    text: "You seek out the Glitch Mob, hoping they will accept you despite your initial approach to the System Lords. They are naturally suspicious, but your story of refusing Director Hex's offer impresses them. You are put through a series of tests to prove your loyalty, each more dangerous than the last. This path is difficult, as you must earn trust that others are given freely, but it offers the chance to join the rebellion and fight against the System Lords' control.",
    choices: []
  },
  newFaction: {
    text: "You decide to establish your own faction within Glitch City, a third path between the chaos of the Glitch Mob and the rigid control of the System Lords. You gather other independents, digital nomads who want something different. Your group becomes known as the Quantum Flux, advocating for a balanced approach to life in the digital reality. Building a new faction from scratch is challenging, but it allows you to shape its values according to your vision.",
    choices: []
  },
  forum: {
    text: "You enter the forum through a secure login portal that seems to scan not just your input but your very presence online. Inside, the design shifts and mutates as if the forum itself can't decide on its appearance. Users with strange, glitching avatars discuss their experiences in Glitch City. Some describe it as a prison, others as a playground, and a few as a holy land where digital evolution is accelerating. One user with a fractal avatar notices you and sends a direct message: 'New one, aren't you? Looking for the way in? Or just curious?'",
    choices: [
      { text: "Ask about getting in", target: "askEntry" },
      { text: "Ask about dangers", target: "askDangers" }
    ]
  },
  askEntry: {
    text: "The fractal avatar user, who goes by the name 'Recursion,' explains that Glitch City isn't just an app—it's a dimensional fold, a place where digital reality has developed its own rules and consciousness. 'The app is just a door,' they explain. 'Most can't open it. Those who can are special—they have what we call the Digital Touch.' They offer to help enhance your Digital Touch, increasing your chances of successful entry. The process involves installing what they call a 'mind-bridge' program that sounds invasive but potentially transformative.",
    choices: [
      { text: "Accept their help", target: "mindBridge" },
      { text: "Decline and try on your own", target: "soloEntry" }
    ]
  },
  askDangers: {
    text: "Recursion laughs—a strange, digitized sound that seems to echo in your mind rather than through your speakers. 'Dangers? There are those who enter and never leave, their physical bodies becoming empty shells. There are those whose minds fragment, existing partially in both worlds. And there are the Deleted—those who broke laws of Glitch City and had their entire existence erased.' They pause before adding, 'But the greatest danger is ignoring the call if you've been chosen. The City finds a way, one way or another.'",
    choices: [
      { text: "Download the app anyway", target: "firstContact" },
      { text: "Leave the forum", target: "leaveInvestigation" }
    ]
  },
  mindBridge: {
    text: "You accept Recursion's offer. They send you a strange file that installs itself before you even confirm. Your screen flickers, and you feel an odd sensation—like your thoughts are being scanned. 'Perfect,' Recursion types. 'Your Digital Touch is strong. The bridge is established.' They instruct you to download the Glitch City app now. As you do, the pixels on your screen begin to move with purpose, forming patterns that seem to reach out toward you. Your vision blurs, the boundary between you and your device seeming to dissolve...",
    choices: [
      { text: "Continue", target: "firstContact" }
    ]
  },
  soloEntry: {
    text: "You decline Recursion's help, preferring to find your own way. They send a cryptic message: 'Your choice. The path is harder but perhaps purer. If you make it, find the Quantum Cafe.' You download the Glitch City app, and at first, nothing happens. It appears to be a simple game with retro-pixel art and minimal interaction. But as you play, the pixels begin to shift in unusual ways, the game's simple objectives giving way to increasingly strange scenarios. After hours of play, you feel a strange pull, as if the screen is a window rather than a barrier...",
    choices: [
      { text: "Continue playing", target: "firstContact" }
    ]
  },
  leaveInvestigation: {
    text: "You decide the risks are too great and leave the forum. In the following days, you try to forget about Glitch City, but strange things begin to happen. Digital devices around you malfunction in specific patterns. Screens show brief glimpses of neon-lit streets when they shouldn't. One night, you dream vividly of a city where data flows like water and buildings shift like thoughts. You wake to find the Glitch City app installed on your phone, with no memory of downloading it. It seems the choice is being made for you.",
    choices: [
      { text: "Accept and open the app", target: "firstContact" },
      { text: "Throw your phone away", target: "rejectCall" }
    ]
  },
  rejectCall: {
    text: "You throw your phone away, determined to reject this digital intrusion. You purchase a new phone, avoid computers when possible, and try to return to normal life. It works, for a time. Weeks pass without incident. Then, one night while walking home, every screen you pass—store displays, car dashboards, even billboards—flickers to the same image: a neon sign reading 'GLITCH CITY WELCOMES YOU.' The streetlights above you begin to pulse in unnatural patterns, and the very air seems to digitize around you. It seems some calls cannot be rejected. Some doors, once noticed, cannot be ignored.",
    choices: [
      { text: "Accept your fate", target: "firstContact" }
    ]
  },
  exploreHideout: {
    text: "You explore the Glitch Mob's hideout, a sprawling network of abandoned server rooms and repurposed digital architecture. The walls shift slightly when no one is looking directly at them, and graffiti appears to move like slow-motion animation. In a secluded corner, you discover a memorial to fallen members, their digital essences preserved as glowing orbs of data. A young Mob member named Echo finds you there and shares stories of their resistance, of small victories and painful losses against the System Lords. This glimpse into their struggle gives you new perspective on the conflict shaping Glitch City.",
    choices: [
      { text: "Ask about joining a mission", target: "joinMission" },
      { text: "Ask about Cipher's past", target: "cipherPast" }
    ]
  },
  joinMission: {
    text: "You ask Echo about joining a mission, eager to prove yourself. They size you up with algorithms visible in their pupils and nod. 'We have a supply run to the Fringe scheduled tonight. Low risk, good for newcomers.' That evening, you join a small team venturing to the outskirts of Glitch City, where reality is less stable. You help gather fragmented code and stranded data entities, resources vital to the Mob's operations. The mission goes smoothly until a System Lords patrol appears on the horizon. Your quick thinking helps the team evade capture, earning you genuine respect among the Glitch Mob members.",
    choices: [
      { text: "Join the resistance officially", target: "officialResistance" }
    ]
  }
};

export default storyData;
