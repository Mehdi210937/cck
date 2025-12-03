import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";
import { releases, Release } from "@/data/releases";
import insightImage from "@/assets/insight-cracra.jpg";
import louPics from "@/assets/lou-pics.jpg";

type ContentItem = 
  | { type: 'image'; src: string; alt: string; }
  | { type: 'release'; data: Release; };

const Index = () => {
  const illustrations = [
    "/images/releases/mykindofbird.jpg",
    "/images/releases/mil.jpg",
    "/images/releases/mill.jpg"
  ];

  const contentItems: ContentItem[] = [
    { type: 'image', src: insightImage, alt: 'CRACRAKREW Insight' },
    { type: 'image', src: louPics, alt: 'Lou Pics' },
    ...illustrations.map(src => ({ type: 'image' as const, src, alt: 'CRACRAKREW Illustration' })),
    ...releases.map(release => ({ type: 'release' as const, data: release })),
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pb-20">
        {/* Desktop Layout */}
        <div className="hidden md:block space-y-1">
          <HeroSection insightImage={insightImage} />
          <DesktopGrid items={contentItems} excludeImage={insightImage} />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <MobileGrid items={contentItems} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
