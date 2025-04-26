
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Car, Rocket, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import GlitchText from "./GlitchText";
import { motion } from "framer-motion";

interface GameMenuProps {
  onStartGame: (storyType: 'glitchCity' | 'starship' | 'roadTrip') => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Carousel className="w-full">
        <CarouselContent>
          {/* Glitch City Story */}
          <CarouselItem className="basis-full">
            <Card className="bg-black/50 backdrop-blur-sm border border-neon-cyan/30 rounded-lg overflow-hidden h-full">
              <div className="h-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black">
                  {/* Pixelated background with glitch effect */}
                  <div 
                    className="absolute inset-0 bg-black"
                    style={{
                      backgroundImage: `
                        linear-gradient(0deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(rgba(255, 0, 255, 0.05) 2px, transparent 2px),
                        linear-gradient(90deg, rgba(255, 0, 255, 0.05) 2px, transparent 2px)
                      `,
                      backgroundSize: '20px 20px, 20px 20px, 40px 40px, 40px 40px'
                    }}
                  />
                  
                  {/* Horizontal glitch lines */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`glitch-line-${i}`}
                      className="absolute left-0 right-0 h-[2px] bg-neon-cyan/60"
                      style={{ 
                        top: `${i * 15 + Math.random() * 5}%`,
                      }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        scaleX: [0, 1, 0],
                        left: ['0%', `${Math.random() * 20}%`, '0%'],
                        width: ['0%', '100%', '0%']
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 5 + 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Overlay vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Central content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="text-neon-cyan text-6xl font-bold opacity-20"
                      animate={{
                        x: [-2, 0, 2, 0, -1],
                        filter: [
                          'hue-rotate(0deg) brightness(1)',
                          'hue-rotate(20deg) brightness(1.2)',
                          'hue-rotate(0deg) brightness(1)',
                          'hue-rotate(-20deg) brightness(0.8)',
                          'hue-rotate(0deg) brightness(1)'
                        ]
                      }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      2077
                    </motion.div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-glitch text-neon-cyan text-center">Glitch City</CardTitle>
                <CardDescription className="text-white/80 text-center">
                  Enter a cyberpunk world where reality fragments and choices reshape your destiny.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/60">
                <p>Navigate through neon-lit streets, join rebellious factions, and uncover the secrets of a digital realm.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => onStartGame('glitchCity')}
                  className="bg-neon-cyan/20 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
          
          {/* Starship Story */}
          <CarouselItem className="basis-full">
            <Card className="bg-navy-900/60 backdrop-blur-sm border border-neon-blue/30 rounded-lg overflow-hidden h-full">
              <div className="h-40 bg-gradient-to-b from-blue-900 to-purple-900 bg-cover bg-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <Rocket className="h-16 w-16 text-blue-300/70" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-70"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-glitch text-neon-blue text-center">The Aetheria</CardTitle>
                <CardDescription className="text-white/80 text-center">
                  Command a starship on its maiden voyage through the cosmos.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/60">
                <p>Navigate uncharted star systems, encounter alien civilizations, and shape the destiny of your crew.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => onStartGame('starship')}
                  className="bg-neon-blue/20 border border-neon-blue text-neon-blue hover:bg-neon-blue/30"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch Mission
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
          
          {/* Road Trip Story */}
          <CarouselItem className="basis-full">
            <Card className="bg-orange-900/40 backdrop-blur-sm border border-yellow-500/30 rounded-lg overflow-hidden h-full">
              <div className="h-40 bg-gradient-to-b from-orange-300 to-yellow-500 bg-cover bg-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-16 w-16 text-gray-800/70" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] opacity-50"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-glitch text-yellow-500 text-center">Extremely Inconvenient Road Trip</CardTitle>
                <CardDescription className="text-white/80 text-center">
                  Embark on a chaotic journey across India in an old Tata Sumo.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/60">
                <p>Navigate absurd obstacles, manage eccentric travel companions, and solve the most ridiculous problems imaginable.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => onStartGame('roadTrip')}
                  className="bg-yellow-500/20 border border-yellow-500 text-yellow-500 hover:bg-yellow-500/30"
                >
                  <Car className="w-4 h-4 mr-2" />
                  Start Trip
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default GameMenu;
