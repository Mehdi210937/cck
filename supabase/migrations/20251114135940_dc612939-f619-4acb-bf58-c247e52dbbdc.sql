-- 1. Créer l'enum pour les rôles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Créer la table user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Activer RLS sur user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Créer la fonction sécurisée pour vérifier les rôles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. RLS policies pour user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Créer la table artists
CREATE TABLE public.artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_url TEXT,
  soundcloud_url TEXT,
  spotify_url TEXT,
  other_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. Activer RLS sur artists
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;

-- 8. Policies pour artists : tout le monde peut voir, admins peuvent tout faire
CREATE POLICY "Everyone can view artists"
  ON public.artists
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert artists"
  ON public.artists
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update artists"
  ON public.artists
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete artists"
  ON public.artists
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 9. Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Trigger pour artists
CREATE TRIGGER update_artists_updated_at
  BEFORE UPDATE ON public.artists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 11. Créer le bucket pour les photos d'artistes
INSERT INTO storage.buckets (id, name, public)
VALUES ('artist-photos', 'artist-photos', true);

-- 12. Policies pour le storage
CREATE POLICY "Public can view artist photos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'artist-photos');

CREATE POLICY "Admins can upload artist photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'artist-photos' 
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update artist photos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'artist-photos' 
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete artist photos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'artist-photos' 
    AND public.has_role(auth.uid(), 'admin')
  );