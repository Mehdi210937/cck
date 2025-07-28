import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ParticleSystem from '@/components/ParticleSystem';
import SprayTag from '@/components/SprayTag';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // News form
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('');

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      
      // Check if user is admin
      if (session.user.email === 'cracrakrew@gmail.com') {
        setIsAdmin(true);
      } else {
        navigate('/');
        return;
      }
      
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('news')
      .insert([{
        title: newsTitle,
        content: newsContent,
        category: newsCategory
      }]);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "News ajoutée ! 🎉",
        description: "La nouvelle a été publiée avec succès",
      });
      setNewsTitle('');
      setNewsContent('');
      setNewsCategory('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen graffiti-bg cracra-cursor flex items-center justify-center">
        <div className="text-cracra-green text-2xl">Chargement...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen graffiti-bg cracra-cursor">
      <ParticleSystem />
      <SprayTag />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cracra-pink graffiti-shadow">
            ADMIN CRACRA KREW 👑
          </h1>
          <Button onClick={handleLogout} variant="outline" className="border-cracra-green text-cracra-green">
            Déconnexion
          </Button>
        </div>

        <div className="grid gap-8">
          {/* Add News */}
          <Card className="border-cracra-green cracra-hover-intense spray-effect">
            <CardHeader>
              <CardTitle className="text-cracra-pink">Ajouter une News 📰</CardTitle>
              <CardDescription>Publier une nouvelle pour le crew</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsSubmit} className="space-y-4">
                <Input
                  placeholder="Titre de la news"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  required
                  className="border-cracra-green focus:border-cracra-pink"
                />
                <Textarea
                  placeholder="Contenu de la news"
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  required
                  className="border-cracra-green focus:border-cracra-pink"
                />
                <Input
                  placeholder="Catégorie (VIDEO, SON, VISUEL, etc.)"
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  required
                  className="border-cracra-green focus:border-cracra-pink"
                />
                <Button type="submit" className="bg-cracra-green hover:bg-cracra-pink cracra-shake">
                  Publier la News 🚀
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Other sections will be added later */}
          <Card className="border-cracra-pink cracra-hover-intense spray-effect">
            <CardHeader>
              <CardTitle className="text-cracra-yellow">Autres sections</CardTitle>
              <CardDescription>Gestion des vidéos, sons, écrits, visuels et 3D à venir...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
