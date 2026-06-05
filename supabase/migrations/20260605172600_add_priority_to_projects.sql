-- Add priority column to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS priority integer DEFAULT 0;
