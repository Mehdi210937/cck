import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import banniereCck from "@/assets/banniere-cck.mp4";
import { useForceAutoplay } from "@/hooks/useForceAutoplay";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Force autoplay on mobile (robust retries for iOS/Android) + sound toggle
  const { soundEnabled, toggleSound } = useForceAutoplay([videoRef1, videoRef2, videoRef3]);

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
      {/* Hero Video Section - Desktop: Full Screen */}
      <section className="hidden md:flex relative h-screen w-full items-center justify-center bg-black overflow-hidden">
        <video
          src={banniereCck}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Scroll Indicator with inverted colors */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity z-10 mix-blend-difference text-white"
          aria-label="Scroll vers le contenu"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={28} />
        </button>
      </section>

      {/* Hero Video Section - Mobile: 3 vidéos avec fond noir uni */}
      <section className="md:hidden flex flex-col min-h-screen bg-black relative">
        <div className="flex-1 flex items-center justify-center">
          <video
            ref={videoRef1}
            src={banniereCck}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-auto max-h-[32vh] object-contain"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <video
            ref={videoRef2}
            src={banniereCck}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-auto max-h-[32vh] object-contain"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <video
            ref={videoRef3}
            src={banniereCck}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-auto max-h-[32vh] object-contain"
          />
        </div>

        {/* Sound toggle button - Mobile only */}
        <button
          onClick={toggleSound}
          className="absolute top-4 right-4 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          aria-label={soundEnabled ? "Couper le son" : "Activer le son"}
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>

        {/* Scroll Indicator centré par rapport à l'écran */}
        <button
          onClick={scrollToContent}
          className="absolute top-2/3 left-[45vw] -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center gap-0.5 animate-bounce cursor-pointer hover:opacity-70 transition-opacity z-10"
          aria-label="Scroll vers le contenu"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} />
        </button>
      </section>

      {/* Main Content */}
      <div
        ref={contentRef}
        className={`pb-16 transition-all duration-700 ease-out ${
          isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Header />

        <main className="container mx-auto px-4 md:px-6 pb-20">
          {/* Desktop Layout */}
          <div className="hidden md:block space-y-1">
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
