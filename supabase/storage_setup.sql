-- === SETUP SUPABASE STORAGE ===
-- À exécuter dans le SQL Editor du Dashboard Supabase

-- 1. Création du bucket 'gift_photos' (Public pour que les images s'affichent sur le site cadeau)
insert into storage.buckets (id, name, public)
values ('gift_photos', 'gift_photos', true)
on conflict (id) do nothing;

-- 2. Politique : Tout le monde peut voir les photos
create policy "Photos publiques"
on storage.objects for select
to public
using ( bucket_id = 'gift_photos' );

-- 3. Politique : Les utilisateurs connectés peuvent uploader des photos
create policy "Upload par utilisateurs authentifiés"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'gift_photos' );
