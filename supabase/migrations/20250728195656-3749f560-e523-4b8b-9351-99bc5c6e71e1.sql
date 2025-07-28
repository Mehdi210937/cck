-- Update profiles table to handle admin role
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'member';

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN user_email = 'cracrakrew@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
DECLARE
  user_email TEXT;
BEGIN
  SELECT email INTO user_email FROM auth.users WHERE id = auth.uid();
  IF public.is_admin(user_email) THEN
    RETURN 'admin';
  ELSE
    RETURN 'member';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update handle_new_user function to set admin role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, username, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email = 'cracrakrew@gmail.com' THEN 'admin'
      ELSE 'member'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create news table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sons table
CREATE TABLE public.sons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ecrits table
CREATE TABLE public.ecrits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create visuels table
CREATE TABLE public.visuels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create troisd table
CREATE TABLE public.troisd (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  model_url TEXT NOT NULL,
  preview_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecrits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visuels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.troisd ENABLE ROW LEVEL SECURITY;

-- Create policies for reading (everyone can read)
CREATE POLICY "Everyone can view news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Everyone can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Everyone can view sons" ON public.sons FOR SELECT USING (true);
CREATE POLICY "Everyone can view ecrits" ON public.ecrits FOR SELECT USING (true);
CREATE POLICY "Everyone can view visuels" ON public.visuels FOR SELECT USING (true);
CREATE POLICY "Everyone can view troisd" ON public.troisd FOR SELECT USING (true);

-- Create policies for admin management (only admin can insert/update/delete)
CREATE POLICY "Admin can manage news" ON public.news FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Admin can manage videos" ON public.videos FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Admin can manage sons" ON public.sons FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Admin can manage ecrits" ON public.ecrits FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Admin can manage visuels" ON public.visuels FOR ALL USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Admin can manage troisd" ON public.troisd FOR ALL USING (public.get_current_user_role() = 'admin');

-- Add triggers for timestamps
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sons_updated_at BEFORE UPDATE ON public.sons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ecrits_updated_at BEFORE UPDATE ON public.ecrits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_visuels_updated_at BEFORE UPDATE ON public.visuels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_troisd_updated_at BEFORE UPDATE ON public.troisd FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial news data
INSERT INTO public.news (title, content, category) VALUES
('NOUVEAU CLIP CRACRA DISPO', 'Le crew balance un nouveau clip sale qui déchire grave ! 📹', 'VIDEO'),
('TRACK UNDERGROUND EN PRÉPARATION', 'Un son immonde qui va faire mal aux oreilles des bourgeois 🎵', 'SON'),
('NOUVELLE SÉRIE DE GRAFFITIS', 'Des tags cracra qui envahissent la ville ! 🎨', 'VISUEL');