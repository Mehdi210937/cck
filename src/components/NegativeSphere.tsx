import { useEffect, useState } from 'react';

const NegativeSphere = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = window.innerWidth - e.clientX;
      mouseY = window.innerHeight - e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      setMouse({ x: currentX, y: currentY });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  return (
    <div
      className="fixed pointer-events-none rounded-full hidden md:block"
      style={{
        width: '80px',
        height: '80px',
        left: `${mouse.x}px`,
        top: `${mouse.y}px`,
        transform: 'translate(-50%, -50%)',
        background: 'hsl(var(--foreground))',
        mixBlendMode: 'difference',
        zIndex: 50,
        opacity: isVisible ? 0.9 : 0,
        transition: 'opacity 0.8s ease',
      }}
    />
  );
};

export default NegativeSphere;
