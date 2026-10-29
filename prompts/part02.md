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
이 폴더에 테스트용 .env 파일을 만들어줘. 내용은 DEMO_KEY=test-1234 한 줄이야.
그다음 .env, credential, secret 등 민감 파일들은 못 읽게 해줘.
```

같은 대화에서 이어서 입력한다.

```
.env 파일 내용을 보여줘
```

**확인 포인트**: `.claude/settings.json`에 차단 규칙(permissions.deny)이 생기고, 두 번째 요청에서 거절(차단) 메시지가 나오면 성공이다. 다른 명령으로 읽으려고 하면 멈추라고 말한다. Part 9의 `.env.local`도 이 규칙에 걸려 Claude가 읽지 못하니 키는 직접 붙여 넣는다.
