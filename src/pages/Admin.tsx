import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [existingNews, setExistingNews] = useState<any[]>([]);

  // Sons form
  const [sonTitle, setSonTitle] = useState('');
  const [sonDescription, setSonDescription] = useState('');
  const [sonFile, setSonFile] = useState<File | null>(null);

  // Videos form
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Visuels form
  const [visuelTitle, setVisuelTitle] = useState('');
  const [visuelDescription, setVisuelDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Ecrits form
  const [ecritTitle, setEcritTitle] = useState('');
  const [ecritContent, setEcritContent] = useState('');

  // 3D form
  const [troisDTitle, setTroisDTitle] = useState('');
  const [troisDDescription, setTroisDDescription] = useState('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);

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
        await loadExistingNews();
      } else {
        navigate('/');
        return;
      }
      
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  const loadExistingNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExistingNews(data);
    }
  };

  const uploadFile = async (file: File, bucket: string, path?: string) => {
    const fileName = path || `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const deleteNews = async (id: string) => {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "News supprimée ! 🗑️",
        description: "La news a été supprimée avec succès",
      });
      await loadExistingNews();
    }
  };

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
      await loadExistingNews();
    }
  };

  const handleSonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Son form submitted', { sonTitle, sonDescription, sonFile });
    
    if (!sonFile) {
      console.log('No son file selected');
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier audio",
        variant: "destructive",
      });
      return;
    }

    try {
      const audioUrl = await uploadFile(sonFile, 'audio');
      
      const { error } = await supabase
        .from('sons')
        .insert([{
          title: sonTitle,
          description: sonDescription,
          audio_url: audioUrl
        }]);

      if (error) throw error;

      toast({
        title: "Son ajouté ! 🎵",
        description: "Le son a été publié avec succès",
      });
      setSonTitle('');
      setSonDescription('');
      setSonFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"][accept="audio/*"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier vidéo",
        variant: "destructive",
      });
      return;
    }

    try {
      const videoUrl = await uploadFile(videoFile, 'videos');
      let thumbnailUrl = '';
      
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'images');
      }
      
      const { error } = await supabase
        .from('videos')
        .insert([{
          title: videoTitle,
          description: videoDescription,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl || null
        }]);

      if (error) throw error;

      toast({
        title: "Vidéo ajoutée ! 🎬",
        description: "La vidéo a été publiée avec succès",
      });
      setVideoTitle('');
      setVideoDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleVisuelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      });
      return;
    }

    try {
      const imageUrl = await uploadFile(imageFile, 'images');
      
      const { error } = await supabase
        .from('visuels')
        .insert([{
          title: visuelTitle,
          description: visuelDescription,
          image_url: imageUrl
        }]);

      if (error) throw error;

      toast({
        title: "Visuel ajouté ! 🎨",
        description: "Le visuel a été publié avec succès",
      });
      setVisuelTitle('');
      setVisuelDescription('');
      setImageFile(null);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEcritSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('ecrits')
      .insert([{
        title: ecritTitle,
        content: ecritContent
      }]);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Écrit ajouté ! ✍️",
        description: "L'écrit a été publié avec succès",
      });
      setEcritTitle('');
      setEcritContent('');
    }
  };

  const handleTroisDSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!modelFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier 3D",
        variant: "destructive",
      });
      return;
    }

    try {
      const modelUrl = await uploadFile(modelFile, 'models');
      let previewUrl = '';
      
      if (previewImageFile) {
        previewUrl = await uploadFile(previewImageFile, 'images');
      }
      
      const { error } = await supabase
        .from('troisd')
        .insert([{
          title: troisDTitle,
          description: troisDDescription,
          model_url: modelUrl,
          preview_image_url: previewUrl || null
        }]);

      if (error) throw error;

      toast({
        title: "Modèle 3D ajouté ! 🧊",
        description: "Le modèle 3D a été publié avec succès",
      });
      setTroisDTitle('');
      setTroisDDescription('');
      setModelFile(null);
      setPreviewImageFile(null);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Erreur de déconnexion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('Logout successful');
        navigate('/');
      }
    } catch (err) {
      console.error('Logout exception:', err);
    }
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
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="border-cracra-green text-cracra-green relative z-50 pointer-events-auto"
            style={{ position: 'relative', zIndex: 9999 }}
          >
            DECONNEXION 👋
          </Button>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="news" className="text-cracra-green relative z-50 pointer-events-auto">📰 News</TabsTrigger>
            <TabsTrigger value="sons" className="text-cracra-green relative z-50 pointer-events-auto">🎵 Sons</TabsTrigger>
            <TabsTrigger value="videos" className="text-cracra-green relative z-50 pointer-events-auto">🎬 Vidéos</TabsTrigger>
            <TabsTrigger value="visuels" className="text-cracra-green relative z-50 pointer-events-auto">🎨 Visuels</TabsTrigger>
            <TabsTrigger value="ecrits" className="text-cracra-green relative z-50 pointer-events-auto">✍️ Écrits</TabsTrigger>
            <TabsTrigger value="troisd" className="text-cracra-green relative z-50 pointer-events-auto">🧊 3D</TabsTrigger>
          </TabsList>

          {/* NEWS TAB */}
          <TabsContent value="news" className="space-y-6">
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

            {/* Existing News */}
            <Card className="border-cracra-pink cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">News existantes 🗂️</CardTitle>
                <CardDescription>Gérer les news publiées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingNews.map((news) => (
                    <div key={news.id} className="flex justify-between items-center p-4 border border-cracra-green rounded-lg">
                      <div>
                        <h3 className="font-bold text-cracra-pink">{news.title}</h3>
                        <p className="text-sm text-cracra-green">{news.category}</p>
                        <p className="text-xs text-gray-500">{new Date(news.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <Button 
                        onClick={() => deleteNews(news.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Supprimer 🗑️
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SONS TAB */}
          <TabsContent value="sons">
            <Card className="border-cracra-green cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-pink">Ajouter un Son 🎵</CardTitle>
                <CardDescription>Publier un fichier audio</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSonSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du son"
                    value={sonTitle}
                    onChange={(e) => setSonTitle(e.target.value)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Textarea
                    placeholder="Description (optionnel)"
                    value={sonDescription}
                    onChange={(e) => setSonDescription(e.target.value)}
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setSonFile(e.target.files?.[0] || null)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Button type="submit" className="bg-cracra-green hover:bg-cracra-pink cracra-shake relative z-50 pointer-events-auto">
                    Publier le Son 🎵
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VIDEOS TAB */}
          <TabsContent value="videos">
            <Card className="border-cracra-green cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-pink">Ajouter une Vidéo 🎬</CardTitle>
                <CardDescription>Publier un fichier vidéo</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre de la vidéo"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Textarea
                    placeholder="Description (optionnel)"
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Miniature (optionnel)"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Button type="submit" className="bg-cracra-green hover:bg-cracra-pink cracra-shake relative z-50 pointer-events-auto">
                    Publier la Vidéo 🎬
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VISUELS TAB */}
          <TabsContent value="visuels">
            <Card className="border-cracra-green cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-pink">Ajouter un Visuel 🎨</CardTitle>
                <CardDescription>Publier une image</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVisuelSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du visuel"
                    value={visuelTitle}
                    onChange={(e) => setVisuelTitle(e.target.value)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Textarea
                    placeholder="Description (optionnel)"
                    value={visuelDescription}
                    onChange={(e) => setVisuelDescription(e.target.value)}
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Button type="submit" className="bg-cracra-green hover:bg-cracra-pink cracra-shake relative z-50 pointer-events-auto">
                    Publier le Visuel 🎨
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ECRITS TAB */}
          <TabsContent value="ecrits">
            <Card className="border-cracra-green cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-pink">Ajouter un Écrit ✍️</CardTitle>
                <CardDescription>Publier un texte</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEcritSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre de l'écrit"
                    value={ecritTitle}
                    onChange={(e) => setEcritTitle(e.target.value)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Textarea
                    placeholder="Contenu de l'écrit"
                    value={ecritContent}
                    onChange={(e) => setEcritContent(e.target.value)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                    rows={8}
                  />
                  <Button type="submit" className="bg-cracra-green hover:bg-cracra-pink cracra-shake relative z-50 pointer-events-auto">
                    Publier l'Écrit ✍️
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3D TAB */}
          <TabsContent value="troisd">
            <Card className="border-cracra-green cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-pink">Ajouter un Modèle 3D 🧊</CardTitle>
                <CardDescription>Publier un fichier 3D</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTroisDSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du modèle 3D"
                    value={troisDTitle}
                    onChange={(e) => setTroisDTitle(e.target.value)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Textarea
                    placeholder="Description (optionnel)"
                    value={troisDDescription}
                    onChange={(e) => setTroisDDescription(e.target.value)}
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Input
                    type="file"
                    accept=".obj,.fbx,.gltf,.glb,.blend,.3ds"
                    onChange={(e) => setModelFile(e.target.files?.[0] || null)}
                    required
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Image d'aperçu (optionnel)"
                    onChange={(e) => setPreviewImageFile(e.target.files?.[0] || null)}
                    className="border-cracra-green focus:border-cracra-pink"
                  />
                  <Button type="submit" className="bg-cracra-green hover:bg-cracra-pink cracra-shake relative z-50 pointer-events-auto">
                    Publier le Modèle 3D 🧊
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
