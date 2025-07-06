-- Create white noise collections table
CREATE TABLE public.white_noise_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create white noise files table
CREATE TABLE public.white_noise_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.white_noise_collections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  encoding_format TEXT,
  duration_seconds INTEGER,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.white_noise_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.white_noise_files ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "White noise collections are publicly readable" ON public.white_noise_collections
  FOR SELECT USING (true);
CREATE POLICY "White noise files are publicly readable" ON public.white_noise_files
  FOR SELECT USING (true);
