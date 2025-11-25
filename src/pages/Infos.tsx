import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Infos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 pb-32 md:pb-40">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* French Version */}
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">INFOS</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-base md:text-lg leading-relaxed">
                Le CraCraKrew (CCK) est un collectif artistique transfrontalier et une plateforme de production en devenir, opérant entre l'effervescence de Paris et de Berlin. Né d'une volonté de décloisonner les disciplines, le crew explore un spectre créatif vaste, allant de la production musicale à l'écriture, en passant par la vidéo, la photographie et les arts graphiques.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Tissant des liens entre l'esthétique « cracra » — brute, texturée et spontanée — et une éthique de respect mutuel, le CCK cultive une atmosphère amicale propice à l'expérimentation radicale. Le collectif réunit les visions singulières de Don Badder, Résidence de la Gare, Pablo Hassan, Joz, Yacine Bennacef, Jaysee, Ra3d.ani et lou.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Porté par une ambition de structuration en label de production, le CraCraKrew constitue aujourd'hui un univers artistique distinct et mouvant, dédié aux formes d'expression libres et authentiques.
              </p>
            </div>
          </section>

          {/* English Version */}
          <section className="space-y-4 border-t border-border pt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-base md:text-lg leading-relaxed">
                CraCraKrew (CCK) is a cross-border artistic collective and emerging production house bridging the gap between Paris and Berlin. Founded on principles of raw authenticity and communal respect, the crew navigates a fluid creative spectrum ranging from music production and creative writing to cinematography and photography.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Embracing a "cracra" aesthetic—gritty, textured, and unfiltered—the collective fosters a friendly environment for boundary-pushing experimentation. The roster unites the distinct voices of Don Badder, Résidence de la Gare, Pablo Hassan, Joz, Yacine Bennacef, Jaysee, Ra3d.ani, and lou.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Poised to evolve into a full-fledged production label, CCK represents an expanding artistic universe dedicated to thoughtful, multidisciplinary praxis and underground expression.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Infos;
