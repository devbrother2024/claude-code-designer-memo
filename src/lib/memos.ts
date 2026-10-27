export type MemoLabel = "blue" | "green" | "orange" | "pink";

export type MemoCategory = "업무" | "개인" | "아이디어";

export type MemoSpan = { text: string; bold?: boolean };

export type MemoBlock =
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; spans: MemoSpan[] }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  label: MemoLabel;
  category: MemoCategory;
  pinned: boolean;
  body: MemoBlock[];
};

export const CATEGORIES: MemoCategory[] = ["업무", "개인", "아이디어"];

const text = (value: string): MemoBlock => ({
  type: "paragraph",
  spans: [{ text: value }],
});

export const MEMOS: Memo[] = [
  {
    id: "design-review",
    title: "디자인 리뷰 회의록",
    preview: "검수 기준과 다음 할 일 정리",
    date: "오늘",
    createdAt: "10월 30일 오전 9:12",
    updatedAt: "오늘 오전 9:12",
    label: "blue",
    category: "업무",
    pinned: true,
    body: [
      { type: "title", text: "회의 요약" },
      {
        type: "paragraph",
        spans: [
          { text: "시안 검수 기준을 팀 규칙으로 정리했다. 목표는 " },
          { text: "AI가 구현해도 깨지지 않는 시안", bold: true },
          { text: "이다." },
        ],
      },
      { type: "heading", text: "결정한 것" },
      {
        type: "list",
        items: [
          "묶음은 오토레이아웃, 늘어날 것은 Fill",
          "색과 간격은 변수로 연결",
          "시안은 프레임 링크로 넘기기",
        ],
      },
      { type: "heading", text: "다음 할 일" },
      {
        type: "paragraph",
        spans: [
          { text: "금요일까지", bold: true },
          { text: " 각자 맡은 화면을 채점해 온다. 점수보다 깎인 이유를 먼저 본다." },
        ],
      },
      { type: "heading", text: "남은 질문" },
      text("다크 모드 색은 누가 정할지, 아이콘은 직접 그릴지 다음 회의에서 정한다."),
    ],
  },
  {
    id: "weekend-hiking",
    title: "주말 등산 준비",
    preview: "물 두 병, 간식, 바람막이 챙기기",
    date: "어제",
    createdAt: "10월 29일 오후 6:30",
    updatedAt: "어제 오후 6:30",
    label: "green",
    category: "개인",
    pinned: true,
    body: [text("물 두 병, 간식, 바람막이 챙기기")],
  },
  {
    id: "grocery-list",
    title: "장보기 목록",
    preview: "우유, 계란, 사과, 커피 원두",
    date: "오늘",
    createdAt: "10월 30일 오전 8:40",
    updatedAt: "오늘 오전 8:40",
    label: "pink",
    category: "개인",
    pinned: false,
    body: [text("우유, 계란, 사과, 커피 원두")],
  },
  {
    id: "app-icon-idea",
    title: "앱 아이콘 아이디어",
    preview: "메모지 모서리가 접힌 모양",
    date: "오늘",
    createdAt: "10월 30일 오전 11:05",
    updatedAt: "오늘 오전 11:05",
    label: "orange",
    category: "아이디어",
    pinned: false,
    body: [text("메모지 모서리가 접힌 모양")],
  },
  {
    id: "reading-list",
    title: "읽을 책",
    preview: "디자인 시스템 책 두 권",
    date: "어제",
    createdAt: "10월 29일 오후 2:20",
    updatedAt: "어제 오후 2:20",
    label: "green",
    category: "개인",
    pinned: false,
    body: [text("디자인 시스템 책 두 권")],
  },
];

export function getMemo(id: string): Memo | undefined {
  return MEMOS.find((memo) => memo.id === id);
}

function blockLines(block: MemoBlock): string[] {
  switch (block.type) {
    case "title":
    case "heading":
      return [block.text];
    case "paragraph":
      return [block.spans.map((span) => span.text).join("")];
    case "list":
      return block.items;
  }
}

/** 블록과 목록 항목 사이를 줄바꿈 한 글자로 세는 본문 글자 수 */
export function countChars(memo: Memo): number {
  return memo.body.flatMap(blockLines).join("\n").length;
}
