import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Archive = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />

      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="label-editorial mb-4">Archive</p>
        <h1 className="text-5xl md:text-7xl font-serif italic text-foreground/30">
          Coming soon
        </h1>
        <div className="w-12 h-px bg-accent/30 mt-8" />
      </main>

      <Footer />
    </div>
  );
};

export default Archive;
