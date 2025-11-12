import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Archive = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
            ARCHIVE
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Coming soon
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Archive;
