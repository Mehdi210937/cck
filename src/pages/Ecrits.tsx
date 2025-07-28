import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

const Ecrits = () => {
  const [ecrits, setEcrits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEcrits = async () => {
      const { data, error } = await supabase
        .from('ecrits')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setEcrits(data);
      }
      setLoading(false);
    };

    loadEcrits();
  }, []);
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

        {loading ? (
          <div className="text-center text-cracra-purple text-xl">
            Chargement des écrits cracra...
          </div>
        ) : ecrits.length === 0 ? (
          <div className="text-center text-cracra-purple text-xl">
            Aucun écrit pour le moment... 📝
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecrits.map((ecrit) => (
              <Card key={ecrit.id} className="cracra-hover border-cracra-purple">
                <CardHeader>
                  <CardTitle className="text-cracra-purple">{ecrit.title}</CardTitle>
                  <CardDescription className="text-cracra-pink">
                    Des mots qui font mal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 mb-4 min-h-[120px] overflow-hidden">
                    <p className="text-sm line-clamp-6 whitespace-pre-wrap">
                      {ecrit.content}
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-cracra-purple hover:bg-cracra-pink"
                    onClick={() => {
                      // Create a modal or expand the text
                      alert(ecrit.content);
                    }}
                  >
                    LIRE CE TRUC
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

export default Ecrits;