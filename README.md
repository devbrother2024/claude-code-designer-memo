# Claude Code로 시작하는 디자이너를 위한 바이브코딩

디자이너가 Claude Code와 Figma MCP로 메모 앱 시안을 만들고, 코드로 구현하고, 배포까지 하는 1일 핸즈온 실습 저장소입니다.

## 오늘 만드는 것

- Figma 메모 앱 시안 (홈, 전체 메모, 상세, 작성)
- 메모 앱 웹 서비스 (분류 칩·고정한 메모가 있는 홈, 서식 있는 상세, 서식 막대가 있는 작성) + Supabase 데이터 저장
- 과제로 더하는 기능 (편집: 수정·삭제·고정 / 찾기: 전체 메모·검색·분류·정렬 / 꾸미기: 서식·다크 모드)
- Vercel 배포 URL
- 우리 팀 기준을 더한 채점 스킬

## 저장소 구성

| 위치 | 내용 |
|---|---|
| [`prompts/`](prompts/README.md) | Part별 실습 프롬프트. 복사해서 Claude Code에 붙여 넣습니다 |
| [`skills/`](skills/README.md) | 시안 채점 스킬 design-check. Part 7에서 설치하고 Part 11에서 우리 팀 기준으로 고칩니다 |
| `checkpoint/01-home-detail` 브랜치 | 홈·상세·작성 화면 구현 완료본 (예시 메모는 코드 안에) |
| `checkpoint/02-supabase` 브랜치 | Supabase 읽기와 작성·저장까지 완료본 (테이블 SQL 포함) |
| [`figma/starter-plugin/`](figma/starter-plugin/README.md) | 강사용: 실습 시작 시안을 만드는 Figma 플러그인 |

실습은 바탕화면의 `memo` 폴더 하나에서 처음부터 끝까지 진행합니다. 바탕화면에 `memo` 폴더를 만들고, Claude 데스크톱 앱 Code 탭 입력창 아래 **선택...**에서 이 폴더를 고릅니다. 새 대화를 열 때마다 폴더가 `memo`인지 확인합니다. 진도가 늦어지면 체크포인트 브랜치를 받아 그 지점부터 이어 갑니다.

## 준비할 계정

- [Claude](https://claude.ai) Pro 이상 구독
- [Figma](https://www.figma.com/signup) (Full seat)
- [GitHub](https://github.com/signup)
- [Vercel](https://vercel.com/signup) (GitHub 계정으로 가입하면 빠름)
- [Supabase](https://supabase.com/dashboard/sign-up) (GitHub 계정으로 가입하면 빠름)

## 설치할 프로그램 (Windows)

| 프로그램 | 받는 곳 | 설치·확인 |
|---|---|---|
| Claude 데스크톱 앱 (Code 탭) | [claude.com/download](https://claude.com/download) | 설치 후 개인 계정으로 로그인 |
| Figma 데스크톱 앱 | [figma.com/downloads](https://www.figma.com/downloads/) | 브라우저 figma.com으로도 가능 |
| Node.js LTS | [nodejs.org](https://nodejs.org/en/download) | `node -v` (v20 이상) |
| Bun | [bun.sh](https://bun.sh) | PowerShell: `irm bun.sh/install.ps1 \| iex`, 확인 `bun -v` |
| Git for Windows | [git-scm.com](https://git-scm.com/downloads/win) | `git --version` (Code 탭에 필요) |
| GitHub CLI | [cli.github.com](https://cli.github.com) | `winget install --id GitHub.cli`, `gh auth login`, 확인 `gh auth status` |
| VS Code (선택) | [code.visualstudio.com](https://code.visualstudio.com/download) | 코드를 직접 열어 볼 때 |

설치 뒤에는 PowerShell을 완전히 닫았다가 다시 열어야 새 명령이 잡힙니다.

## 체크포인트 받기

PowerShell에서 바탕화면에 받습니다. 내 작업 폴더(`memo`)와 겹치지 않게 이름을 `memo-01`로 합니다.

```powershell
cd ~\Desktop
git clone -b checkpoint/01-home-detail https://github.com/devbrother2024/claude-code-designer-memo.git memo-01
cd memo-01
npm install
npm run dev
```

이어서 할 때는 Code 탭에서 `memo-01` 폴더를 엽니다. 체크포인트에는 `.claude`(권한 규칙, 채점 스킬)가 들어 있어 따로 옮길 것이 없습니다.

`checkpoint/02-supabase`도 같은 방법으로 `memo-02`로 받습니다. 이 체크포인트는 `.env.example`을 `.env.local`로 복사해 내 Supabase 프로젝트 URL과 공개 키를 직접 넣어야 동작합니다. P9-2로 만든 테이블과 칸이 다르면 Claude에게 "supabase 폴더의 SQL대로 memos 테이블을 다시 만들어줘"라고 합니다.

## 주의

- 교육용 예제입니다. Supabase 테이블은 실습 편의를 위해 누구나 읽고 쓸 수 있게 열어 둡니다. 실제 서비스에는 그대로 쓰지 마세요.
- 키(`.env.local`)는 GitHub에 올리지 않습니다.
