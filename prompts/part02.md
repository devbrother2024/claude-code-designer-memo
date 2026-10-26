# Part 2. Claude Code 핵심 기능과 내부 동작

## P2-1 | 컨텍스트 확인

Part 1에서 연 지금 대화에서 그대로 입력한다. Part 3 실습 ② 게임을 만든 뒤 같은 대화에서 한 번 더 입력해 얼마나 늘었는지 비교한다.

```
/context
```

## P2-2 | 사용량 확인

```
/usage
```

## P2-3 | .env 막기, permissions.deny

```
이 폴더에 테스트용 `.env` 파일을 만들어줘. 내용은 DEMO_KEY=test-1234 한 줄이야.
그다음 `.claude/settings.json`을 만들어서 permissions.deny로 `.env` 파일을 읽지 못하게 막아줘.
- 규칙: Read(./.env), Read(./.env.*), Bash(cat .env*)
```

같은 대화에서 이어서 입력한다.

```
.env 파일 내용을 보여줘
```

**확인 포인트**: 거절(차단) 메시지가 나오면 성공이다. 다른 명령으로 읽으려고 하면 멈추라고 말한다. Part 9의 `.env.local`도 같은 규칙(`.env.*`)으로 막혀서 값은 직접 붙여 넣는다.
