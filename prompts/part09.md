# Part 9. Supabase 데이터 연동

## P9-1 | Supabase MCP 연결과 테이블 만들기

```
Supabase MCP로 내 프로젝트 {Supabase 프로젝트 이름}에 `memos` 테이블을 만들어줘.
- 열: id, title(제목), body(본문), created_at(작성일)
- 지금 코드에 있는 예시 메모 3개를 넣어줘
- 누구나 읽고 쓸 수 있게 하되, 교육용이라는 주석을 남겨줘
```

## P9-2 | 홈 목록을 Supabase에서 읽기

**사전 단계**: Supabase 대시보드에서 Project URL과 공개 키(anon/publishable)를 복사해 둔다.

```
홈 목록과 상세 페이지가 코드 안의 예시 대신 Supabase `memos` 테이블에서 읽어 오게 바꿔줘.
- 키는 `.env.local`에 넣을 자리만 만들어줘. 값은 내가 직접 붙여 넣을게
- `.env.local`이 GitHub에 올라가지 않게 돼 있는지도 확인해줘
```

## P9-3 | 작성 화면 만들고 저장하기

```
"새 메모" 버튼을 누르면 가는 작성 페이지(`/new`)를 만들어줘.
- 제목과 본문 입력, 저장 버튼
- 저장하면 Supabase `memos`에 넣고 홈으로 돌아가 목록에 보이게
- Figma에는 이 화면이 없으니 기존 컴포넌트와 디자인 토큰만 써서 홈·상세와 같은 톤으로
```
