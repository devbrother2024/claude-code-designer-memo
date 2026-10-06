-- 메모 앱 테이블 (교육용)
create table if not exists public.memos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  created_at timestamptz not null default now()
);

alter table public.memos enable row level security;

-- 교육용: 로그인 없이 누구나 읽고 쓸 수 있게 연다. 실제 서비스에서는 사용자별 정책으로 바꾼다.
create policy "교육용 읽기 허용" on public.memos for select to anon using (true);
create policy "교육용 쓰기 허용" on public.memos for insert to anon with check (true);

insert into public.memos (title, body, created_at) values
  ('장보기 목록', '우유, 계란, 사과, 커피 원두. 주말 전에 꼭 사 두기', '2026-10-30 09:10:00+09'),
  ('회의 메모', E'시안 검수 기준을 팀 규칙으로 정리하고 다음 주에 공유하기로 함.\n\n다음 회의 전까지 각자 맡은 화면을 검수 스킬로 한 번씩 채점해 오기.', '2026-10-29 15:20:00+09'),
  ('읽을 책', '디자인 시스템 관련 책 두 권, 출퇴근길에 한 챕터씩 읽기', '2026-10-28 20:45:00+09');
