export type Memo = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

// 체크포인트 01: 아직 데이터베이스가 없어서 코드 안의 예시 메모를 쓴다.
export const sampleMemos: Memo[] = [
  {
    id: "1",
    title: "장보기 목록",
    body: "우유, 계란, 사과, 커피 원두. 주말 전에 꼭 사 두기",
    createdAt: "2026-10-30T09:10:00+09:00",
  },
  {
    id: "2",
    title: "회의 메모",
    body: "시안 검수 기준을 팀 규칙으로 정리하고 다음 주에 공유하기로 함.\n\n다음 회의 전까지 각자 맡은 화면을 검수 스킬로 한 번씩 채점해 오기.",
    createdAt: "2026-10-29T15:20:00+09:00",
  },
  {
    id: "3",
    title: "읽을 책",
    body: "디자인 시스템 관련 책 두 권, 출퇴근길에 한 챕터씩 읽기",
    createdAt: "2026-10-28T20:45:00+09:00",
  },
];

export function formatDate(iso: string, withTime = false) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(d);
}
