import { useEffect, useState } from 'react';

const NegativeSphere = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / 1000;
      const x = Math.sin(time * 0.5) * (window.innerWidth * 0.4) + (window.innerWidth * 0.5);
      const y = Math.cos(time * 0.3) * (window.innerHeight * 0.4) + (window.innerHeight * 0.5);
      setPosition({ x, y });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full"
      style={{
        width: '250px',
        height: '250px',
        left: `${position.x - 125}px`,
        top: `${position.y - 125}px`,
        background: 'white',
        mixBlendMode: 'difference',
        transition: 'left 0.05s linear, top 0.05s linear',
      }}
    />
  );
};

export default NegativeSphere;
