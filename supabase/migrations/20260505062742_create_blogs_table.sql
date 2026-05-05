create table blogs (
  id bigint primary key generated always as identity,
  title text,
  slug text,
  content text,
  created_at timestamptz default now()
);