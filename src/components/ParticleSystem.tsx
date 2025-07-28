import { useEffect, useState } from 'react';

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    const colors = ['--cracra-green', '--cracra-pink', '--cracra-yellow', '--cracra-purple'];
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            background: `hsl(var(${particle.color}))`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;