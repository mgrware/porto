-- Migration to create master tags table

CREATE TABLE IF NOT EXISTS tags (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Policies
-- Everyone can read tags for suggestions
CREATE POLICY "Public tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

-- Only logged in users can create tags
CREATE POLICY "Authenticated users can insert tags" ON tags
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
