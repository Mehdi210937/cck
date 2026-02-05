import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";
import { ArrowDown } from "lucide-react";
import banniereCck from "@/assets/banniere-cck.mp4";
import banniereCckGif from "@/assets/banniere-cck.gif";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const scrollToContent = () => {
    if (contentRef.current) {
      const elementPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContentVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Video Section - Desktop */}
      <section className="hidden md:flex relative h-screen w-full items-center justify-center bg-black overflow-hidden">
        <video
          src={banniereCck}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Editorial title overlay */}
        <div className="absolute bottom-24 left-8 z-10 mix-blend-difference">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-3">
            Collectif artistique
          </p>
          <h1 className="text-6xl md:text-7xl font-serif text-white leading-none">
            CraCra<br />Krew
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-px bg-white/40" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
              Paris &mdash; Berlin
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 right-8 flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity z-10 mix-blend-difference text-white group"
          aria-label="Scroll vers le contenu"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            Explore
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </section>

      {/* Hero - Mobile */}
      <section className="md:hidden flex relative h-screen w-full items-center justify-center bg-black overflow-hidden">
        <img
          src={banniereCckGif}
          alt="Banniere CCK"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Editorial title overlay */}
        <div className="absolute bottom-20 left-6 z-10 mix-blend-difference">
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/60 mb-2">
            Collectif artistique
          </p>
          <h1 className="text-5xl font-serif text-white leading-none">
            CraCra<br />Krew
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-6 h-px bg-white/40" />
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">
              Paris &mdash; Berlin
            </span>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-6 right-6 text-white/60 flex items-center gap-2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity z-10 mix-blend-difference"
          aria-label="Scroll vers le contenu"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase">Explore</span>
          <ArrowDown size={12} />
        </button>
      </section>

      {/* Main Content */}
      <div
        ref={contentRef}
        className={`pb-16 transition-all duration-1000 ease-out ${
          isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Header />

        <main className="container mx-auto px-4 md:px-6 pb-20">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <DesktopGrid />
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <MobileGrid />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
