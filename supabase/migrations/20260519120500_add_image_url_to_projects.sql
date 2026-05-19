-- Add image_url to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url text;

-- Insert projects bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'projects' bucket
-- Allow public access to read files in the 'projects' bucket
CREATE POLICY "Public Access Projects" ON storage.objects
  FOR SELECT USING (bucket_id = 'projects');

-- Allow authenticated users to upload files to 'projects' bucket
CREATE POLICY "Authenticated Upload Projects" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files from 'projects' bucket
CREATE POLICY "Authenticated Delete Projects" ON storage.objects
  FOR DELETE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Allow authenticated users to update files in 'projects' bucket
CREATE POLICY "Authenticated Update Projects" ON storage.objects
  FOR UPDATE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Allow authenticated users to insert projects
CREATE POLICY "Allow authenticated insert on projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update projects
CREATE POLICY "Allow authenticated update on projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete projects
CREATE POLICY "Allow authenticated delete on projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');
