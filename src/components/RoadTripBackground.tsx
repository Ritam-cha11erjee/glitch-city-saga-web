import { useEffect, useState, useRef } from 'react';

interface RoadTripBackgroundProps {
  darkMode: boolean;
  triggerAnimation?: boolean;
  shake?: boolean;
  currentLocation?: string;
  mousePosition: { x: number; y: number };
}

const RoadTripBackground: React.FC<RoadTripBackgroundProps> = ({ 
  darkMode, 
  triggerAnimation = false, 
  shake = false,
  mousePosition 
}) => {
  const [headlightFlash, setHeadlightFlash] = useState(false);
  const [exhaust, setExhaust] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [carDirection, setCarDirection] = useState(1);
  const [hoverItems, setHoverItems] = useState<Array<{id: number, x: number, y: number, type: 'samosa' | 'potato'}>>([]); 

  useEffect(() => {
    const headlightInterval = setInterval(() => {
      setHeadlightFlash(true);
      setTimeout(() => {
        setHeadlightFlash(false);
        setTimeout(() => {
          setHeadlightFlash(true);
          setTimeout(() => {
            setHeadlightFlash(false);
            setTimeout(() => {
              setHeadlightFlash(true);
              setTimeout(() => setHeadlightFlash(false), 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 5000);
    
    const exhaustInterval = setInterval(() => {
      setExhaust(true);
      setTimeout(() => setExhaust(false), 2000);
    }, 3000);
    
    return () => {
      clearInterval(headlightInterval);
      clearInterval(exhaustInterval);
    };
  }, []);

  useEffect(() => {
    const moveCarInterval = setInterval(() => {
      setCarPosition(prev => {
        if (prev > 50) {
          setCarDirection(-1);
          return prev - 1;
        } else if (prev < -50) {
          setCarDirection(1);
          return prev + 1;
        }
        return prev + (2 * carDirection);
      });
    }, 50);
    
    return () => clearInterval(moveCarInterval);
  }, [carDirection]);

  useEffect(() => {
    const handleMouseMove = () => {
      const newItem = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y,
        type: Math.random() > 0.5 ? 'samosa' as const : 'potato' as const,
      };
      setHoverItems(prev => [...prev.slice(-5), newItem]); // Keep only last 5 items
    };

    handleMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-800">
      {/* Animated road */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-gray-800 to-gray-700">
        <div className="absolute bottom-0 w-full h-20 flex items-center justify-center">
          <div className="w-full h-4 bg-gray-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-repeat-x animate-road-move">
              <div className="h-full w-full flex items-center justify-around">
                <div className="h-1 w-16 bg-yellow-400"></div>
                <div className="h-1 w-16 bg-yellow-400"></div>
                <div className="h-1 w-16 bg-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ground decoration */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-900 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-green-800 to-transparent"></div>
      </div>

      {/* Cylindrical clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cloud absolute w-64 h-24 bg-white/20 rounded-full opacity-80 animate-cloud-1"></div>
        <div className="cloud absolute w-52 h-20 bg-white/20 rounded-full opacity-70 animate-cloud-2"></div>
        <div className="cloud absolute w-40 h-16 bg-white/20 rounded-full opacity-60 animate-cloud-3"></div>
      </div>

      {/* SUV */}
      <div 
        className={`absolute bottom-24 transform transition-transform duration-300 ${shake ? 'animate-car-shake' : ''}`}
        style={{ left: `calc(50% + ${carPosition}px)` }}
      >
        <div className="relative">
          <div className="w-80 h-40 bg-transparent rounded-lg shadow-lg">
            {/* SUV body */}
            <div className="absolute top-0 left-25 w-50 h-18 bg-white rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-b-lg"></div>
            
            {/* Windows */}
            <div className="absolute top-4 left-20 w-40 h-12 bg-blue-200 border border-gray-300"></div>
            {/*<div className="absolute top-4 left-4 w-10 h-12 bg-blue-200 border border-gray-300"></div>*/}
            <div className="absolute top-4 right-4 w-10 h-12 bg-blue-200 border border-gray-300"></div>
            
            {/* Headlights */}
            <div className={`absolute bottom-8 left-0 w-8 h-8 rounded-full ${headlightFlash ? 'bg-yellow-300 animate-pulse shadow-headlight' : 'bg-gray-300'}`}></div>
            
            {/* Taillights */}
            <div className="absolute bottom-8 right-0 w-8 h-8 rounded-full bg-red-500"></div>
            
            {/* Exhaust */}
            {exhaust && (
              <div className="absolute bottom-6 right-2">
                <div className="absolute w-6 h-6 rounded-full bg-gray-400/80 animate-smoke-1"></div>
                <div className="absolute w-5 h-5 rounded-full bg-gray-400/70 animate-smoke-2"></div>
                <div className="absolute w-4 h-4 rounded-full bg-gray-400/60 animate-smoke-3"></div>
                <div className="absolute w-3 h-3 rounded-full bg-gray-400/50 animate-smoke-4"></div>
                <div className="absolute w-2 h-2 rounded-full bg-gray-400/40 animate-smoke-5"></div>
              </div>
            )}
            
            {/* Wheels */}
            <div className="absolute -bottom-4 left-12 w-16 h-16 bg-black rounded-full border-4 border-gray-300">
              <div className="w-8 h-8 bg-gray-300 rounded-full absolute top-2 left-2"></div>
            </div>
            <div className="absolute -bottom-4 right-12 w-16 h-16 bg-black rounded-full border-4 border-gray-300">
              <div className="w-8 h-8 bg-gray-300 rounded-full absolute top-2 left-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover items (potatoes and samosas) */}
      {hoverItems.map((item) => (
        <div 
          key={item.id}
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            left: item.x - 40,
            top: item.y - 40,
            width: '80px',
            height: '80px',
          }}
        >
          {item.type === 'samosa' ? (
            <div className="w-full h-full bg-yellow-700/50 clip-samosa glow hover:scale-110 transition-transform"></div>
          ) : (
            <div className="w-full h-full bg-yellow-800/50 rounded-lg glow hover:scale-110 transition-transform"></div>
          )}
        </div>
      ))}

      <style>
        {`
        @keyframes road-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-road-move {
          animation: road-move 1s linear infinite;
        }
        
        @keyframes smoke-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          100% { transform: translate(-40px, -40px) scale(2); opacity: 0; }
        }
        
        @keyframes smoke-2 {
          0% { transform: translate(-5px, -5px) scale(1); opacity: 0.7; }
          100% { transform: translate(-45px, -45px) scale(2.2); opacity: 0; }
        }
        
        @keyframes smoke-3 {
          0% { transform: translate(-10px, -10px) scale(1); opacity: 0.6; }
          100% { transform: translate(-50px, -50px) scale(2.4); opacity: 0; }
        }
        
        @keyframes smoke-4 {
          0% { transform: translate(-15px, -15px) scale(1); opacity: 0.5; }
          100% { transform: translate(-55px, -55px) scale(2.6); opacity: 0; }
        }
        
        @keyframes smoke-5 {
          0% { transform: translate(-20px, -20px) scale(1); opacity: 0.4; }
          100% { transform: translate(-60px, -60px) scale(2.8); opacity: 0; }
        }

        .animate-smoke-1 { animation: smoke-1 2s ease-out forwards; }
        .animate-smoke-2 { animation: smoke-2 2s ease-out 0.2s forwards; }
        .animate-smoke-3 { animation: smoke-3 2s ease-out 0.4s forwards; }
        .animate-smoke-4 { animation: smoke-4 2s ease-out 0.6s forwards; }
        .animate-smoke-5 { animation: smoke-5 2s ease-out 0.8s forwards; }
        
        .clip-samosa {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .glow {
          filter: drop-shadow(0 0 10px rgba(255, 204, 0, 0.7));
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes bird-float-1 {
          0% { transform: translateX(-10vw); }
          100% { transform: translateX(110vw); }
        }
        
        @keyframes bird-float-2 {
          0% { transform: translateX(110vw); }
          100% { transform: translateX(-10vw); }
        }
        
        @keyframes bird-float-3 {
          0% { transform: translateX(-20vw); }
          100% { transform: translateX(120vw); }
        }
        
        @keyframes cloud-float-1 {
          0% { transform: translateX(-10vw); top: 10%; }
          100% { transform: translateX(110vw); top: 15%; }
        }
        
        @keyframes cloud-float-2 {
          0% { transform: translateX(110vw); top: 20%; }
          100% { transform: translateX(-10vw); top: 25%; }
        }
        
        @keyframes cloud-float-3 {
          0% { transform: translateX(-20vw); top: 30%; }
          100% { transform: translateX(120vw); top: 35%; }
        }
        
        @keyframes car-shake {
          0% { transform: translateX(-2px) translateY(0); }
          25% { transform: translateX(0) translateY(-2px); }
          50% { transform: translateX(2px) translateY(0); }
          75% { transform: translateX(0) translateY(2px); }
          100% { transform: translateX(-2px) translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default RoadTripBackground;
