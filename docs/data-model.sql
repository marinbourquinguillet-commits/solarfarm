-- PostgreSQL / Supabase schema for Solar Farm Operations Hub

create table profiles (
  id uuid primary key,
  full_name text not null,
  role text not null check (role in ('worker','team_leader','supervisor','admin')),
  phone text,
  active boolean default true,
  created_at timestamptz default now()
);

create table sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client text,
  address text,
  gps_lat numeric(9,6),
  gps_lng numeric(9,6),
  notes text,
  created_at timestamptz default now()
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  make_model text,
  site_id uuid references sites(id),
  active boolean default true,
  created_at timestamptz default now()
);

create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  leader_id uuid references profiles(id),
  active boolean default true,
  created_at timestamptz default now()
);

create table team_members (
  team_id uuid references teams(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  assigned_from date default current_date,
  assigned_to date,
  primary key (team_id, profile_id, assigned_from)
);

create table timesheets (
  id uuid primary key default gen_random_uuid(),
  worker_id uuid not null references profiles(id),
  site_id uuid not null references sites(id),
  work_date date not null,
  start_time timestamptz not null,
  end_time timestamptz,
  break_minutes int default 0,
  total_hours numeric(5,2),
  status text default 'pending' check (status in ('pending','approved','rejected')),
  approved_by uuid references profiles(id),
  approved_at timestamptz,
  rejection_reason text,
  created_at timestamptz default now()
);
create index idx_timesheets_filter on timesheets(site_id, worker_id, work_date);

create table vehicle_checks (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id),
  worker_id uuid not null references profiles(id),
  site_id uuid references sites(id),
  check_time timestamptz not null default now(),
  tyres text,
  lights text,
  tools text,
  fluids text,
  damage text,
  general_condition text,
  comments text,
  signature_name text,
  overall_status text not null check (overall_status in ('ok','needs_repair')),
  created_at timestamptz default now()
);
create index idx_vehicle_checks_filter on vehicle_checks(vehicle_id, check_time, overall_status);

create table files (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  site_id uuid references sites(id),
  version text,
  file_id uuid not null references files(id),
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);
create index idx_documents_filter on documents(site_id, category, title);

create table incidents (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  site_id uuid references sites(id),
  description text not null,
  occurred_at timestamptz not null,
  reported_by uuid references profiles(id),
  severity text not null check (severity in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','in_progress','closed')),
  created_at timestamptz default now()
);
create index idx_incidents_filter on incidents(status, site_id, type, occurred_at);

create table incident_comments (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references incidents(id) on delete cascade,
  author_id uuid references profiles(id),
  comment text not null,
  created_at timestamptz default now()
);

create table incident_photos (
  incident_id uuid references incidents(id) on delete cascade,
  file_id uuid references files(id) on delete cascade,
  primary key (incident_id, file_id)
);

create table message_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  is_announcement boolean default false,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table message_group_members (
  group_id uuid references message_groups(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  primary key (group_id, profile_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references message_groups(id) on delete cascade,
  sender_id uuid references profiles(id),
  text text,
  created_at timestamptz default now()
);
create index idx_messages_group_time on messages(group_id, created_at);

create table message_attachments (
  message_id uuid references messages(id) on delete cascade,
  file_id uuid references files(id) on delete cascade,
  primary key (message_id, file_id)
);

create table team_boards (
  id uuid primary key default gen_random_uuid(),
  board_date date not null,
  site_id uuid references sites(id),
  published_by uuid references profiles(id),
  created_at timestamptz default now(),
  unique(board_date, site_id)
);

create table team_board_entries (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references team_boards(id) on delete cascade,
  team_id uuid references teams(id),
  team_leader_id uuid references profiles(id),
  assigned_zone text,
  assigned_task text,
  notes text
);

create table production_reports (
  id uuid primary key default gen_random_uuid(),
  report_date date not null,
  team_id uuid not null references teams(id),
  leader_id uuid references profiles(id),
  site_id uuid references sites(id),
  zone text,
  work_type text,
  qty_trackers int default 0,
  qty_piles int default 0,
  qty_strings int default 0,
  hours_worked numeric(5,2),
  issues_blockers text,
  created_at timestamptz default now(),
  unique(report_date, team_id)
);

create table production_report_photos (
  report_id uuid references production_reports(id) on delete cascade,
  file_id uuid references files(id) on delete cascade,
  primary key (report_id, file_id)
);

-- Query examples
-- all messages in group X
-- select * from messages where group_id = :group_id order by created_at;
-- board for today
-- select * from team_boards tb join team_board_entries tbe on tb.id = tbe.board_id where tb.board_date = current_date;
-- reports for this team this week
-- select * from production_reports where team_id = :team_id and report_date >= current_date - interval '6 days';
