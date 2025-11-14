import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Ecrit {
  id: string;
  title: string;
  content: string;
  author?: string;
  created_at: string;
}

const Ecrits = () => {
  const [ecrits, setEcrits] = useState<Ecrit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEcrits();
  }, []);

  const fetchEcrits = async () => {
    try {
      const { data, error } = await supabase
        .from("ecrits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching ecrits:", error);
        setEcrits([]);
      } else {
        setEcrits(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setEcrits([]);
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
          <h1 className="text-4xl font-light tracking-tight mb-4">Texts</h1>
          <p className="text-muted-foreground max-w-2xl">
            Written works, essays, and literary experiments
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : ecrits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No texts available</p>
          </div>
        ) : (
          <div className="space-y-px bg-foreground">
            {ecrits.map((ecrit) => (
              <article key={ecrit.id} className="bg-background p-6 border border-foreground hover-invert">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium mb-2">{ecrit.title}</h3>
                    {ecrit.author && (
                      <p className="text-sm text-muted-foreground mb-2">{ecrit.author}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(ecrit.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {ecrit.content.length > 200 
                    ? `${ecrit.content.substring(0, 200)}...` 
                    : ecrit.content}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs">
                      READ FULL TEXT →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-medium mb-2">{ecrit.title}</h2>
                        {ecrit.author && (
                          <p className="text-muted-foreground mb-2">{ecrit.author}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(ecrit.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {ecrit.content}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Ecrits;