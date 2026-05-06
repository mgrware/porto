-- Migration to add 'views' column to 'blogs' table and create an RPC function

-- 1. Add views column
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS views integer DEFAULT 0;

-- 2. Create RPC function to increment views
-- We use SECURITY DEFINER so that anonymous users can increment the counter
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id bigint)
RETURNS void AS $$
BEGIN
  UPDATE blogs
  SET views = COALESCE(views, 0) + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
