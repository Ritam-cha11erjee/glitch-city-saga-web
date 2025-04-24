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
  currentLocation = 'start',
  mousePosition 
}) => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy' | 'stormy'>('sunny');
  const [headlightFlash, setHeadlightFlash] = useState(false);
  const [exhaust, setExhaust] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [carDirection, setCarDirection] = useState(1); // 1 for forward, -1 for backward
  const [foodItems, setFoodItems] = useState<Array<{id: number, x: number, y: number, type: 'samosa' | 'potato', size: number}>>([]);
  
  const animationFrameRef = useRef<number>();
  const lastFoodSpawnTime = useRef<number>(0);
  
  useEffect(() => {
    if (currentLocation) {
      const locationToTime: {[key: string]: 'day' | 'sunset' | 'night'} = {
        start: 'day',
        samosa: 'day',
        magneticHill: 'sunset',
        dhabaStop: 'sunset',
        mechanicStop: 'night',
        bollywoodGPS: 'day',
        paperMap: 'day',
        leaveDhaba: 'sunset',
        chaiParty: 'sunset',
        properPayment: 'night',
        hagglePayment: 'night',
        bollywoodDance: 'day',
        findAround: 'day',
        bollywoodDirections: 'sunset',
        findGlasses: 'sunset',
        theEnd: 'day'
      };
      
      const locationToWeather: {[key: string]: 'sunny' | 'cloudy' | 'rainy' | 'stormy'} = {
        start: 'sunny',
        samosa: 'sunny',
        magneticHill: 'cloudy',
        dhabaStop: 'sunny',
        mechanicStop: 'rainy',
        bollywoodGPS: 'cloudy',
        paperMap: 'sunny',
        leaveDhaba: 'sunny',
        chaiParty: 'sunny',
        properPayment: 'cloudy',
        hagglePayment: 'stormy',
        bollywoodDance: 'cloudy',
        findAround: 'sunny',
        bollywoodDirections: 'sunny',
        findGlasses: 'rainy',
        theEnd: 'sunny'
      };
      
      setTimeOfDay(locationToTime[currentLocation] || 'day');
      setWeather(locationToWeather[currentLocation] || 'sunny');
    }
  }, [currentLocation]);

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
    const headlightInterval = setInterval(() => {
      setHeadlightFlash(true);
      setTimeout(() => setHeadlightFlash(false), 200);
    }, 5000);
    
    const exhaustInterval = setInterval(() => {
      setExhaust(true);
      setTimeout(() => setExhaust(false), 300);
    }, 3000);
    
    return () => {
      clearInterval(headlightInterval);
      clearInterval(exhaustInterval);
    };
  }, []);

  useEffect(() => {
    const generateFoodItems = (timestamp: number) => {
      if (timestamp - lastFoodSpawnTime.current > 500) {
        const newItem = {
          id: Date.now(),
          x: mousePosition.x,
          y: mousePosition.y,
          type: Math.random() > 0.5 ? 'samosa' as const : 'potato' as const,
          size: Math.random() * 30 + 30,
        };
        setFoodItems(prev => [...prev.filter(item => item.y < window.innerHeight), newItem]);
        lastFoodSpawnTime.current = timestamp;
      }
      
      setFoodItems(prev => 
        prev.map(item => ({
          ...item,
          y: item.y + 5,
        }))
      );
      
      animationFrameRef.current = requestAnimationFrame(generateFoodItems);
    };
    
    animationFrameRef.current = requestAnimationFrame(generateFoodItems);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  const getBackground = () => {
    switch(timeOfDay) {
      case 'day':
        return 'from-blue-400 to-cyan-100';
      case 'sunset':
        return 'from-orange-400 via-pink-300 to-blue-500';
      case 'night':
        return 'from-gray-900 via-purple-900 to-indigo-800';
      default:
        return 'from-blue-400 to-cyan-100';
    }
  };

  const renderWeatherEffects = () => {
    switch(weather) {
      case 'cloudy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="cloud absolute w-64 h-24 bg-white rounded-full opacity-80 animate-cloud-1"></div>
            <div className="cloud absolute w-52 h-20 bg-white rounded-full opacity-70 animate-cloud-2"></div>
            <div className="cloud absolute w-40 h-16 bg-white rounded-full opacity-60 animate-cloud-3"></div>
          </div>
        );
      case 'rainy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="rain"></div>
            <div className="cloud absolute w-64 h-24 bg-gray-500 rounded-full opacity-80 animate-cloud-1"></div>
            <div className="cloud absolute w-52 h-20 bg-gray-500 rounded-full opacity-70 animate-cloud-2"></div>
          </div>
        );
      case 'stormy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="lightning"></div>
            <div className="rain heavy"></div>
            <div className="cloud absolute w-screen h-40 top-0 bg-gray-800 opacity-80"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 transition-colors duration-1000 bg-gradient-to-b ${getBackground()} overflow-hidden`}>
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-green-700 to-green-500"></div>
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-brown-800 to-green-700"></div>
      <div className="absolute bottom-0 w-full h-1 bg-gray-800"></div>
      
      <div className="absolute bottom-20 w-full h-16 bg-gray-700 flex justify-center items-center">
        <div className="w-full h-1 border-t-2 border-dashed border-yellow-400"></div>
      </div>
      
      {renderWeatherEffects()}
      
      <div 
        className={`absolute bottom-36 transform transition-transform duration-300 ${shake ? 'animate-car-shake' : ''}`}
        style={{ left: `calc(50% + ${carPosition}px)` }}
      >
        <div className="relative">
          <div className="w-80 h-32 bg-gray-700 rounded-md border-2 border-black relative">
            <div className="absolute top-4 left-12 w-60 h-10 bg-blue-200 border border-black"></div>
            <div className="absolute top-4 left-4 w-8 h-10 bg-blue-200 border border-black"></div>
            <div className="absolute top-4 right-4 w-8 h-10 bg-blue-200 border border-black"></div>
            
            <div className={`absolute bottom-6 left-0 w-6 h-6 rounded-full ${headlightFlash ? 'bg-yellow-300 animate-pulse shadow-headlight' : 'bg-gray-300'}`}></div>
            
            <div className="absolute bottom-6 right-0 w-6 h-6 rounded-full bg-red-500"></div>
            
            <div className="absolute bottom-4 right-2 w-4 h-2 bg-gray-400 rounded-sm"></div>
            
            {exhaust && (
              <>
                <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gray-400 opacity-80 animate-smoke-1"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gray-400 opacity-70 animate-smoke-2"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gray-400 opacity-60 animate-smoke-3"></div>
              </>
            )}
            
            <div className="absolute top-16 right-10 w-20 h-6 bg-yellow-400 flex justify-center items-center">
              <span className="text-[10px] font-bold">HORN OK PLEASE</span>
            </div>
            
            <div 
              className="absolute -bottom-8 left-12 w-16 h-16 bg-black rounded-full border-4 border-gray-300 flex justify-center items-center"
              style={{ animation: 'spin 1s linear infinite' }}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
            <div 
              className="absolute -bottom-8 right-12 w-16 h-16 bg-black rounded-full border-4 border-gray-300 flex justify-center items-center"
              style={{ animation: 'spin 1s linear infinite' }}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 left-10 w-4 h-2 bg-black animate-bird-1"></div>
      <div className="absolute top-40 right-20 w-4 h-2 bg-black animate-bird-2"></div>
      <div className="absolute top-60 left-40 w-4 h-2 bg-black animate-bird-3"></div>
      
      <div className="absolute bottom-28 right-20 w-12 h-20 animate-bounce">
        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
        <div className="w-6 h-12 bg-purple-500 ml-1"></div>
        <div className="w-2 h-6 bg-purple-500 absolute bottom-0 left-0"></div>
        <div className="w-2 h-6 bg-purple-500 absolute bottom-0 right-0"></div>
      </div>
      
      {foodItems.map((item) => (
        <div 
          key={item.id}
          className={`absolute ${item.type === 'samosa' ? 'samosa' : 'potato'} filter drop-shadow-glow`}
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size * (item.type === 'samosa' ? 0.8 : 1),
          }}
        >
          {item.type === 'samosa' ? (
            <div className="w-full h-full bg-yellow-700 clip-samosa glow"></div>
          ) : (
            <div className="w-full h-full bg-yellow-800 rounded-lg glow"></div>
          )}
        </div>
      ))}
      
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-blue-900 opacity-30 pointer-events-none"></div>
      )}
      
      <style>
        {`
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
        
        @keyframes smoke-float-1 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateX(-20px) translateY(-20px) scale(2); opacity: 0; }
        }
        
        @keyframes smoke-float-2 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateX(-15px) translateY(-25px) scale(2.5); opacity: 0; }
        }
        
        @keyframes smoke-float-3 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateX(-10px) translateY(-30px) scale(3); opacity: 0; }
        }
        
        .animate-bird-1 {
          animation: bird-float-1 15s linear infinite;
          top: 10%;
        }
        
        .animate-bird-2 {
          animation: bird-float-2 18s linear infinite;
          top: 15%;
        }
        
        .animate-bird-3 {
          animation: bird-float-3 20s linear infinite;
          top: 20%;
        }
        
        .animate-cloud-1 {
          animation: cloud-float-1 40s linear infinite;
        }
        
        .animate-cloud-2 {
          animation: cloud-float-2 50s linear infinite;
        }
        
        .animate-cloud-3 {
          animation: cloud-float-3 45s linear infinite;
        }
        
        .animate-smoke-1 {
          animation: smoke-float-1 2s ease-out forwards;
        }
        
        .animate-smoke-2 {
          animation: smoke-float-2 2s ease-out 0.2s forwards;
        }
        
        .animate-smoke-3 {
          animation: smoke-float-3 2s ease-out 0.4s forwards;
        }
        
        .animate-car-shake {
          animation: car-shake 0.1s ease-in-out infinite alternate;
        }
        
        @keyframes car-shake {
          0% { transform: translateX(-2px) translateY(0); }
          25% { transform: translateX(0) translateY(-2px); }
          50% { transform: translateX(2px) translateY(0); }
          75% { transform: translateX(0) translateY(2px); }
          100% { transform: translateX(-2px) translateY(0); }
        }
        
        .clip-samosa {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .shadow-headlight {
          box-shadow: 0 0 15px 10px rgba(255, 255, 200, 0.8);
        }
        
        .rain {
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
          background-size: 20px 100px;
          animation: rain 0.3s linear infinite;
          opacity: 0.5;
        }
        
        .rain.heavy {
          opacity: 0.7;
          background-size: 30px 150px;
        }
        
        @keyframes rain {
          0% { background-position: 0px 0px; }
          100% { background-position: 20px 100px; }
        }
        
        .lightning {
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255,0);
          animation: lightning 6s linear infinite;
        }
        
        @keyframes lightning {
          0%, 20%, 40%, 60%, 80%, 100% { background-color: rgba(255,255,255,0); }
          15%, 35%, 55%, 75%, 95% { background-color: rgba(255,255,255,0.1); }
          17%, 37%, 57%, 77%, 97% { background-color: rgba(255,255,255,0.3); }
          18%, 38%, 58%, 78%, 98% { background-color: rgba(255,255,255,0); }
        }
        
        .glow {
          filter: drop-shadow(0 0 8px #ffcc00);
          transition: all 0.3s ease;
        }
        
        .glow:hover {
          filter: drop-shadow(0 0 15px #ffcc00);
          transform: scale(1.3);
        }
        `}
      </style>
    </div>
  );
};

export default RoadTripBackground;
