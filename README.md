# Claude Code로 시작하는 디자이너를 위한 바이브코딩

> 이 브랜치는 **체크포인트 01: 홈·상세 화면 구현 완료본**입니다. Part 8 시안 구현까지 끝난 상태이며, 데이터는 코드 안의 예시 메모 3개를 씁니다.

디자이너가 Claude Code와 Figma MCP로 메모 앱 시안을 만들고, 코드로 구현하고, 배포까지 하는 1일 핸즈온 실습 저장소입니다.

## 오늘 만드는 것

- Figma 메모 앱 시안 (홈, 상세)
- 메모 앱 웹 서비스 (홈 목록, 상세, 작성) + Supabase 데이터 저장
- Vercel 배포 URL
- 우리 팀 디자인 규칙 검수 스킬

## 저장소 구성

| 위치 | 내용 |
|---|---|
| [`prompts/`](prompts/README.md) | Part별 실습 프롬프트. 복사해서 Claude Code에 붙여 넣습니다 |
| `checkpoint/01-home-detail` 브랜치 | 홈·상세 화면 구현 완료본 (준비 중) |
| `checkpoint/02-supabase` 브랜치 | 작성·저장까지 완료본 (준비 중) |

실습 프로젝트는 강의 중에 각자 새로 만듭니다. 진도가 늦어지면 체크포인트 브랜치를 받아 그 지점부터 이어 갑니다.

## 준비할 계정

- Claude Pro 이상 구독
- Figma (교육용 계정, Full seat)
- GitHub
- Vercel
- Supabase

## 체크포인트 받기

```bash
git clone -b checkpoint/01-home-detail https://github.com/devbrother2024/claude-code-designer-memo.git memo
cd memo
npm install
npm run dev
```

`checkpoint/02-supabase`는 `.env.local`에 내 Supabase 프로젝트 URL과 공개 키를 직접 넣어야 동작합니다.

## 주의

- 교육용 예제입니다. Supabase 테이블은 실습 편의를 위해 누구나 읽고 쓸 수 있게 열어 둡니다. 실제 서비스에는 그대로 쓰지 마세요.
- 키(`.env.local`)는 GitHub에 올리지 않습니다.
