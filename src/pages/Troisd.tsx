import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

interface ThreeD {
  id: string;
  title: string;
  description?: string;
  model_url?: string;
  preview_url?: string;
  artist?: string;
  created_at: string;
}

const Troisd = () => {
  const [models, setModels] = useState<ThreeD[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const { data, error } = await supabase
        .from("troisd")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching 3D models:", error);
      } else {
        setModels(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-4">3D</h1>
          <p className="text-muted-foreground max-w-2xl">
            Three-dimensional models, sculptures, and digital environments
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : models.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No 3D models available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {models.map((model) => (
              <article key={model.id} className="bg-card group">
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  {model.preview_url ? (
                    <img 
                      src={model.preview_url} 
                      alt={model.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 border border-border flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">3D</span>
                      </div>
                      <span className="text-muted-foreground text-sm">No Preview</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-medium mb-2">{model.title}</h3>
                  
                  {model.artist && (
                    <p className="text-sm text-muted-foreground mb-2">{model.artist}</p>
                  )}
                  
                  {model.description && (
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      {model.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(model.created_at).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      VIEW MODEL →
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Troisd;