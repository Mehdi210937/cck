import { useEffect, useState } from 'react';

const NegativeSphere = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      // Inverse x and y axes
      mouseX = window.innerWidth - e.clientX;
      mouseY = window.innerHeight - e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth follow effect
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      
      setMouse({ x: currentX, y: currentY });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
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
  );
};

export default NegativeSphere;
