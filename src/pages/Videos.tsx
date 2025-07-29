import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { ContentViewer } from "@/components/ui/dialog-content";

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setVideos(data);
      }
      setLoading(false);
    };

    loadVideos();
  }, []);
  return (
    <div className="min-h-screen graffiti-bg">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-pink"
            data-text="ODIEUSES VIDEOS"
          >
            ODIEUSES VIDEOS
          </h1>
          <p className="text-xl text-cracra-yellow">
            📹 Les clips les plus cracra du crew 📹
          </p>
        </div>

        {loading ? (
          <div className="text-center text-cracra-pink text-xl">
            Chargement des vidéos cracra...
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center text-cracra-pink text-xl">
            Aucune vidéo pour le moment... 📹
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="cracra-hover border-cracra-green">
                <CardHeader>
                  <CardTitle className="text-cracra-pink">{video.title}</CardTitle>
                  <CardDescription className="text-cracra-yellow">
                    {video.description || "Un clip underground de folie"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      poster={video.thumbnail_url || undefined}
                    >
                      <source src={video.video_url} type="video/mp4" />
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                  </div>
                  <ContentViewer
                    trigger={
                      <Button className="w-full bg-cracra-green hover:bg-cracra-pink">
                        REGARDER
                      </Button>
                    }
                    title={video.title}
                    content={video.description || "Vidéo underground qui déchire"}
                    type="video"
                    url={video.video_url}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;