import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { ContentViewer } from "@/components/ui/dialog-content";

const Sons = () => {
  const [sons, setSons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSons = async () => {
      const { data, error } = await supabase
        .from('sons')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSons(data);
      }
      setLoading(false);
    };

    loadSons();
  }, []);
  return (
    <div className="min-h-screen graffiti-bg">
      <Header />
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

        {loading ? (
          <div className="text-center text-cracra-yellow text-xl">
            Chargement des sons cracra...
          </div>
        ) : sons.length === 0 ? (
          <div className="text-center text-cracra-yellow text-xl">
            Aucun son pour le moment... 🎵
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sons.map((son) => (
              <Card key={son.id} className="cracra-hover border-cracra-yellow">
                <CardHeader>
                  <CardTitle className="text-cracra-yellow">{son.title}</CardTitle>
                  <CardDescription className="text-cracra-green">
                    {son.description || "Du son sale qui déchire"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <audio 
                      controls 
                      className="w-full"
                      src={son.audio_url}
                    >
                      Votre navigateur ne supporte pas l'audio.
                    </audio>
                  </div>
                  <ContentViewer
                    trigger={
                      <Button className="w-full bg-cracra-yellow text-black hover:bg-cracra-green">
                        ÉCOUTER CE SON
                      </Button>
                    }
                    title={son.title}
                    content={son.description || "Du son sale qui déchire"}
                    type="audio"
                    url={son.audio_url}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sons;