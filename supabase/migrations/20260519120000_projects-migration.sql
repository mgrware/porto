create table projects (
  id bigint primary key generated always as identity,
  title text not null,
  description text,
  year text,
  tags text[],
  color_class text,
  icon text,
  demo_link text,
  repo_link text,
  created_at timestamptz default now()
);
