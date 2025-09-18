import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

const Index = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching news:", error);
      } else {
        setNews(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryRoute = (category: string) => {
    switch (category.toLowerCase()) {
      case 'videos':
        return '/videos';
      case 'audio':
        return '/sons';
      case 'texts':
        return '/ecrits';
      case 'visuals':
        return '/visuels';
      case '3d':
        return '/3d';
      default:
        return '/';
    }
  };

  const handleReadMore = (category: string) => {
    const route = getCategoryRoute(category);
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
              NEWS
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Latest updates and releases from the collective
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="mb-16">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground">
              {news.map((item) => (
                <article key={item.id} className="bg-background p-6 border border-foreground hover-invert">
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.category}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <h3 className="font-medium mb-3 leading-tight">
                    {item.title}
                  </h3>
                  
                  {(() => {
                    const title = item.title.toLowerCase();
                    if (title.includes('site en big marche')) {
                      return null; // No description for "Site en big marche"
                    } else if (title.includes('track underground en préparation')) {
                      return (
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          Un nouveau son immonde ?
                        </p>
                      );
                    } else if (title.includes('nouveau clip cracra dispo')) {
                      return (
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          un nouveau visuel des plus terrifiants?
                        </p>
                      );
                    } else {
                      // Default description for other news items
                      return (
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {item.content}
                        </p>
                      );
                    }
                  })()}
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs h-8 px-0"
                    onClick={() => handleReadMore(item.category)}
                  >
                    READ MORE →
                  </Button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 border-t border-foreground">
          <div className="max-w-lg mx-auto">
            <h3 className="text-2xl font-light mb-6">
              JOIN THE COLLECTIVE
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Become part of our creative community and access exclusive content, 
              events, and collaborations.
            </p>
            <Link to="/auth">
              <Button variant="outline" className="px-8">
                SIGN UP
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;