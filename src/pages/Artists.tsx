import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const Artists = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
            ARTISTS
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Coming soon
          </p>
        </div>
      </main>
    </div>
  );
};

export default Artists;
