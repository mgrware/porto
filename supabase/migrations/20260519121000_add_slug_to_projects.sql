-- Add slug column to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug text;

-- Make slug unique
ALTER TABLE projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
