import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";
import { ChevronDown } from "lucide-react";
import banniereCck from "@/assets/banniere-cck.mp4";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      const elementPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 80; // Ajuste cette valeur (80px de marge)

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity z-10 mix-blend-difference text-white"
          aria-label="Scroll vers le contenu"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={28} />
        </button>
      </section>

      {/* Hero Video Section - Mobile: 3 vidéos avec alternance de fonds */}
      <section className="md:hidden flex flex-col min-h-screen relative">
        <div className="flex-1 flex items-center justify-center bg-black">
          <video
            src={banniereCck}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto max-h-[32vh] object-contain"
          />
        </div>

        <div className="flex-1 flex items-center justify-center bg-white">
          <video
            src={banniereCck}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto max-h-[32vh] object-contain"
          />
        </div>

        {/* Scroll Indicator - Between 2nd and 3rd video */}
        <div className="bg-black py-2 flex justify-center">
          <button
            onClick={scrollToContent}
            className="text-white flex flex-col items-center gap-1 animate-bounce cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Scroll vers le contenu"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center bg-black">
          <video
            src={banniereCck}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto max-h-[32vh] object-contain"
          />
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="pb-16">
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
