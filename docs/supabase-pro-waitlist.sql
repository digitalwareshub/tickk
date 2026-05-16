create table if not exists public.pro_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'unknown',
  product text not null default 'tickk',
  created_at timestamptz not null default now()
);

alter table public.pro_waitlist enable row level security;

create policy "Service role can manage pro waitlist"
  on public.pro_waitlist
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
