-- Créer les tables manquantes avec RLS

-- Table news
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view news"
  ON public.news FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert news"
  ON public.news FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news"
  ON public.news FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news"
  ON public.news FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Table sons (audio tracks)
CREATE TABLE public.sons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.sons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view sons"
  ON public.sons FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert sons"
  ON public.sons FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sons"
  ON public.sons FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sons"
  ON public.sons FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Table videos
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view videos"
  ON public.videos FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert videos"
  ON public.videos FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update videos"
  ON public.videos FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete videos"
  ON public.videos FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Table visuels
CREATE TABLE public.visuels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  artist TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.visuels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view visuels"
  ON public.visuels FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert visuels"
  ON public.visuels FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update visuels"
  ON public.visuels FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete visuels"
  ON public.visuels FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Table ecrits (texts)
CREATE TABLE public.ecrits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.ecrits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view ecrits"
  ON public.ecrits FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert ecrits"
  ON public.ecrits FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ecrits"
  ON public.ecrits FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete ecrits"
  ON public.ecrits FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Table troisd (3D models)
CREATE TABLE public.troisd (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  model_url TEXT,
  preview_url TEXT,
  artist TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.troisd ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view troisd"
  ON public.troisd FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert troisd"
  ON public.troisd FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update troisd"
  ON public.troisd FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete troisd"
  ON public.troisd FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Ajouter les triggers pour updated_at
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sons_updated_at
  BEFORE UPDATE ON public.sons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_visuels_updated_at
  BEFORE UPDATE ON public.visuels
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ecrits_updated_at
  BEFORE UPDATE ON public.ecrits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_troisd_updated_at
  BEFORE UPDATE ON public.troisd
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();