import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

interface Artist {
  id: string;
  name: string;
  photo_url?: string;
  soundcloud_url?: string;
  spotify_url?: string;
  other_url?: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Artists form
  const [artistName, setArtistName] = useState('');
  const [artistPhoto, setArtistPhoto] = useState<File | null>(null);
  const [soundcloudUrl, setSoundcloudUrl] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [otherUrl, setOtherUrl] = useState('');
  const [existingArtists, setExistingArtists] = useState<Artist[]>([]);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      
      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de vérifier les permissions',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      if (roles) {
        setIsAdmin(true);
        await loadExistingArtists();
      } else {
        toast({
          title: 'Accès refusé',
          description: 'Vous n\'avez pas les permissions administrateur',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }
      
      setLoading(false);
    };

    checkAdmin();
  }, [navigate, toast]);

  const loadExistingArtists = async () => {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error loading artists:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les artistes',
        variant: 'destructive',
      });
      return;
    }

    setExistingArtists(data || []);
  };

  const uploadFile = async (file: File, path?: string): Promise<string> => {
    const bucket = 'artist-photos';
    const fileName = path || `${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const deleteArtist = async (id: string) => {
    const { error } = await supabase
      .from('artists')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'artiste',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Succès',
      description: 'Artiste supprimé',
    });

    await loadExistingArtists();
  };

  const handleArtistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let photoUrl = '';
    if (artistPhoto) {
      try {
        photoUrl = await uploadFile(artistPhoto);
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible d\'uploader la photo',
          variant: 'destructive',
        });
        return;
      }
    }

    const { error } = await supabase
      .from('artists')
      .insert({
        name: artistName,
        photo_url: photoUrl || null,
        soundcloud_url: soundcloudUrl || null,
        spotify_url: spotifyUrl || null,
        other_url: otherUrl || null,
      });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter l\'artiste',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Succès',
      description: 'Artiste ajouté',
    });

    // Reset form
    setArtistName('');
    setArtistPhoto(null);
    setSoundcloudUrl('');
    setSpotifyUrl('');
    setOtherUrl('');

    await loadExistingArtists();
  };

  const editArtist = async (artist: Artist) => {
    setEditingArtist(artist);
    setArtistName(artist.name);
    setSoundcloudUrl(artist.soundcloud_url || '');
    setSpotifyUrl(artist.spotify_url || '');
    setOtherUrl(artist.other_url || '');
  };

  const handleEditArtistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtist) return;

    let photoUrl = editingArtist.photo_url;
    if (artistPhoto) {
      try {
        photoUrl = await uploadFile(artistPhoto);
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible d\'uploader la photo',
          variant: 'destructive',
        });
        return;
      }
    }

    const { error } = await supabase
      .from('artists')
      .update({
        name: artistName,
        photo_url: photoUrl || null,
        soundcloud_url: soundcloudUrl || null,
        spotify_url: spotifyUrl || null,
        other_url: otherUrl || null,
      })
      .eq('id', editingArtist.id);

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier l\'artiste',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Succès',
      description: 'Artiste modifié',
    });

    // Reset form
    setEditingArtist(null);
    setArtistName('');
    setArtistPhoto(null);
    setSoundcloudUrl('');
    setSpotifyUrl('');
    setOtherUrl('');

    await loadExistingArtists();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return <div className="min-h-screen bg-background p-8">Chargement...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            Déconnexion
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingArtist ? 'Modifier un artiste' : 'Ajouter un artiste'}
            </CardTitle>
            <CardDescription>
              Gérer les artistes du collectif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingArtist ? handleEditArtistSubmit : handleArtistSubmit} className="space-y-4">
              <Input
                placeholder="Nom de l'artiste"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setArtistPhoto(e.target.files?.[0] || null)}
              />
              <Input
                placeholder="Lien SoundCloud (optionnel)"
                value={soundcloudUrl}
                onChange={(e) => setSoundcloudUrl(e.target.value)}
              />
              <Input
                placeholder="Lien Spotify (optionnel)"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
              />
              <Input
                placeholder="Autre lien (optionnel)"
                value={otherUrl}
                onChange={(e) => setOtherUrl(e.target.value)}
              />
              <div className="flex gap-2">
                <Button type="submit">
                  {editingArtist ? 'Modifier' : 'Ajouter'}
                </Button>
                {editingArtist && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingArtist(null);
                      setArtistName('');
                      setArtistPhoto(null);
                      setSoundcloudUrl('');
                      setSpotifyUrl('');
                      setOtherUrl('');
                    }}
                  >
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artistes existants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {existingArtists.map((artist) => (
                <div key={artist.id} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-semibold">{artist.name}</h3>
                    {artist.photo_url && (
                      <img
                        src={artist.photo_url}
                        alt={artist.name}
                        className="w-16 h-16 object-cover rounded mt-2"
                      />
                    )}
                    <div className="text-sm text-muted-foreground mt-2">
                      {artist.soundcloud_url && (
                        <p>SoundCloud: {artist.soundcloud_url}</p>
                      )}
                      {artist.spotify_url && (
                        <p>Spotify: {artist.spotify_url}</p>
                      )}
                      {artist.other_url && (
                        <p>Autre: {artist.other_url}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => editArtist(artist)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteArtist(artist.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
              {existingArtists.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Aucun artiste pour le moment
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
