import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Visuels = () => {
  return (
    <div className="min-h-screen graffiti-bg">
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-green"
            data-text="INFÂMES VISUELS"
          >
            INFÂMES VISUELS
          </h1>
          <p className="text-xl text-cracra-purple">
            🎨 Art cracra et designs underground 🎨
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="cracra-hover border-cracra-green">
              <CardHeader>
                <CardTitle className="text-cracra-green">VISUEL INFÂME #{i}</CardTitle>
                <CardDescription className="text-cracra-purple">
                  Design sale et créatif
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
                <Button className="w-full bg-cracra-green hover:bg-cracra-purple">
                  VOIR CETTE ŒUVRE
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visuels;