
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { User } from "@/types/user";

interface UserProfileProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOpen, onOpenChange }) => {
  const essenceCategories = [
    { name: "Harmony", value: user.essence.harmony || 0, color: "bg-blue-500" },
    { name: "Risk-Taking", value: user.essence.risk || 0, color: "bg-red-500" },
    { name: "Curiosity", value: user.essence.curiosity || 0, color: "bg-purple-500" },
    { name: "Diplomacy", value: user.essence.diplomacy || 0, color: "bg-green-500" },
    { name: "Exploration", value: user.essence.exploration || 0, color: "bg-yellow-500" },
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-lg border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-glitch text-neon-cyan">
            Player Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 p-4">
          {/* Avatar */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="h-24 w-24 border-2 border-neon-cyan">
              <AvatarImage src={user.avatar || "/default-avatar.png"} alt="Profile" />
              <AvatarFallback className="bg-navy-800 text-white text-xl">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          {/* User Details */}
          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="bg-black/40 p-3 rounded-lg"
              >
                <p className="text-xs text-white/60">Chapters Completed</p>
                <p className="text-2xl font-glitch text-neon-yellow">{user.chaptersCompleted}</p>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-black/40 p-3 rounded-lg"
              >
                <p className="text-xs text-white/60">Avg. Completion Time</p>
                <p className="text-2xl font-glitch text-neon-magenta">
                  {Math.floor(user.averageCompletionTime / 60)}:{(user.averageCompletionTime % 60).toString().padStart(2, '0')}
                </p>
              </motion.div>
            </div>
            
            {/* Analytics */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-3 mt-4"
            >
              <h3 className="text-sm font-cyber text-white/80 mb-2">Character Traits</h3>
              
              {essenceCategories.map((category, index) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{category.name}</span>
                    <span>{Math.round((category.value / 10) * 100)}%</span>
                  </div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((category.value / 10) * 100, 100)}%` }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.8 }}
                  >
                    <Progress
                      value={(category.value / 10) * 100}
                      className="h-2 bg-gray-800"
                      indicatorClassName={category.color}
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Sign In Option */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-full pt-2"
          >
            <Button 
              variant="outline" 
              className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2 border-none"
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Sign in with Google
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
