@AGENTS.md

## 디자인 토큰 (Figma 메모 앱 시작 시안)

| Figma 변수 | 값 | CSS 변수 |
|---|---|---|
| color/primary | #3B62F6 | --color-primary |
| surface/page | #F7F8FA | --surface-page |
| surface/card | #FFFFFF | --surface-card |
| text/primary | #111827 | --text-primary |
| text/body | #374151 | --text-body |
| text/secondary | #6B7280 | --text-secondary |
| text/muted | #9CA3AF | --text-muted |
| text/on-primary | #FFFFFF | --text-on-primary |
| border/default | #E5E7EB | --border-default |
| space/4, 6, 12, 16, 20, 24, 34, 64 | px | --space-N |
| radius/md | 12px | --radius-md |

텍스트 스타일: heading/xl 28/36 Bold, title/md 17/24 Bold, body/md 16/26, body/sm 14/20, caption/sm 12/16 Medium, button/md 16/20 Bold. 폰트는 Noto Sans KR.

## 디자인 규칙
- 위 디자인 토큰에 없는 색·간격·모서리 값은 쓰지 않는다. 새 값이 필요하면 먼저 물어본다.
- 같은 모양의 UI는 기존 컴포넌트(MemoCard, PrimaryButton)를 재사용한다.
- 한글 텍스트는 Noto Sans KR을 쓴다.
- 코드에서는 globals.css의 CSS 변수와 Tailwind 이름만 쓴다.
