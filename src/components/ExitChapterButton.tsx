
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface ExitChapterButtonProps {
  onExit: () => void;
}

const ExitChapterButton: React.FC<ExitChapterButtonProps> = ({ onExit }) => {
  const { toast } = useToast();

  const handleExit = () => {
    toast({
      title: "Exiting chapter",
      description: "Returning to main menu...",
      duration: 2000,
    });
    onExit();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-4 z-50"
    >
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExit}
        className="bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 text-white rounded-full p-3 h-10 w-10"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Exit Chapter</span>
      </Button>
    </motion.div>
  );
};

export default ExitChapterButton;
