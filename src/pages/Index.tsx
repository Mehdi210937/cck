import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ParticleSystem from "@/components/ParticleSystem";
import SprayTag from "@/components/SprayTag";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNews(data || []);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);
  return (
    <div className="min-h-screen graffiti-bg cracra-cursor">
      <ParticleSystem />
      <SprayTag />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        {/* Hero Section - News Focus */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-green graffiti-shadow"
            data-text="CRACRA NEWS"
          >
            CRACRA NEWS
          </h1>
        </div>

        {/* Section News */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center text-cracra-green text-2xl">Chargement des news...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map(newsItem => (
                <Card key={newsItem.id} className="cracra-hover-intense spray-effect torn-edge border-cracra-green">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-cracra-yellow bg-muted px-2 py-1 rounded">
                        {newsItem.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(newsItem.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <CardTitle className="text-cracra-pink">{newsItem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground mb-4">
                      {newsItem.content}
                    </CardDescription>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "CRACRA MESSAGE",
                          description: "QUEL SERA TON PUT1 DE PROCHAIN MOUVEMENT ? DEGAGE YA RIEN A VOIR",
                          variant: "destructive",
                        });
                      }}
                      className="w-full bg-cracra-green hover:bg-cracra-pink cracra-shake"
                    >
                      VOIR PLUS 🍺
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-cracra-pink cracra-hover-intense spray-effect">
            <CardHeader>
              <CardTitle className="text-3xl text-cracra-pink graffiti-shadow">LES 10 COMMANDEMENTS CRACRA</CardTitle>
              <CardDescription className="text-lg text-cracra-yellow">Tu respecteras le code du CRACRA KREW 💀</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-left space-y-2 text-cracra-green font-mono">
                <p>1. Tu boiras de la 8.6, jamais de gin to</p>
                <p>2. Respecte PAPAFITO</p>
                <p>3. Tu créeras du contenu cracra peu importe ta shit 🎨</p>
                <p>4. Tu soutiendras tes zins du crew </p>
                <p>5. Tu garderas l'esprit ghetto vivant </p>
                <p>6. Tu partageras tes créations ignobles </p>
                <p>7. L'état du cul</p>
                <p>8. tu accepteras que la DMT est plus dégueu que toi</p>
                <p>9. Si c'est toi la DMT jtinvite a me sucer le paF</p>
                <p>10. CRACRA KREW VIE !</p>
              </div>
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full mt-6 bg-cracra-pink hover:bg-cracra-purple cracra-shake text-black font-bold"
              >
                REJOINDRE LE KREW 💀
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Index;