import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Sons = () => {
  return (
    <div className="min-h-screen graffiti-bg">
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-yellow"
            data-text="IMMONDES SONS"
          >
            IMMONDES SONS
          </h1>
          <p className="text-xl text-cracra-green">
            🎵 Beats underground et flows cracra 🎵
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="cracra-hover border-cracra-yellow">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">TRACK IMMONDE #{i}</CardTitle>
                <CardDescription className="text-cracra-green">
                  Du son sale qui déchire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🎵</span>
                </div>
                <Button className="w-full bg-cracra-yellow text-black hover:bg-cracra-green">
                  ÉCOUTER CE SON
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sons;