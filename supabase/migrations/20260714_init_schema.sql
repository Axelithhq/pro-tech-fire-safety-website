-- Pro-Tech Fire & Safety — Complete Schema
create extension if not exists "uuid-ossp";

-- 1. Users & Roles
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null default '',
  role text not null check (role in ('OWNER', 'ADMIN', 'SALES', 'ENGINEER', 'EDITOR')),
  avatar_url text,
  created_at timestamptz default now() not null
);

-- 2. Settings
create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now() not null
);

-- 3. Industries
create table if not exists public.industries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text not null,
  icon text not null default 'Shield',
  image_url text,
  project_count int default 0,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 4. Services
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  subtitle text,
  description text not null,
  icon text not null default 'Shield',
  image_url text,
  features text[] not null default '{}',
  is_featured boolean default false,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 5. Product Categories
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 6. Products
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  description text not null,
  applications text[] not null default '{}',
  specifications jsonb not null default '{}'::jsonb,
  image_url text,
  brochure_url text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now() not null
);

-- 7. Projects
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  client text not null,
  industry text not null,
  location text not null,
  city text not null,
  state text not null,
  scope text not null,
  details text not null default '',
  status text not null check (status in ('COMPLETED', 'ONGOING')),
  completion_year text not null,
  image_url text,
  coordinates jsonb not null default '{"lat": 20.0, "lng": 78.0}'::jsonb,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 8. Gallery
create table if not exists public.gallery (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null,
  image_url text,
  description text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 9. Certifications
create table if not exists public.certifications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  category text not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 10. Clients
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  website_url text,
  is_featured boolean default false,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 11. Testimonials
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  author text not null,
  role text not null,
  company text not null,
  rating int default 5 check (rating >= 1 and rating <= 5),
  avatar_url text,
  is_featured boolean default false,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 12. Why Choose (USPs)
create table if not exists public.why_choose (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  icon text not null default 'Star',
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 13. Team
create table if not exists public.team (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  bio text,
  avatar_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

-- 14. Blog Posts
create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text not null,
  summary text not null,
  category text not null,
  image_url text,
  author text not null default 'Pro-Tech Fire & Safety',
  reading_time_min int default 3,
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now() not null
);

-- 15. Leads (Configurator)
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  building_type text not null,
  floor_range text not null,
  status text not null check (status in ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST')) default 'NEW',
  notes text,
  created_at timestamptz default now() not null
);

-- 16. Enquiries
create table if not exists public.enquiries (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  status text not null check (status in ('NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST', 'ARCHIVED')) default 'NEW',
  notes text,
  created_at timestamptz default now() not null
);

-- 17. Career Applications
create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text not null,
  position text not null,
  resume_url text,
  cover_letter text,
  status text not null check (status in ('NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED')) default 'NEW',
  created_at timestamptz default now() not null
);

-- 18. Job Openings
create table if not exists public.job_openings (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  location text not null,
  type text not null,
  department text not null,
  description text not null,
  requirements text[] not null default '{}',
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now() not null
);

-- 19. SEO
create table if not exists public.seo (
  id uuid primary key default uuid_generate_v4(),
  page_path text unique not null,
  meta_title text,
  meta_description text,
  keywords text,
  og_image text,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.settings enable row level security;
alter table public.industries enable row level security;
alter table public.services enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.gallery enable row level security;
alter table public.certifications enable row level security;
alter table public.clients enable row level security;
alter table public.testimonials enable row level security;
alter table public.why_choose enable row level security;
alter table public.team enable row level security;
alter table public.posts enable row level security;
alter table public.leads enable row level security;
alter table public.enquiries enable row level security;
alter table public.applications enable row level security;
alter table public.job_openings enable row level security;
alter table public.seo enable row level security;
