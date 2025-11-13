import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Artists = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[
            "PABLO HASSAN",
            "RESIDENCE DE LA GARE",
            "JOZ",
            "YACINE BENNACEF",
            "DON BAADER",
            "JAYSEE",
            "RA3D.ANI",
            "DJ BRAD'FER"
          ].map((artist) => (
            <div
              key={artist}
              className="border border-border p-6 hover-invert transition-all cursor-pointer"
            >
              <h2 className="text-2xl font-bold">{artist}</h2>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Artists;
