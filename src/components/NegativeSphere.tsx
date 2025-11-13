import { useEffect, useState } from 'react';

const NegativeSphere = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth follow effect - increased to 0.2 for more fluidity
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      
      setMouse({ x: currentX, y: currentY });
      
      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { x: currentX, y: currentY, id: Date.now() }];
        return newTrail.slice(-5); // Reduced to 5 points for smoother trail
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            width: `${70 - index * 12}px`,
            height: `${70 - index * 12}px`,
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: 'translate(-50%, -50%)',
            background: 'hsl(var(--foreground))',
            mixBlendMode: 'difference',
            opacity: 0.25 - (index * 0.05),
            zIndex: 40,
          }}
        />
      ))}
      
      {/* Main sphere */}
      <div
        className="fixed pointer-events-none rounded-full"
        style={{
          width: '100px',
          height: '100px',
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'hsl(var(--foreground))',
          mixBlendMode: 'difference',
          zIndex: 50,
        }}
      />
    </>
  );
};

export default NegativeSphere;
