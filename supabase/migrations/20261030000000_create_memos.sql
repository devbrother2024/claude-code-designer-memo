-- 메모 앱 테이블 (교육용, 체크포인트 02 코드와 같은 칸)
-- P9-2에서 만든 memos 테이블과 칸이 다르면 화면에 오류가 난다.
-- 이때 Claude에게 "supabase 폴더의 SQL대로 memos 테이블을 다시 만들어줘"라고 한다.
create table if not exists public.memos (
  id         text primary key default gen_random_uuid()::text,
  title      text not null,
  preview    text not null default '',
  category   text not null check (category in ('업무', '개인', '아이디어')),
  label      text not null check (label in ('blue', 'green', 'orange', 'pink')),
  pinned     boolean not null default false,
  body       jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.memos is '메모 앱의 메모. 교육용이라 RLS를 끄고 누구나 읽고 쓰고 지울 수 있다.';
comment on column public.memos.body is '본문 블록 배열: title(대제목), heading(소제목), paragraph(spans: text, bold), list(items)';

-- 교육용: 누구나 읽고 쓰고 지울 수 있게 RLS를 끈다. 실제 서비스에서는 로그인한 사람만 자기 메모를 보게 막는다.
alter table public.memos disable row level security;
grant select, insert, update, delete on public.memos to anon, authenticated;

-- 예시 메모 5개 (시안의 고정한 메모 2개, 최근 메모 3개). 시각은 지금 기준이라 언제 넣어도 '오늘', '어제'로 보인다.
insert into public.memos (id, title, preview, category, label, pinned, body, created_at, updated_at) values
('design-review', '디자인 리뷰 회의록', '검수 기준과 다음 할 일 정리', '업무', 'blue', true,
 $j$[
  {"type":"title","text":"회의 요약"},
  {"type":"paragraph","spans":[{"text":"시안 검수 기준을 팀 규칙으로 정리했다. 목표는 "},{"text":"AI가 구현해도 깨지지 않는 시안","bold":true},{"text":"이다."}]},
  {"type":"heading","text":"결정한 것"},
  {"type":"list","items":["묶음은 오토레이아웃, 늘어날 것은 Fill","색과 간격은 변수로 연결","시안은 프레임 링크로 넘기기"]},
  {"type":"heading","text":"다음 할 일"},
  {"type":"paragraph","spans":[{"text":"금요일까지","bold":true},{"text":" 각자 맡은 화면을 채점해 온다. 점수보다 깎인 이유를 먼저 본다."}]},
  {"type":"heading","text":"남은 질문"},
  {"type":"paragraph","spans":[{"text":"다크 모드 색은 누가 정할지, 아이콘은 직접 그릴지 다음 회의에서 정한다."}]}
 ]$j$::jsonb,
 now() - interval '1 hour', now() - interval '1 hour'),
('weekend-hiking', '주말 등산 준비', '물 두 병, 간식, 바람막이 챙기기', '개인', 'green', true,
 $j$[{"type":"paragraph","spans":[{"text":"물 두 병, 간식, 바람막이 챙기기"}]}]$j$::jsonb,
 now() - interval '1 day', now() - interval '1 day'),
('grocery-list', '장보기 목록', '우유, 계란, 사과, 커피 원두', '개인', 'pink', false,
 $j$[{"type":"paragraph","spans":[{"text":"우유, 계란, 사과, 커피 원두"}]}]$j$::jsonb,
 now() - interval '2 hours', now() - interval '2 hours'),
('app-icon-idea', '앱 아이콘 아이디어', '메모지 모서리가 접힌 모양', '아이디어', 'orange', false,
 $j$[{"type":"paragraph","spans":[{"text":"메모지 모서리가 접힌 모양"}]}]$j$::jsonb,
 now() - interval '3 hours', now() - interval '3 hours'),
('reading-list', '읽을 책', '디자인 시스템 책 두 권', '개인', 'green', false,
 $j$[{"type":"paragraph","spans":[{"text":"디자인 시스템 책 두 권"}]}]$j$::jsonb,
 now() - interval '1 day 2 hours', now() - interval '1 day 2 hours')
on conflict (id) do nothing;
