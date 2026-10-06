# Part 10. 배포

## P10-1 | GitHub 저장소 만들고 올리기

**사전 단계**: github.com에서 직접 새 저장소를 만든다(오른쪽 위 + → New repository → 이름 `memo-{내 이름}` → Create repository). 만든 화면의 HTTPS 주소를 복사한다. 강의장 PC에 GitHub CLI가 없어서 저장소 생성은 Claude에게 맡기지 않는다.

```
배포 전에 빌드가 되는지 먼저 확인해줘. 그다음 이 프로젝트를 내 GitHub 저장소 {복사한 HTTPS 주소}에 연결해서 올려줘.
`.env.local`은 올라가면 안 돼. 처음 올릴 때 GitHub 로그인 창이 뜨면 내가 허용할게.
```

**확인 포인트**: GitHub 화면에서 `.env.local`이 없는지 눈으로 본다.

## P10-2 | Vercel 배포

Vercel 화면에서 직접 진행한다(프롬프트 없음): GitHub 저장소 가져오기 → 환경변수에 `.env.local` 내용 붙여 넣기 → Deploy.

## P10-3 | 빌드 오류 고치기

```
Vercel 배포에서 아래 오류가 났어. 원인을 설명하고 고친 다음 다시 올려줘.

{Vercel 로그의 오류 붙여 넣기}
```
