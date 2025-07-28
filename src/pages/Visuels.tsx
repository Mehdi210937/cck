import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

const Visuels = () => {
  const [visuels, setVisuels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisuels = async () => {
      const { data, error } = await supabase
        .from('visuels')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setVisuels(data);
      }
      setLoading(false);
    };

    loadVisuels();
  }, []);
  return (
    <div className="min-h-screen graffiti-bg">
      <Header />
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

        {loading ? (
          <div className="text-center text-cracra-green text-xl">
            Chargement des visuels cracra...
          </div>
        ) : visuels.length === 0 ? (
          <div className="text-center text-cracra-green text-xl">
            Aucun visuel pour le moment... 🎨
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visuels.map((visuel) => (
              <Card key={visuel.id} className="cracra-hover border-cracra-green">
                <CardHeader>
                  <CardTitle className="text-cracra-green">{visuel.title}</CardTitle>
                  <CardDescription className="text-cracra-purple">
                    {visuel.description || "Design sale et créatif"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={visuel.image_url} 
                      alt={visuel.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23333'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='white'%3E🎨%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <Button 
                    className="w-full bg-cracra-green hover:bg-cracra-purple"
                    onClick={() => window.open(visuel.image_url, '_blank')}
                  >
                    VOIR CETTE ŒUVRE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Visuels;