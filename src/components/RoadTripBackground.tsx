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
  const [hoverItems, setHoverItems] = useState<Array<{id: number, x: number, y: number}>>([]);

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
      };
      setHoverItems(prev => [...prev.slice(-8), newItem]); // Keep only last 8 stars
    };

    handleMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-800">
      {/* Animated road */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-gray-800 to-gray-700">
        <div className="absolute bottom-0 w-full h-24 flex items-center justify-center">
          <div className="w-full h-8 bg-gray-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-repeat-x animate-road-move">
              <div className="h-full w-full flex items-center justify-around">
                <div className="h-2 w-24 bg-yellow-400"></div>
                <div className="h-2 w-24 bg-yellow-400"></div>
                <div className="h-2 w-24 bg-yellow-400"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ground decoration */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-900 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-800 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-b from-green-800/30 to-green-900/30 backdrop-blur-sm"></div>
      </div>

      {/* Animated cylindrical clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cloud absolute w-64 h-24 bg-white/20 rounded-full opacity-80 animate-cloud-float-1"></div>
        <div className="cloud absolute w-52 h-20 bg-white/20 rounded-full opacity-70 animate-cloud-float-2"></div>
        <div className="cloud absolute w-40 h-16 bg-white/20 rounded-full opacity-60 animate-cloud-float-3"></div>
      </div>

      {/* SUV */}
      <div 
        className={`absolute bottom-28 transform transition-transform duration-300 ${shake ? 'animate-car-shake' : ''}`}
        style={{ left: `calc(50% + ${carPosition}px)` }}
      >
        <div className="relative">
          <div className="w-80 h-40 bg-transparent">
            {/* SUV body - 2-box design */}
            <div className="absolute top-4 left-12 w-48 h-14 bg-white rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-lg"></div>
            
            {/* Windows */}
            <div className="absolute top-6 left-16 w-36 h-10 bg-blue-200 border border-gray-300"></div>
            <div className="absolute top-6 right-8 w-10 h-10 bg-blue-200 border border-gray-300"></div>
            
            {/* Headlights with rays */}
            <div className={`absolute bottom-8 left-0 w-8 h-8 rounded-full ${headlightFlash ? 'animate-headlight-flash' : 'bg-gray-300'}`}>
              {headlightFlash && (
                <div className="absolute inset-0">
                  <div className="absolute left-full top-1/2 w-24 h-1 bg-gradient-to-r from-yellow-300 to-transparent transform -translate-y-1/2"></div>
                  <div className="absolute left-full top-1/2 w-24 h-2 bg-gradient-to-r from-yellow-300/50 to-transparent transform -translate-y-1/2 rotate-6"></div>
                  <div className="absolute left-full top-1/2 w-24 h-2 bg-gradient-to-r from-yellow-300/50 to-transparent transform -translate-y-1/2 -rotate-6"></div>
                </div>
              )}
            </div>
            
            {/* Taillights */}
            <div className="absolute bottom-8 right-0 w-8 h-8 rounded-full bg-red-500"></div>
            
            {/* Exhaust */}
            {exhaust && (
              <div className="absolute bottom-6 right-2">
                <div className="absolute w-8 h-8 rounded-full bg-gray-400/80 animate-smoke-1"></div>
                <div className="absolute w-7 h-7 rounded-full bg-gray-400/70 animate-smoke-2"></div>
                <div className="absolute w-6 h-6 rounded-full bg-gray-400/60 animate-smoke-3"></div>
                <div className="absolute w-5 h-5 rounded-full bg-gray-400/50 animate-smoke-4"></div>
                <div className="absolute w-4 h-4 rounded-full bg-gray-400/40 animate-smoke-5"></div>
              </div>
            )}
            
            {/* Spinning wheels */}
            <div className="absolute -bottom-4 left-12 w-16 h-16 bg-black rounded-full border-4 border-gray-300 animate-wheel-spin">
              <div className="w-8 h-8 bg-gray-300 rounded-full absolute top-2 left-2"></div>
            </div>
            <div className="absolute -bottom-4 right-12 w-16 h-16 bg-black rounded-full border-4 border-gray-300 animate-wheel-spin">
              <div className="w-8 h-8 bg-gray-300 rounded-full absolute top-2 left-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover stars */}
      {hoverItems.map((item) => (
        <div 
          key={item.id}
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            left: item.x - 20,
            top: item.y - 20,
            width: '40px',
            height: '40px',
          }}
        >
          <div className="w-full h-full animate-star-twinkle">
            <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300/70">
              <path 
                fill="currentColor" 
                d="M12 1l3.22 6.52 7.2.63-5.21 5.07 1.23 7.19L12 17.77l-6.44 3.39 1.23-7.19-5.21-5.07 7.2-.63z"
              />
            </svg>
          </div>
        </div>
      ))}

      <style>
        {`
        @keyframes road-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-road-move {
          animation: road-move 1s linear infinite;
        }
        
        @keyframes smoke-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          100% { transform: translate(-60px, -60px) scale(2); opacity: 0; }
        }
        
        @keyframes smoke-2 {
          0% { transform: translate(-10px, -10px) scale(1); opacity: 0.7; }
          100% { transform: translate(-70px, -70px) scale(2.2); opacity: 0; }
        }
        
        @keyframes smoke-3 {
          0% { transform: translate(-20px, -20px) scale(1); opacity: 0.6; }
          100% { transform: translate(-80px, -80px) scale(2.4); opacity: 0; }
        }
        
        @keyframes smoke-4 {
          0% { transform: translate(-30px, -30px) scale(1); opacity: 0.5; }
          100% { transform: translate(-90px, -90px) scale(2.6); opacity: 0; }
        }
        
        @keyframes smoke-5 {
          0% { transform: translate(-40px, -40px) scale(1); opacity: 0.4; }
          100% { transform: translate(-100px, -100px) scale(2.8); opacity: 0; }
        }

        .animate-smoke-1 { animation: smoke-1 2s ease-out forwards; }
        .animate-smoke-2 { animation: smoke-2 2s ease-out 0.2s forwards; }
        .animate-smoke-3 { animation: smoke-3 2s ease-out 0.4s forwards; }
        .animate-smoke-4 { animation: smoke-4 2s ease-out 0.6s forwards; }
        .animate-smoke-5 { animation: smoke-5 2s ease-out 0.8s forwards; }
        
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
        
        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-wheel-spin {
          animation: wheel-spin 1s linear infinite;
        }
        
        @keyframes headlight-flash {
          0%, 100% { background-color: rgb(253, 224, 71); box-shadow: 0 0 20px rgb(253, 224, 71); }
          50% { background-color: rgb(234, 179, 8); box-shadow: 0 0 10px rgb(234, 179, 8); }
        }
        
        .animate-headlight-flash {
          animation: headlight-flash 0.5s ease-in-out;
          background-color: rgb(253, 224, 71);
        }
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        
        .animate-star-twinkle {
          animation: star-twinkle 1.5s ease-in-out infinite;
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
