# 디자인 토큰 (Figma memo): 값을 하드코딩하지 말고 아래 변수 이름 그대로 쓴다
| 색 변수 | Light | Dark |
|---|---|---|
| `color/primary` | #3182F6 | #4D94FF |
| `surface/page`, `surface/card` | #F2F4F6, #FFFFFF | #101014, #1C1C22 |
| `text/primary` | #191F28 | #F1F3F5 |
| `text/secondary` | #4E5968 | #B3BAC2 |
| `text/muted` | #8B95A1 | #6E7783 |
| `text/on-primary` | #FFFFFF | #FFFFFF |
| `border/default` | #E5E8EB | #2A2A33 |
| `label/blue`, `label/blue-soft` | #3182F6, #E8F3FF | #6AA6FF, #1D2A40 |
| `label/green`, `label/green-soft` | #12A150, #E3F8EC | #3CCB7F, #17302A |
| `label/orange`, `label/orange-soft` | #F76808, #FFF1E5 | #FF9446, #3A2817 |
| `label/pink`, `label/pink-soft` | #E5397A, #FFEAF1 | #FF6FA2, #3B1D2A |

| 간격 변수 | `space/4` | `space/8` | `space/12` | `space/16` | `space/20` | `space/24` | `space/34` | `space/48` | `space/64` |
|---|---|---|---|---|---|---|---|---|---|
| 값(px) | 4 | 8 | 12 | 16 | 20 | 24 | 34 | 48 | 64 |

| 모서리 변수 | `radius/sm` | `radius/md` | `radius/lg` | `radius/xl` | `radius/full` |
|---|---|---|---|---|---|
| 값(px) | 12 | 16 | 20 | 24 | 999 |

| 텍스트 스타일 | 폰트 | 크기/행간/자간(px) |
|---|---|---|
| `heading/xl`, `heading/lg` | Noto Sans KR Bold | 28/38/-0.8, 26/36/-0.8 |
| `title/md` | Noto Sans KR Bold | 17/24/-0.3 |
| `body/md`, `body/sm` | Noto Sans KR Regular | 16/28/-0.2, 14/20/-0.1 |
| `caption/md`, `caption/sm` | Noto Sans KR Medium | 15/22/-0.2, 13/18/0 |
| `button/md` | Noto Sans KR Bold | 17/24/-0.2 |

## 디자인 규칙
- 위 디자인 토큰에 없는 색·간격·모서리 값은 쓰지 않는다. 새 값이 필요하면 먼저 물어본다.
- 같은 모양의 UI는 기존 컴포넌트를 재사용한다.
- 한글은 Noto Sans KR로 쓰고, 단어 중간에서 줄을 바꾸지 않는다.
- 코드에서는 디자인 토큰 이름만 쓴다. `bg-surface-card`, `p-space-16`, `rounded-md`, `text-body-md`처럼 쓰고 `#fff`, `16px` 같은 값을 직접 쓰지 않는다. 토큰 정의는 `src/app/globals.css`다.

@AGENTS.md
