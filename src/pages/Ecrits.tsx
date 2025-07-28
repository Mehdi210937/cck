import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

const Ecrits = () => {
  return (
    <div className="min-h-screen graffiti-bg">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-purple"
            data-text="TERRIFIANTS ECRITS"
          >
            TERRIFIANTS ECRITS
          </h1>
          <p className="text-xl text-cracra-pink">
            📝 Textes underground et rimes cracra 📝
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="cracra-hover border-cracra-purple">
              <CardHeader>
                <CardTitle className="text-cracra-purple">ÉCRIT TERRIFIANT #{i}</CardTitle>
                <CardDescription className="text-cracra-pink">
                  Des mots qui font mal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <Button className="w-full bg-cracra-purple hover:bg-cracra-pink">
                  LIRE CE TRUC
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ecrits;