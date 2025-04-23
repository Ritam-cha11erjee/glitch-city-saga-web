
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

interface GameMenuProps {
  onStartGame: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="basis-full">
            <div className="bg-black/50 backdrop-blur-sm border border-neon-cyan/30 rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-glitch text-neon-cyan text-center">Glitch City</h2>
              <p className="text-white/80 text-center mb-4">Enter a cyberpunk world where reality fragments and choices reshape your destiny.</p>
              <div className="flex justify-center">
                <Button 
                  onClick={onStartGame}
                  className="bg-neon-cyan/20 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default GameMenu;
