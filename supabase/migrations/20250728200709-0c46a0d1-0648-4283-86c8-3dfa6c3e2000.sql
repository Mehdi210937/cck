-- Create storage buckets for different content types
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('audio', 'audio', true),
  ('videos', 'videos', true),
  ('images', 'images', true),
  ('models', 'models', true);

-- Create storage policies for admin access
CREATE POLICY "Admin can upload audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audio' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can update audio files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'audio' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can delete audio files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'audio' AND get_current_user_role() = 'admin');

CREATE POLICY "Everyone can view audio files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audio');

-- Same policies for videos
CREATE POLICY "Admin can upload video files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'videos' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can update video files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'videos' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can delete video files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'videos' AND get_current_user_role() = 'admin');

CREATE POLICY "Everyone can view video files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');

-- Same policies for images
CREATE POLICY "Admin can upload image files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'images' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can update image files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'images' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can delete image files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'images' AND get_current_user_role() = 'admin');

CREATE POLICY "Everyone can view image files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'images');

-- Same policies for 3D models
CREATE POLICY "Admin can upload model files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'models' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can update model files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'models' AND get_current_user_role() = 'admin');

CREATE POLICY "Admin can delete model files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'models' AND get_current_user_role() = 'admin');

CREATE POLICY "Everyone can view model files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'models');