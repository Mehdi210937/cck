import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";
import { ChevronDown } from "lucide-react";
import banniereCck from "@/assets/banniere-cck.mp4";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Video Section - Full Screen */}
      <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        <video
          src={banniereCck}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain"
        />
        
        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity z-10"
          aria-label="Scroll vers le contenu"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={28} />
        </button>
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
