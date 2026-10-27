# 메모 앱 시작 시안 생성 플러그인 (강사용)

빈 Figma 디자인 파일에 실습용 시작 시안을 만듭니다.

## 만들어지는 것

| 종류 | 내용 |
|---|---|
| 변수 | `Colors`(색 16개, Light·Dark 두 모드, 라벨 색 4쌍 포함), `Spacing`(간격 9개, 모서리 5개). 코드 이름은 `var(--text-primary)`처럼 CSS 변수와 같음 |
| 텍스트 스타일 | heading/xl, heading/lg, title/lg, title/md, label/md, body/md, body/sm, caption/md, caption/sm, button/md (Noto Sans KR, 10개) |
| 아이콘 | `Icon/Plus`, `Icon/ChevronLeft`, `Icon/ChevronRight`, `Icon/ChevronDown`, `Icon/More`, `Icon/Note`, `Icon/Search`, `Icon/Pin`, `Icon/Share` (24px 선 아이콘 9개) |
| 컴포넌트 (15개) | 버튼 `Button/Primary`(label, icon)·`Button/Secondary`·`Button/Icon`(아이콘 바꾸기)·`Button/Text`, `Chip`(State), `Badge`(Label), `Label/Dot`(State), `Button/Format`(State), `Memo/Item`(Label 변형, title·preview·date, 미리보기 1줄 말줄임), `Card/Header`(title, pin, action), `Section/Label`, `Input/Search`, `Input/Field`(State), `Editor/Toolbar`, `Memo/ListItem`. 컴포넌트 설명에 동작을 적음(아래에 붙는 주 버튼, 20개씩 더 보기, 입력 즉시 검색, 서식 저장 등) |
| 완성 예시 | `완성 예시/Home`(분류 칩, 고정한 메모, 최근 메모), `완성 예시/All`(전체 메모 128개, 검색, 날짜별 묶음, 20개 더 보기), `완성 예시/Detail`(대제목·소제목·목록·굵은 글씨가 섞인 긴 메모), `완성 예시/Write`(분류·색 고르기, 서식 막대). P7-1이 만드는 `Mobile/Home`과 이름이 겹치지 않게 함 |
| 연습 프레임 | `연습/규칙 위반`: 오토레이아웃 없음, 간격용 빈 상자, 카드 위에 올려 둔 글자, 값으로 넣은 색, 줄 높이 Auto, 따로 그린 버튼, 자동 이름 |
| 구현 비교용 홈 (선택) | `홈_최종_v2`: `완성 예시/Home`과 픽셀이 같고 구조만 다름(좌표 배치, 사각형+글자 그룹, 값으로 넣은 색, 빈 상자, 자동 이름). 선택 실습 P5-2에서 두 화면을 각각 구현해 비교 |

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

- 실행 후 `완성 예시/Home`의 한글이 보이는지 (Noto Sans KR 필요)
- `Memo/Item` 미리보기가 1줄에서 말줄임 되는지, 분류 칩의 폭이 글자에 맞는지
- 변수 모드를 Dark로 바꾼 프레임이 어두운 화면으로 보이는지
- 완성 예시 화면을 Part 7 채점 스킬(design-check)로 채점했을 때 20점 근처로 나오는지, `연습/규칙 위반`은 낮게(6~7점) 나오는지
- `홈_최종_v2`가 `완성 예시/Home`과 같아 보이는지(스크린샷 비교)
