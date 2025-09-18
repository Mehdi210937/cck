import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

interface Visual {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  artist?: string;
  created_at: string;
}

const Visuels = () => {
  const [visuals, setVisuals] = useState<Visual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisuals();
  }, []);

  const fetchVisuals = async () => {
    try {
      const { data, error } = await supabase
        .from("visuels")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching visuals:", error);
      } else {
        setVisuals(data || []);
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
          <h1 className="text-4xl font-light tracking-tight mb-4">Visuals</h1>
          <p className="text-muted-foreground max-w-2xl">
            Visual artworks, graphics, and digital creations
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : visuals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No visuals available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {visuals.map((visual) => (
              <article key={visual.id} className="bg-card group">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img 
                    src={visual.image_url} 
                    alt={visual.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-medium mb-2">{visual.title}</h3>
                  
                  {visual.artist && (
                    <p className="text-sm text-muted-foreground mb-2">{visual.artist}</p>
                  )}
                  
                  {visual.description && (
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      {visual.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(visual.created_at).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      VIEW →
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

export default Visuels;