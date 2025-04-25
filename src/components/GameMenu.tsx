
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Car, Play, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import GlitchText from "./GlitchText";

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
              <AspectRatio ratio={16/9} className="bg-gradient-to-br from-purple-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Stylized City Skyline */}
                  <div className="relative w-full h-full">
                    {/* Buildings */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
                      {/* Buildings with glitching effect */}
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i}
                          className="bg-neon-cyan/20 border-t border-neon-cyan w-6 md:w-8"
                          style={{
                            height: `${15 + Math.random() * 70}%`,
                            animation: `glitch ${0.5 + Math.random() * 2}s ease-in-out ${Math.random() * 1}s infinite alternate`,
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                          }}
                        >
                          <div className="h-full w-full relative">
                            {/* Windows */}
                            {[...Array(Math.floor(Math.random() * 8 + 2))].map((_, j) => (
                              <div 
                                key={j}
                                className="absolute w-2 h-2 bg-neon-yellow/70"
                                style={{
                                  left: `${25 + Math.random() * 50}%`,
                                  top: `${10 + j * 20 + Math.random() * 5}%`,
                                  opacity: Math.random() > 0.4 ? 1 : 0
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/70"></div>
                    <div className="absolute inset-0 bg-cyberpunk-grid bg-[length:20px_20px] opacity-40"></div>
                    
                    {/* Glitch Lines */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute h-[1px] w-full bg-neon-cyan opacity-70"
                          style={{
                            top: `${30 + i * 25}%`,
                            animation: `glitch ${0.2 + i * 0.1}s ease-in-out infinite`,
                            boxShadow: '0 0 8px rgba(0, 255, 255, 1)'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </AspectRatio>
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
                  <Play className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
          
          {/* Starship Story */}
          <CarouselItem className="basis-full">
            <Card className="bg-navy-900/60 backdrop-blur-sm border border-neon-blue/30 rounded-lg overflow-hidden h-full">
              <AspectRatio ratio={16/9} className="bg-gradient-to-b from-blue-900 to-purple-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <Rocket className="h-16 w-16 text-blue-300/70" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-70"></div>
              </AspectRatio>
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
              <AspectRatio ratio={16/9} className="bg-gradient-to-b from-orange-300 to-yellow-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-16 w-16 text-gray-800/70" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] opacity-50"></div>
              </AspectRatio>
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
