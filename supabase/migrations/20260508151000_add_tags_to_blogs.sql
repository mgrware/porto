-- Migration to add 'tags' column to 'blogs' table

ALTER TABLE blogs ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
