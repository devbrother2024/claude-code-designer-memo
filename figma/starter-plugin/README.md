# 메모 앱 시작 시안 생성 플러그인 (강사용)

빈 Figma 디자인 파일에 실습용 시작 시안을 만듭니다.

## 만들어지는 것

| 종류 | 내용 |
|---|---|
| 변수 | `Colors`(색 9개), `Spacing`(간격 8개, 모서리 1개) |
| 텍스트 스타일 | heading/xl, title/md, body/md, body/sm, caption/sm, button/md (Noto Sans KR) |
| 컴포넌트 | `Button/Primary`(label 속성), `Card/Memo`(title, preview, date 속성) |
| 완성 예시 | `Mobile/Home`, `Mobile/Detail` (390×844) |
| 연습 프레임 | `연습/규칙 위반`: 오토레이아웃 없음, 간격용 빈 상자, 값으로 넣은 색, 따로 그린 버튼, 자동 이름 |

디자인 토큰 값은 체크포인트 브랜치의 `src/app/globals.css`와 같습니다.

## 실행 방법 A: Figma 데스크톱 앱 (MCP 한도와 무관)

1. Figma 데스크톱 앱에서 새 디자인 파일을 엽니다.
2. 메뉴 Plugins → Development → Import plugin from manifest... 에서 이 폴더의 `manifest.json`을 선택합니다.
3. Plugins → Development → 메모 앱 시작 시안 생성 을 실행합니다.
4. 하단에 "시작 시안 생성 완료" 메시지가 뜨면 끝입니다.

## 실행 방법 B: Claude Code + Figma MCP (Full seat 필요)

```
이 Figma 파일에서 figma/starter-plugin/code.js의 buildStarter 함수를 use_figma로 실행해줘: {빈 디자인 파일 링크}
마지막의 figma.closePlugin 호출 부분은 빼고, buildStarter()의 반환값을 보여줘.
```

## 확인할 것

- 실행 후 `Mobile/Home`의 한글이 보이는지 (Noto Sans KR 필요)
- `Card/Memo` 미리보기가 2줄에서 말줄임 되는지
- 완성 예시 화면을 Part 7 검수 스킬로 채점했을 때 점수가 높게 나오는지, `연습/규칙 위반`은 낮게 나오는지
