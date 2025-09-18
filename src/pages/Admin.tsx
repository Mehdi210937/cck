import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { EditForm } from '@/components/ui/dialog-content';

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
  const [editingNews, setEditingNews] = useState<any>(null);

  // Sons form
  const [sonTitle, setSonTitle] = useState('');
  const [sonDescription, setSonDescription] = useState('');
  const [sonFile, setSonFile] = useState<File | null>(null);
  const [existingSons, setExistingSons] = useState<any[]>([]);
  const [editingSon, setEditingSon] = useState<any>(null);

  // Videos form
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingVideos, setExistingVideos] = useState<any[]>([]);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  // Visuels form
  const [visuelTitle, setVisuelTitle] = useState('');
  const [visuelDescription, setVisuelDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingVisuels, setExistingVisuels] = useState<any[]>([]);
  const [editingVisuel, setEditingVisuel] = useState<any>(null);

  // Ecrits form
  const [ecritTitle, setEcritTitle] = useState('');
  const [ecritContent, setEcritContent] = useState('');
  const [existingEcrits, setExistingEcrits] = useState<any[]>([]);
  const [editingEcrit, setEditingEcrit] = useState<any>(null);

  // 3D form
  const [troisDTitle, setTroisDTitle] = useState('');
  const [troisDDescription, setTroisDDescription] = useState('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);
  const [existingTroisD, setExistingTroisD] = useState<any[]>([]);
  const [editingTroisD, setEditingTroisD] = useState<any>(null);

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
        await loadExistingSons();
        await loadExistingVideos();
        await loadExistingVisuels();
        await loadExistingEcrits();
        await loadExistingTroisD();
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

  const loadExistingSons = async () => {
    const { data, error } = await supabase
      .from('sons')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExistingSons(data);
    }
  };

  const loadExistingVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExistingVideos(data);
    }
  };

  const loadExistingVisuels = async () => {
    const { data, error } = await supabase
      .from('visuels')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExistingVisuels(data);
    }
  };

  const loadExistingEcrits = async () => {
    const { data, error } = await supabase
      .from('ecrits')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExistingEcrits(data);
    }
  };

  const loadExistingTroisD = async () => {
    const { data, error } = await supabase
      .from('troisd')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setExistingTroisD(data);
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

  const deleteSon = async (id: string) => {
    const { error } = await supabase
      .from('sons')
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
        title: "Son supprimé ! 🗑️",
        description: "Le son a été supprimé avec succès",
      });
      await loadExistingSons();
    }
  };

  const deleteVideo = async (id: string) => {
    const { error } = await supabase
      .from('videos')
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
        title: "Vidéo supprimée ! 🗑️",
        description: "La vidéo a été supprimée avec succès",
      });
      await loadExistingVideos();
    }
  };

  const deleteVisuel = async (id: string) => {
    const { error } = await supabase
      .from('visuels')
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
        title: "Visuel supprimé ! 🗑️",
        description: "Le visuel a été supprimé avec succès",
      });
      await loadExistingVisuels();
    }
  };

  const deleteEcrit = async (id: string) => {
    const { error } = await supabase
      .from('ecrits')
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
        title: "Écrit supprimé ! 🗑️",
        description: "L'écrit a été supprimé avec succès",
      });
      await loadExistingEcrits();
    }
  };

  const deleteTroisD = async (id: string) => {
    const { error } = await supabase
      .from('troisd')
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
        title: "Modèle 3D supprimé ! 🗑️",
        description: "Le modèle 3D a été supprimé avec succès",
      });
      await loadExistingTroisD();
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
      await loadExistingSons();
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
      await loadExistingVideos();
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
      await loadExistingVisuels();
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
      await loadExistingEcrits();
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
      await loadExistingTroisD();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Edit functions
  const editNews = async (data: any) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({
          title: data.title,
          content: data.content,
          category: data.category
        })
        .eq('id', editingNews.id);

      if (error) throw error;

      toast({
        title: "News modifiée ! ✏️",
        description: "La news a été mise à jour avec succès",
      });
      await loadExistingNews();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const editSon = async (data: any) => {
    try {
      let audioUrl = editingSon.audio_url;
      
      if (data.audio_file) {
        audioUrl = await uploadFile(data.audio_file, 'audio');
      }

      const { error } = await supabase
        .from('sons')
        .update({
          title: data.title,
          description: data.description,
          audio_url: audioUrl
        })
        .eq('id', editingSon.id);

      if (error) throw error;

      toast({
        title: "Son modifié ! ✏️",
        description: "Le son a été mis à jour avec succès",
      });
      await loadExistingSons();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const editVideo = async (data: any) => {
    try {
      let videoUrl = editingVideo.video_url;
      let thumbnailUrl = editingVideo.thumbnail_url;
      
      if (data.video_file) {
        videoUrl = await uploadFile(data.video_file, 'videos');
      }
      
      if (data.thumbnail_file) {
        thumbnailUrl = await uploadFile(data.thumbnail_file, 'images');
      }

      const { error } = await supabase
        .from('videos')
        .update({
          title: data.title,
          description: data.description,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl
        })
        .eq('id', editingVideo.id);

      if (error) throw error;

      toast({
        title: "Vidéo modifiée ! ✏️",
        description: "La vidéo a été mise à jour avec succès",
      });
      await loadExistingVideos();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const editVisuel = async (data: any) => {
    try {
      let imageUrl = editingVisuel.image_url;
      
      if (data.image_file) {
        imageUrl = await uploadFile(data.image_file, 'images');
      }

      const { error } = await supabase
        .from('visuels')
        .update({
          title: data.title,
          description: data.description,
          image_url: imageUrl
        })
        .eq('id', editingVisuel.id);

      if (error) throw error;

      toast({
        title: "Visuel modifié ! ✏️",
        description: "Le visuel a été mis à jour avec succès",
      });
      await loadExistingVisuels();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const editEcrit = async (data: any) => {
    try {
      const { error } = await supabase
        .from('ecrits')
        .update({
          title: data.title,
          content: data.content
        })
        .eq('id', editingEcrit.id);

      if (error) throw error;

      toast({
        title: "Écrit modifié ! ✏️",
        description: "L'écrit a été mis à jour avec succès",
      });
      await loadExistingEcrits();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const editTroisD = async (data: any) => {
    try {
      let modelUrl = editingTroisD.model_url;
      let previewUrl = editingTroisD.preview_image_url;
      
      if (data.model_file) {
        modelUrl = await uploadFile(data.model_file, 'models');
      }
      
      if (data.preview_file) {
        previewUrl = await uploadFile(data.preview_file, 'images');
      }

      const { error } = await supabase
        .from('troisd')
        .update({
          title: data.title,
          description: data.description,
          model_url: modelUrl,
          preview_image_url: previewUrl
        })
        .eq('id', editingTroisD.id);

      if (error) throw error;

      toast({
        title: "Modèle 3D modifié ! ✏️",
        description: "Le modèle 3D a été mis à jour avec succès",
      });
      await loadExistingTroisD();
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
                       <div className="flex gap-2">
                         <EditForm
                           trigger={
                             <Button size="sm" variant="outline" className="border-cracra-yellow text-cracra-yellow">
                               Modifier ✏️
                             </Button>
                           }
                           title="Modifier la News"
                           initialData={news}
                           onSave={(data) => {
                             setEditingNews(news);
                             editNews(data);
                           }}
                           fields={[
                             { name: 'title', label: 'Titre', type: 'text', required: true },
                             { name: 'content', label: 'Contenu', type: 'textarea', required: true },
                             { name: 'category', label: 'Catégorie', type: 'text', required: true }
                           ]}
                         />
                         <Button 
                           onClick={() => deleteNews(news.id)}
                           variant="destructive"
                           size="sm"
                         >
                           Supprimer 🗑️
                         </Button>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SONS TAB */}
          <TabsContent value="sons" className="space-y-6">
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

            {/* Existing Sons */}
            <Card className="border-cracra-pink cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">Sons existants 🗂️</CardTitle>
                <CardDescription>Gérer les sons publiés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingSons.map((son) => (
                    <div key={son.id} className="flex justify-between items-center p-4 border border-cracra-green rounded-lg">
                      <div>
                        <h3 className="font-bold text-cracra-pink">{son.title}</h3>
                        <p className="text-sm text-cracra-green">{son.description}</p>
                        <p className="text-xs text-gray-500">{new Date(son.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                       <div className="flex gap-2">
                         <EditForm
                           trigger={
                             <Button size="sm" variant="outline" className="border-cracra-yellow text-cracra-yellow">
                               Modifier ✏️
                             </Button>
                           }
                           title="Modifier le Son"
                           initialData={son}
                           onSave={(data) => {
                             setEditingSon(son);
                             editSon(data);
                           }}
                           fields={[
                             { name: 'title', label: 'Titre', type: 'text', required: true },
                             { name: 'description', label: 'Description', type: 'textarea' },
                             { name: 'audio_file', label: 'Nouveau fichier audio (optionnel)', type: 'file', accept: 'audio/*' }
                           ]}
                         />
                         <Button 
                           onClick={() => deleteSon(son.id)}
                           variant="destructive"
                           size="sm"
                         >
                           Supprimer 🗑️
                         </Button>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VIDEOS TAB */}
          <TabsContent value="videos" className="space-y-6">
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

            {/* Existing Videos */}
            <Card className="border-cracra-pink cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">Vidéos existantes 🗂️</CardTitle>
                <CardDescription>Gérer les vidéos publiées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingVideos.map((video) => (
                    <div key={video.id} className="flex justify-between items-center p-4 border border-cracra-green rounded-lg">
                      <div>
                        <h3 className="font-bold text-cracra-pink">{video.title}</h3>
                        <p className="text-sm text-cracra-green">{video.description}</p>
                        <p className="text-xs text-gray-500">{new Date(video.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                       <div className="flex gap-2">
                         <EditForm
                           trigger={
                             <Button size="sm" variant="outline" className="border-cracra-yellow text-cracra-yellow">
                               Modifier ✏️
                             </Button>
                           }
                           title="Modifier la Vidéo"
                           initialData={video}
                           onSave={(data) => {
                             setEditingVideo(video);
                             editVideo(data);
                           }}
                           fields={[
                             { name: 'title', label: 'Titre', type: 'text', required: true },
                             { name: 'description', label: 'Description', type: 'textarea' },
                             { name: 'video_file', label: 'Nouveau fichier vidéo (optionnel)', type: 'file', accept: 'video/*' },
                             { name: 'thumbnail_file', label: 'Nouvelle miniature (optionnel)', type: 'file', accept: 'image/*' }
                           ]}
                         />
                         <Button 
                           onClick={() => deleteVideo(video.id)}
                           variant="destructive"
                           size="sm"
                         >
                           Supprimer 🗑️
                         </Button>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VISUELS TAB */}
          <TabsContent value="visuels" className="space-y-6">
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

            {/* Existing Visuels */}
            <Card className="border-cracra-pink cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">Visuels existants 🗂️</CardTitle>
                <CardDescription>Gérer les visuels publiés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingVisuels.map((visuel) => (
                    <div key={visuel.id} className="flex justify-between items-center p-4 border border-cracra-green rounded-lg">
                      <div>
                        <h3 className="font-bold text-cracra-pink">{visuel.title}</h3>
                        <p className="text-sm text-cracra-green">{visuel.description}</p>
                        <p className="text-xs text-gray-500">{new Date(visuel.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                       <div className="flex gap-2">
                         <EditForm
                           trigger={
                             <Button size="sm" variant="outline" className="border-cracra-yellow text-cracra-yellow">
                               Modifier ✏️
                             </Button>
                           }
                           title="Modifier le Visuel"
                           initialData={visuel}
                           onSave={(data) => {
                             setEditingVisuel(visuel);
                             editVisuel(data);
                           }}
                           fields={[
                             { name: 'title', label: 'Titre', type: 'text', required: true },
                             { name: 'description', label: 'Description', type: 'textarea' },
                             { name: 'image_file', label: 'Nouvelle image (optionnel)', type: 'file', accept: 'image/*' }
                           ]}
                         />
                         <Button 
                           onClick={() => deleteVisuel(visuel.id)}
                           variant="destructive"
                           size="sm"
                         >
                           Supprimer 🗑️
                         </Button>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ECRITS TAB */}
          <TabsContent value="ecrits" className="space-y-6">
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

            {/* Existing Ecrits */}
            <Card className="border-cracra-pink cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">Écrits existants 🗂️</CardTitle>
                <CardDescription>Gérer les écrits publiés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingEcrits.map((ecrit) => (
                    <div key={ecrit.id} className="flex justify-between items-center p-4 border border-cracra-green rounded-lg">
                      <div>
                        <h3 className="font-bold text-cracra-pink">{ecrit.title}</h3>
                        <p className="text-sm text-cracra-green">{ecrit.content.substring(0, 100)}...</p>
                        <p className="text-xs text-gray-500">{new Date(ecrit.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                       <div className="flex gap-2">
                         <EditForm
                           trigger={
                             <Button size="sm" variant="outline" className="border-cracra-yellow text-cracra-yellow">
                               Modifier ✏️
                             </Button>
                           }
                           title="Modifier l'Écrit"
                           initialData={ecrit}
                           onSave={(data) => {
                             setEditingEcrit(ecrit);
                             editEcrit(data);
                           }}
                           fields={[
                             { name: 'title', label: 'Titre', type: 'text', required: true },
                             { name: 'content', label: 'Contenu', type: 'textarea', required: true }
                           ]}
                         />
                         <Button 
                           onClick={() => deleteEcrit(ecrit.id)}
                           variant="destructive"
                           size="sm"
                         >
                           Supprimer 🗑️
                         </Button>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3D TAB */}
          <TabsContent value="troisd" className="space-y-6">
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

            {/* Existing 3D Models */}
            <Card className="border-cracra-pink cracra-hover-intense spray-effect">
              <CardHeader>
                <CardTitle className="text-cracra-yellow">Modèles 3D existants 🗂️</CardTitle>
                <CardDescription>Gérer les modèles 3D publiés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingTroisD.map((model) => (
                    <div key={model.id} className="flex justify-between items-center p-4 border border-cracra-green rounded-lg">
                      <div>
                        <h3 className="font-bold text-cracra-pink">{model.title}</h3>
                        <p className="text-sm text-cracra-green">{model.description}</p>
                        <p className="text-xs text-gray-500">{new Date(model.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                       <div className="flex gap-2">
                         <EditForm
                           trigger={
                             <Button size="sm" variant="outline" className="border-cracra-yellow text-cracra-yellow">
                               Modifier ✏️
                             </Button>
                           }
                           title="Modifier le Modèle 3D"
                           initialData={model}
                           onSave={(data) => {
                             setEditingTroisD(model);
                             editTroisD(data);
                           }}
                           fields={[
                             { name: 'title', label: 'Titre', type: 'text', required: true },
                             { name: 'description', label: 'Description', type: 'textarea' },
                             { name: 'model_file', label: 'Nouveau fichier 3D (optionnel)', type: 'file', accept: '.obj,.fbx,.gltf,.glb,.blend,.3ds' },
                             { name: 'preview_file', label: 'Nouvelle image d\'aperçu (optionnel)', type: 'file', accept: 'image/*' }
                           ]}
                         />
                         <Button 
                           onClick={() => deleteTroisD(model.id)}
                           variant="destructive"
                           size="sm"
                         >
                           Supprimer 🗑️
                         </Button>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
