-- =================================================================================
-- SCHEMA: GiftSite (Projet Cadeaux Digitaux Personnalisés)
-- =================================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES

-- Table profiles (liée à auth.users)
-- Stocke les informations des acheteurs.
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Active RLS sur profiles
alter table public.profiles enable row level security;

-- Table gifts
-- Stocke les commandes / sites cadeaux générés.
create type gift_status as enum ('pending', 'paid', 'active', 'expired');

create table public.gifts (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  recipient_name text not null,
  slug text not null unique,
  access_password_hash text not null, -- Mot de passe requis pour voir le site
  status gift_status default 'pending'::gift_status not null,
  stripe_session_id text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Active RLS sur gifts
alter table public.gifts enable row level security;

-- Table gift_content
-- Stocke le contenu textuel / photos / configs du site cadeau.
create table public.gift_content (
  gift_id uuid references public.gifts(id) on delete cascade primary key,
  template_id text not null default 'default',
  custom_message text,
  photos text[] default '{}'::text[], -- URLs (via Cloudinary par exemple)
  settings jsonb default '{}'::jsonb, -- Configs couleurs, musiques, etc.
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Active RLS sur gift_content
alter table public.gift_content enable row level security;


-- 3. POLICES DE SÉCURITÉ (RLS)

-- PROFILES : Un utilisateur peut voir et modifier seulement son profil.
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- GIFTS : 
-- L'acheteur peut voir et modifier ses propres cadeaux.
create policy "Buyers can view their gifts" on public.gifts
  for select using (auth.uid() = buyer_id);

create policy "Buyers can insert gifts" on public.gifts
  for insert with check (auth.uid() = buyer_id);

create policy "Buyers can update their gifts" on public.gifts
  for update using (auth.uid() = buyer_id);

-- GUEST ACCESS (Les Destinataires) :
-- Comment gérer l'accès public au site cadeau sans compte ?
-- On permet à TOUT LE MONDE de faire un SELECT sur gifts si le statut est 'active', 
-- MAIS la sécurité se fait côté Backend (API Route / Middleware) en vérifiant
-- le 'access_password_hash' avant d'afficher la page.
create policy "Anyone can view active gifts" on public.gifts
  for select using (status = 'active');

-- GIFT_CONTENT :
-- L'acheteur peut gérer le contenu.
create policy "Buyers can manage gift content" on public.gift_content
  for all using (
    exists (
      select 1 from public.gifts 
      where id = gift_content.gift_id and buyer_id = auth.uid()
    )
  );

-- Les destinataires (public) peuvent lire le contenu si le gift est actif.
create policy "Public can view active gift content" on public.gift_content
  for select using (
    exists (
      select 1 from public.gifts 
      where id = gift_content.gift_id and status = 'active'
    )
  );

-- 4. TRIGGERS
-- Créer automatiquement un profile quand un user s'inscrit sur Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
