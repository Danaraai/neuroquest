-- NeuroQuest — Supabase Schema
-- Run this in your Supabase SQL editor to set up the database.
-- All tables are RLS-protected (each user only sees their own data).

-- ─── Enable UUID extension ────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── User Stats ───────────────────────────────────────────────
create table if not exists user_stats (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  total_xp      integer not null default 0,
  current_level integer not null default 1,
  current_streak   integer not null default 0,
  longest_streak   integer not null default 0,
  last_activity_date text,          -- YYYY-MM-DD
  streak_freezes   integer not null default 1,
  badges        text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table user_stats enable row level security;
create policy "users_own_stats" on user_stats
  for all using (auth.uid() = user_id);

-- ─── Lesson Progress ──────────────────────────────────────────
create table if not exists lesson_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  lesson_id     text not null,
  completed_at  timestamptz not null default now(),
  score         integer not null default 0,      -- 0–100
  xp_earned     integer not null default 0,
  attempts      integer not null default 1,
  unique (user_id, lesson_id)
);

alter table lesson_progress enable row level security;
create policy "users_own_lesson_progress" on lesson_progress
  for all using (auth.uid() = user_id);

create index on lesson_progress (user_id, lesson_id);

-- ─── Quest Progress ───────────────────────────────────────────
create table if not exists quest_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  quest_id      text not null,
  completed     boolean not null default false,
  completed_at  timestamptz,
  unique (user_id, quest_id)
);

alter table quest_progress enable row level security;
create policy "users_own_quest_progress" on quest_progress
  for all using (auth.uid() = user_id);

-- ─── World Progress ───────────────────────────────────────────
create table if not exists world_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  world_id      text not null,
  unlocked      boolean not null default false,
  completed     boolean not null default false,
  unique (user_id, world_id)
);

alter table world_progress enable row level security;
create policy "users_own_world_progress" on world_progress
  for all using (auth.uid() = user_id);

-- ─── Spaced Repetition Cards ──────────────────────────────────
create table if not exists sr_cards (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  card_id             text not null,              -- lesson question/flashcard id
  easiness_factor     float not null default 2.5,
  interval_days       integer not null default 1,
  repetitions         integer not null default 0,
  next_review_date    text not null,              -- YYYY-MM-DD
  last_answer_quality integer not null default 0, -- 0–5
  updated_at          timestamptz not null default now(),
  unique (user_id, card_id)
);

alter table sr_cards enable row level security;
create policy "users_own_sr_cards" on sr_cards
  for all using (auth.uid() = user_id);

create index on sr_cards (user_id, next_review_date);

-- ─── Auto-update updated_at ───────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_stats_updated_at
  before update on user_stats
  for each row execute procedure update_updated_at();

create trigger sr_cards_updated_at
  before update on sr_cards
  for each row execute procedure update_updated_at();
