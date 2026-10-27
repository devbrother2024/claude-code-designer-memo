# Part 10. 배포

## P10-1 | GitHub 저장소 만들고 올리기

**사전 단계**: github.com에서 직접 새 저장소를 만든다(오른쪽 위 + → New repository → 이름 `memo-{내 이름}` → Create repository). 만든 화면의 HTTPS 주소를 복사한다. 강의장 PC에 GitHub CLI가 없어서 저장소 생성은 Claude에게 맡기지 않는다.

**과제**: 복사한 저장소 주소를 주고 이 프로젝트를 올려 달라고 내 말로 요청한다. 키가 든 `.env.local`은 빼 달라고 한다. 막히면 아래 참고 프롬프트를 쓴다.

```
이 프로젝트를 내 GitHub 저장소 {복사한 HTTPS 주소}에 올려줘.
올리기 전에 배포해도 오류가 없는지 확인하고, 키가 든 .env.local은 올리지 마.
```

**확인 포인트**: GitHub 화면에서 `.env.local`이 없는지 눈으로 본다.

## P10-2 | Vercel 배포

Vercel 화면에서 직접 진행한다(프롬프트 없음): GitHub 저장소 가져오기 → 환경변수에 `.env.local` 내용 붙여 넣기 → Deploy.

## P10-3 | 빌드 오류 고치기

```
Vercel 배포에서 아래 오류가 났어. 고쳐서 다시 올려줘.

{Vercel 로그의 오류 붙여 넣기}
```
