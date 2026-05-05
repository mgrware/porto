-- Enable RLS on blogs table
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blogs
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT USING (true);

-- Allow authenticated users to insert blogs
CREATE POLICY "Allow authenticated insert" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their own blogs (or all blogs if no owner column)
-- Since there is no owner column yet, we allow all authenticated users to update
CREATE POLICY "Allow authenticated update" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blogs
CREATE POLICY "Allow authenticated delete" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Policies for 'blogs' bucket
-- Note: These require the 'blogs' bucket to exist first.
-- Allow public access to read files in the 'blogs' bucket
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'blogs');

-- Allow authenticated users to upload files to 'blogs' bucket
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blogs' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files from 'blogs' bucket
CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'blogs' AND auth.role() = 'authenticated');
