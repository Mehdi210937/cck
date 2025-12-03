interface HeroSectionProps {
  insightImage: string;
}

const HeroSection = ({ insightImage }: HeroSectionProps) => {
  return (
    <div className="flex gap-1 mb-1">
      {/* YouTube Video - 65% width */}
      <div className="flex-[2] overflow-hidden hover-invert transition-all duration-300">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/tOcCIcOuul8?autoplay=1&mute=1&loop=1&playlist=tOcCIcOuul8&controls=0&modestbranding=1&rel=0"
            title="CRACRAKREW Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      
      {/* Large Image - 35% width */}
      <div className="flex-[1] overflow-hidden hover-invert transition-all duration-300">
        <img 
          src={insightImage} 
          alt="CRACRAKREW Insight" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
