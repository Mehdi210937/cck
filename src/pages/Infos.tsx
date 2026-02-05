import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Infos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 pb-32 md:pb-40">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* French Version */}
          <section className="space-y-8">
            <div>
              <p className="label-editorial mb-3">A propos</p>
              <h1 className="text-5xl md:text-7xl font-serif italic">Infos</h1>
            </div>
            <div className="space-y-6">
              <p className="text-sm md:text-base leading-[1.8] text-foreground/80">
                Le CraCraKrew (CCK) est un collectif artistique transfrontalier et une plateforme de production en devenir, operant entre l'effervescence de Paris et de Berlin. Ne d'une volonte de decloisonner les disciplines, le crew explore un spectre creatif vaste, allant de la production musicale a l'ecriture, en passant par la video, la photographie et les arts graphiques.
              </p>
              <p className="text-sm md:text-base leading-[1.8] text-foreground/80">
                Tissant des liens entre l'esthetique &laquo; cracra &raquo; &mdash; brute, texturee et spontanee &mdash; et une ethique de respect mutuel, le CCK cultive une atmosphere amicale propice a l'experimentation radicale. Le collectif reunit les visions singulieres de <span className="text-accent">Don Badder</span>, <span className="text-accent">Residence de la Gare</span>, <span className="text-accent">Pablo Hassan</span>, <span className="text-accent">Joz</span>, <span className="text-accent">Yacine Bennacef</span>, <span className="text-accent">Jaysee</span>, <span className="text-accent">Ra3d.ani</span> et <span className="text-accent">lou</span>.
              </p>
              <p className="text-sm md:text-base leading-[1.8] text-foreground/80">
                Porte par une ambition de structuration en label de production, le CraCraKrew constitue aujourd'hui un univers artistique distinct et mouvant, dedie aux formes d'expression libres et authentiques.
              </p>
            </div>
          </section>

          {/* Separator */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">EN</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          {/* English Version */}
          <section className="space-y-6">
            <div className="space-y-6">
              <p className="text-sm md:text-base leading-[1.8] text-foreground/70">
                CraCraKrew (CCK) is a cross-border artistic collective and emerging production house bridging the gap between Paris and Berlin. Founded on principles of raw authenticity and communal respect, the crew navigates a fluid creative spectrum ranging from music production and creative writing to cinematography and photography.
              </p>
              <p className="text-sm md:text-base leading-[1.8] text-foreground/70">
                Embracing a "cracra" aesthetic&mdash;gritty, textured, and unfiltered&mdash;the collective fosters a friendly environment for boundary-pushing experimentation. The roster unites the distinct voices of Don Badder, Residence de la Gare, Pablo Hassan, Joz, Yacine Bennacef, Jaysee, Ra3d.ani, and lou.
              </p>
              <p className="text-sm md:text-base leading-[1.8] text-foreground/70">
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
