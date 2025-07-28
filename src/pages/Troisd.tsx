import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

const Troisd = () => {
  const [troisd, setTroisd] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTroisd = async () => {
      const { data, error } = await supabase
        .from('troisd')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTroisd(data);
      }
      setLoading(false);
    };

    loadTroisd();
  }, []);
  return (
    <div className="min-h-screen graffiti-bg">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-pink"
            data-text="IGNOBLE 3D"
          >
            IGNOBLE 3D
          </h1>
          <p className="text-xl text-cracra-yellow">
            🗿 Modélisation cracra et animations underground 🗿
          </p>
        </div>

        {loading ? (
          <div className="text-center text-cracra-pink text-xl">
            Chargement des modèles 3D cracra...
          </div>
        ) : troisd.length === 0 ? (
          <div className="text-center text-cracra-pink text-xl">
            Aucun modèle 3D pour le moment... 🗿
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {troisd.map((model) => (
              <Card key={model.id} className="cracra-hover border-cracra-pink">
                <CardHeader>
                  <CardTitle className="text-cracra-pink">{model.title}</CardTitle>
                  <CardDescription className="text-cracra-yellow">
                    {model.description || "Modèle 3D underground"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {model.preview_image_url ? (
                      <img 
                        src={model.preview_image_url} 
                        alt={model.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            parent.innerHTML = '<span class="text-6xl">🗿</span>';
                          }
                        }}
                      />
                    ) : (
                      <span className="text-6xl">🗿</span>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-cracra-pink hover:bg-cracra-yellow text-black"
                    onClick={() => window.open(model.model_url, '_blank')}
                  >
                    VOIR CE MODÈLE
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

export default Troisd;