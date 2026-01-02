
import React, { useMemo } from 'react';

const BackgroundStars: React.FC = () => {
  const elements = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 15}s`,
      delay: `${-Math.random() * 20}s`,
      size: `${1 + Math.random() * 1.5}rem`,
      content: ['❄️', '🎁', '❅', '🎅', '🎄', '🍬'][Math.floor(Math.random() * 6)]
    }));
  }, []);

  const bulbs = Array.from({ length: 25 }).map((_, i) => ({
    color: ['#ff0000', '#00ff00', '#ffd700', '#0000ff', '#ffffff'][i % 5],
    speed: `${0.5 + Math.random() * 1}s`,
    delay: `${Math.random() * 1}s`
  }));

  return (
    <>
      <div className="garland">
        {bulbs.map((bulb, i) => (
          <div 
            key={i} 
            className="bulb" 
            style={{ 
              backgroundColor: bulb.color, 
              // @ts-ignore
              '--color': bulb.color, 
              '--speed': bulb.speed,
              animationDelay: bulb.delay 
            }} 
          />
        ))}
      </div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-950/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-green-950/20 blur-[150px] rounded-full" />
        
        {elements.map((el) => (
          <div
            key={el.id}
            className="falling-item"
            style={{
              left: el.left,
              // @ts-ignore
              '--duration': el.duration,
              animationDelay: el.delay,
              fontSize: el.size,
            }}
          >
            {el.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundStars;
