import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
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
  );
};

export default Index;
