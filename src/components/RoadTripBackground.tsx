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
  const [signText, setSignText] = useState('WRONG WAY');
  const [stars, setStars] = useState<Array<{ id: number, x: number, y: number }>>([]);
  const [distortionLevel, setDistortionLevel] = useState(1);
  const signRef = useRef<HTMLDivElement>(null);
  
  // Array of random road trip related texts for the sign
  const signTexts = [
    'WRONG WAY', 
    'DETOUR AHEAD', 
    'POTATO STOP', 
    'U TURN ONLY',
    'BEWARE OF SAMOSAS', 
    'ROAD TRIP FOREVER', 
    'ARE WE THERE YET?',
    'NEXT EXIT: NOWHERE', 
    'CHAOS AHEAD',
    'TURN AROUND'
  ];
  
  // Change sign text periodically
  useEffect(() => {
    const textChangeInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * signTexts.length);
      setSignText(signTexts[randomIndex]);
    }, 3000);
    
    return () => clearInterval(textChangeInterval);
  }, []);
  
  // Handle mouse position to calculate distortion level for the sign
  useEffect(() => {
    if (signRef.current) {
      const signRect = signRef.current.getBoundingClientRect();
      const signCenterX = signRect.left + signRect.width / 2;
      const signCenterY = signRect.top + signRect.height / 2;
      
      // Calculate distance from mouse to sign center
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - signCenterX, 2) + 
        Math.pow(mousePosition.y - signCenterY, 2)
      );
      
      // Normalize distance to a distortion level
      // Close to sign = high distortion, far from sign = low distortion
      const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
      const newDistortion = Math.max(1, 5 - (distance / maxDistance) * 4);
      
      setDistortionLevel(newDistortion);
    }
  }, [mousePosition]);
  
  // Create stars on mouse move
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;
    
    const newStar = {
      id: Date.now(),
      x: mousePosition.x,
      y: mousePosition.y,
    };
    
    // Keep only most recent stars (limit to 15)
    setStars(prev => [...prev.slice(-14), newStar]);
  }, [mousePosition]);

  // Generate mini cars that will be affected by mouse movement
  const [miniCars, setMiniCars] = useState<Array<{ 
    id: number, 
    x: number, 
    y: number, 
    rotation: number, 
    color: string 
  }>>([]);

  // Initialize mini cars
  useEffect(() => {
    const initialCars = Array(8).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setMiniCars(initialCars);
  }, []);

  // Update mini car positions based on mouse
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;

    setMiniCars(prev => prev.map(car => {
      const dx = mousePosition.x - car.x;
      const dy = mousePosition.y - car.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // The direction is away from the mouse
      const angle = Math.atan2(dy, dx) + Math.PI;
      
      // Effect radius
      const effectRadius = 200;
      
      if (distance < effectRadius) {
        // Strength is inverse to distance
        const strength = (effectRadius - distance) / effectRadius;
        
        // New position moving away from mouse
        const newX = car.x + Math.cos(angle) * strength * 10;
        const newY = car.y + Math.sin(angle) * strength * 10;
        
        // Keep cars within viewport
        const boundedX = Math.min(Math.max(0, newX), window.innerWidth);
        const boundedY = Math.min(Math.max(0, newY), window.innerHeight);
        
        // New rotation follows direction of movement
        const newRotation = (angle * 180 / Math.PI) + 90;
        
        return { 
          ...car, 
          x: boundedX, 
          y: boundedY,
          rotation: newRotation
        };
      }
      return car;
    }));
  }, [mousePosition]);
  
  // Generate stylized food items (potatoes and samosas)
  const [foodItems, setFoodItems] = useState<Array<{ 
    id: number, 
    x: number, 
    y: number, 
    rotation: number, 
    type: 'potato' | 'samosa',
    scale: number
  }>>([]);
  
  // Initialize food items
  useEffect(() => {
    const initialFood = Array(10).fill(0).map((_, i) => ({
      id: i + 100,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      type: Math.random() > 0.5 ? 'potato' as const : 'samosa' as const,
      scale: 0.7 + Math.random() * 0.6
    }));
    setFoodItems(initialFood);
  }, []);
  
  // Update food items based on mouse
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;
    
    setFoodItems(prev => prev.map(item => {
      const dx = mousePosition.x - item.x;
      const dy = mousePosition.y - item.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Effect radius
      const effectRadius = 300;
      
      if (distance < effectRadius) {
        // New rotation as response to mouse proximity
        const newRotation = item.rotation + (Math.random() > 0.5 ? 5 : -5);
        
        // Scale up when mouse is near
        const scaleBoost = (effectRadius - distance) / effectRadius * 0.3;
        const newScale = Math.min(1.5, item.scale + scaleBoost);
        
        return { ...item, rotation: newRotation, scale: newScale };
      }
      
      // Gradually return to normal scale
      return { 
        ...item, 
        scale: Math.max(item.scale * 0.995, 0.7 + Math.random() * 0.3) 
      };
    }));
  }, [mousePosition]);
  
  // Generate birds that circle the mouse cursor
  const [birds, setBirds] = useState<Array<{ 
    id: number, 
    angle: number, 
    distance: number,
    speed: number,
    size: number
  }>>([]);
  
  // Initialize birds
  useEffect(() => {
    const initialBirds = Array(6).fill(0).map((_, i) => ({
      id: i + 200,
      angle: (Math.PI * 2 / 6) * i,
      distance: 50 + Math.random() * 30,
      speed: 0.03 + Math.random() * 0.05,
      size: 12 + Math.random() * 8
    }));
    setBirds(initialBirds);
  }, []);
  
  // Update bird positions to circle around mouse
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;
    
    const birdUpdateInterval = setInterval(() => {
      setBirds(prev => prev.map(bird => ({
        ...bird,
        angle: bird.angle + bird.speed
      })));
    }, 30);
    
    return () => clearInterval(birdUpdateInterval);
  }, []);

  // Calculate trail points for mouse movement
  const [trails, setTrails] = useState<Array<{
    id: number,
    points: Array<{x: number, y: number}>,
    color: string
  }>>([]);
  
  // Update trails based on mouse movement
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;
    
    // Create new trail if none exists or add point to existing trail
    setTrails(prev => {
      if (prev.length === 0 || prev[prev.length-1].points.length > 10) {
        // Create a new trail with random color
        return [...prev.slice(-2), {
          id: Date.now(),
          points: [{ x: mousePosition.x, y: mousePosition.y }],
          color: `hsl(${Math.random() * 360}, 80%, 60%)`
        }];
      } else {
        // Add point to existing trail
        const updatedTrails = [...prev];
        const currentTrail = { ...updatedTrails[updatedTrails.length - 1] };
        currentTrail.points = [...currentTrail.points, { x: mousePosition.x, y: mousePosition.y }];
        updatedTrails[updatedTrails.length - 1] = currentTrail;
        return updatedTrails;
      }
    });
  }, [mousePosition]);
  
  // Fade out trails over time
  useEffect(() => {
    const trailFadeInterval = setInterval(() => {
      setTrails(prev => prev.map(trail => ({
        ...trail,
        points: trail.points.slice(1)
      })).filter(trail => trail.points.length > 0));
    }, 200);
    
    return () => clearInterval(trailFadeInterval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Dynamic background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 animate-pulse-slow">
        {/* Swirling patterns */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
              <feDisplacementMap in="SourceGraphic" scale="50" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" fill="none" />
          </svg>
        </div>
        
        {/* Abstract highway lines */}
        <div className="absolute inset-0">
          <div className="absolute h-full w-full flex flex-col justify-center items-center">
            <div className="w-[200%] h-1 bg-yellow-300 opacity-40 transform -rotate-12 translate-y-20"></div>
            <div className="w-[200%] h-1 bg-yellow-300 opacity-40 transform -rotate-6 translate-y-16"></div>
            <div className="w-[200%] h-1 bg-yellow-300 opacity-40 translate-y-12"></div>
            <div className="w-[200%] h-1 bg-yellow-300 opacity-40 transform rotate-6 translate-y-8"></div>
            <div className="w-[200%] h-1 bg-yellow-300 opacity-40 transform rotate-12 translate-y-4"></div>
          </div>
        </div>
      </div>

      {/* Mouse movement trails */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        {trails.map(trail => (
          <polyline 
            key={trail.id}
            points={trail.points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={trail.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1, 10"
            className="opacity-70"
          />
        ))}
      </svg>
      
      {/* Distorted Road Sign (central element) */}
      <div 
        ref={signRef}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-60 ${shake ? 'animate-shake' : ''}`}
        style={{
          transform: `translate(-50%, -50%) scale(${distortionLevel < 2 ? 1 : distortionLevel * 0.8}) 
                     rotate(${(distortionLevel - 1) * 5}deg) 
                     skew(${(distortionLevel - 1) * 3}deg, ${(distortionLevel - 1) * -3}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Metal sign post */}
        <div className="absolute left-1/2 -bottom-20 w-6 h-48 bg-gray-400 rounded-sm transform -translate-x-1/2 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
        </div>
        
        {/* The sign itself */}
        <div 
          className="absolute inset-0 bg-yellow-500 rounded-lg border-8 border-black shadow-xl overflow-hidden"
          style={{
            boxShadow: `0 0 ${10 + distortionLevel * 5}px rgba(255, 255, 0, ${0.3 + distortionLevel * 0.1})`,
            transform: `perspective(600px) rotateX(${(distortionLevel - 1) * 10}deg)`,
          }}
        >
          {/* Reflective surface */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-yellow-500/10 to-yellow-600/30 mix-blend-overlay"></div>
          
          {/* Sign text */}
          <div 
            className="absolute inset-0 flex items-center justify-center font-black text-3xl text-black text-center p-4 tracking-wide"
            style={{
              transform: `scale(${0.8 + (Math.sin(Date.now() * 0.001) + 1) * 0.1}) 
                         rotate(${(distortionLevel - 1) * -2}deg)`,
              letterSpacing: `${distortionLevel * 1}px`,
              textShadow: `${(distortionLevel - 1) * 2}px ${(distortionLevel - 1) * 2}px 0px rgba(0,0,0,0.3)`,
            }}
          >
            {signText}
          </div>
        </div>
      </div>
      
      {/* Mini cars */}
      {miniCars.map(car => (
        <div 
          key={car.id}
          className="absolute w-12 h-6 transition-transform duration-200"
          style={{
            left: car.x + 'px',
            top: car.y + 'px',
            transform: `rotate(${car.rotation}deg)`,
          }}
        >
          {/* Car body */}
          <div 
            className="absolute inset-0 rounded-md"
            style={{ backgroundColor: car.color }}
          >
            {/* Windows */}
            <div className="absolute top-1 left-2 right-2 h-2 bg-blue-200 rounded-t-sm"></div>
            
            {/* Headlights */}
            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-yellow-100 rounded-full"></div>
            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>
      ))}
      
      {/* Food items (potatoes and samosas) */}
      {foodItems.map(item => (
        <div 
          key={item.id}
          className="absolute w-12 h-12 pointer-events-none transition-all duration-300 animate-bounce-slow"
          style={{
            left: item.x + 'px',
            top: item.y + 'px',
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
          }}
        >
          {item.type === 'potato' ? (
            <div className="w-full h-full bg-amber-700 rounded-full relative overflow-hidden">
              <div className="absolute top-1 left-2 w-2 h-1 bg-amber-900 rounded-full"></div>
              <div className="absolute bottom-2 right-3 w-3 h-1.5 bg-amber-900 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 via-transparent to-amber-800/30"></div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-amber-500 transform rotate-45 scale-75 translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-transparent to-amber-600/30"></div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-amber-600 transform -rotate-45 origin-bottom-right scale-75">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-amber-700/30"></div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse-slow filter blur-sm"></div>
        </div>
      ))}
      
      {/* Birds circling cursor */}
      {birds.map(bird => {
        // Calculate position based on angle and distance from mouse
        const x = mousePosition.x + Math.cos(bird.angle) * bird.distance;
        const y = mousePosition.y + Math.sin(bird.angle) * bird.distance;
        
        return (
          <div 
            key={bird.id}
            className="absolute pointer-events-none"
            style={{
              left: x + 'px',
              top: y + 'px',
              transform: `translate(-50%, -50%) rotate(${bird.angle * 180 / Math.PI + 90}deg)`,
            }}
          >
            {/* Simplified bird shape */}
            <svg width={bird.size * 2} height={bird.size * 2} viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 3C16 8 21 8 21 12C21 16 16 16 12 21C8 16 3 16 3 12C3 8 8 8 12 3Z" 
                fill="#FFD166"
                stroke="#333"
                strokeWidth="1"
              />
              <circle cx="10" cy="10" r="1" fill="#333" />
              <circle cx="14" cy="10" r="1" fill="#333" />
            </svg>
          </div>
        );
      })}

      {/* Stars triggered by mouse hover */}
      {stars.map((star) => (
        <div 
          key={star.id}
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            left: star.x - 20,
            top: star.y - 20,
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        @keyframes star-twinkle {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-star-twinkle {
          animation: star-twinkle 1.5s ease-in-out infinite;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(-2px) translateY(0); }
          25% { transform: translateX(0) translateY(-2px); }
          50% { transform: translateX(2px) translateY(0); }
          75% { transform: translateX(0) translateY(2px); }
          100% { transform: translateX(-2px) translateY(0); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
};

export default RoadTripBackground;
