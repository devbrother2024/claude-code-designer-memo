# 디자인 토큰 규칙 (Figma memo): 변수 이름 그대로 쓰고 hex·px 값을 직접 쓰지 않는다
## 색 (Colors, 모드 Light/Dark)
| 변수 | Light | Dark |
|---|---|---|
| color/primary | #3182F6 | #4D94FF |
| surface/page · surface/card | #F2F4F6 · #FFFFFF | #101014 · #1C1C22 |
| text/primary · text/secondary · text/muted · text/on-primary | #191F28 · #4E5968 · #8B95A1 · #FFFFFF | #F1F3F5 · #B3BAC2 · #6E7783 · #FFFFFF |
| border/default | #E5E8EB | #2A2A33 |
| label/blue · label/blue-soft | #3182F6 · #E8F3FF | #6AA6FF · #1D2A40 |
| label/green · label/green-soft | #12A150 · #E3F8EC | #3CCB7F · #17302A |
| label/orange · label/orange-soft | #F76808 · #FFF1E5 | #FF9446 · #3A2817 |
| label/pink · label/pink-soft | #E5397A · #FFEAF1 | #FF6FA2 · #3B1D2A |
## 간격 (Spacing, GAP)
| space/4 | space/8 | space/12 | space/16 | space/20 | space/24 | space/34 | space/48 | space/64 |
|---|---|---|---|---|---|---|---|---|
| 4 | 8 | 12 | 16 | 20 | 24 | 34 | 48 | 64 |
## 모서리 (Spacing, CORNER_RADIUS)
| radius/sm | radius/md | radius/lg | radius/xl | radius/full |
|---|---|---|---|---|
| 12 | 16 | 20 | 24 | 999 |
## 텍스트 스타일 (Noto Sans KR)
| 스타일 | 굵기 | 크기/행간 | 자간 |
|---|---|---|---|
| heading/xl · heading/lg | Bold | 28/38 · 26/36 | -0.8 · -0.8 |
| title/lg · title/md | Bold | 20/28 · 17/24 | -0.4 · -0.3 |
| label/md · button/md | Bold | 15/22 · 17/24 | -0.2 · -0.2 |
| body/md · body/sm | Regular | 16/28 · 14/20 | -0.2 · -0.1 |
| caption/md · caption/sm | Medium | 15/22 · 13/18 | -0.2 · 0 |

## 디자인 규칙
- 위 디자인 토큰에 없는 색·간격·모서리 값은 쓰지 않는다. 새 값이 필요하면 먼저 물어본다.
- 같은 모양의 UI는 기존 컴포넌트를 재사용한다.
- 한글은 Noto Sans KR로 쓰고, 단어 중간에서 줄을 바꾸지 않는다.
- 코드에서는 디자인 토큰 이름만 쓰고, 아이콘 색은 글자색을 따른다. hex·px 값을 직접 쓰지 않고 `app/globals.css`에 연결된 토큰 클래스(`bg-surface-card`, `p-space-16`, `rounded-md`, `text-body-md`)나 변수(`var(--color-primary)`)로 쓴다.

@AGENTS.md
