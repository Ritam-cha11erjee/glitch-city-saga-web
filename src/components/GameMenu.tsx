
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Play, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import GlitchText from "./GlitchText";

interface GameMenuProps {
  onStartGame: (storyType: 'glitchCity' | 'starship') => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Carousel className="w-full">
        <CarouselContent>
          {/* Glitch City Story */}
          <CarouselItem className="basis-full md:basis-1/2">
            <Card className="bg-black/50 backdrop-blur-sm border border-neon-cyan/30 rounded-lg overflow-hidden h-full">
              <div className="h-40 bg-glitch-pattern bg-cover bg-center"></div>
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
          <CarouselItem className="basis-full md:basis-1/2">
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
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default GameMenu;
