// 저장 기능이 생기기 전까지 쓰는 샘플 데이터 (Figma Mobile/Home, Mobile/Detail 기준)
// 첫 번째 메모만 디자인에 본문이 있고, 나머지 본문과 시각은 목록 미리보기에서 이어 만든 샘플이다.
export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  createdAt: string;
  body: string[];
};

export const MEMOS: Memo[] = [
  {
    id: "1",
    title: "장보기 목록",
    preview: "우유, 계란, 사과, 커피 원두",
    date: "10월 30일",
    createdAt: "10월 30일 오전 9:12",
    body: [
      "우유, 계란, 사과, 커피 원두를 퇴근길에 사 가기.",
      "주말에 쓸 반찬 재료도 함께 확인하기.",
    ],
  },
  {
    id: "2",
    title: "회의 안건 정리",
    preview: "디자인 시스템 리뷰, 일정 공유",
    date: "10월 29일",
    createdAt: "10월 29일 오후 2:40",
    body: [
      "디자인 시스템 리뷰 결과를 먼저 공유하기.",
      "다음 주 일정과 담당자도 함께 정리하기.",
    ],
  },
  {
    id: "3",
    title: "주말 여행 계획",
    preview: "숙소 예약, 렌터카 확인",
    date: "10월 27일",
    createdAt: "10월 27일 오후 8:05",
    body: [
      "숙소 예약 내역을 다시 확인하기.",
      "렌터카 픽업 시간과 보험 조건도 확인하기.",
    ],
  },
];

export function getMemo(id: string): Memo | undefined {
  return MEMOS.find((memo) => memo.id === id);
}
