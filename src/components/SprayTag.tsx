import { useEffect, useState } from 'react';

const SprayTag = () => {
  const [tags, setTags] = useState<Array<{
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    color: string;
    visible: boolean;
  }>>([]);

  const tagTexts = ['CRACRA', '8.6', 'KREW', 'UNDERGROUND', 'NO GIN TONIC', 'SALE'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (tags.length < 3) {
        const newTag = {
          id: Date.now(),
          text: tagTexts[Math.floor(Math.random() * tagTexts.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          rotation: Math.random() * 40 - 20,
          color: ['--cracra-green', '--cracra-pink', '--cracra-yellow', '--cracra-purple'][Math.floor(Math.random() * 4)],
          visible: true
        };
        
        setTags(prev => [...prev, newTag]);
        
        // Remove tag after 8 seconds
        setTimeout(() => {
          setTags(prev => prev.filter(tag => tag.id !== newTag.id));
        }, 8000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [tags.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="absolute text-2xl font-bold opacity-30 animate-[spray-appear_1s_ease-out]"
          style={{
            left: `${tag.x}%`,
            top: `${tag.y}%`,
            transform: `rotate(${tag.rotation}deg)`,
            color: `hsl(var(${tag.color}))`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontFamily: 'monospace',
          }}
        >
          {tag.text}
        </div>
      ))}
    </div>
  );
};

export default SprayTag;