export type MemoColor = "blue" | "green" | "orange" | "pink";

export const CATEGORIES = ["업무", "개인", "아이디어"] as const;
export type MemoCategory = (typeof CATEGORIES)[number];

// 문단 안의 글: 그냥 글 또는 굵은 글
export type Run = string | { bold: string };

// 목록 한 줄: 그냥 글 또는 굵은 글이 섞인 글
export type ListItem = string | Run[];

// title은 title/lg(제목), heading은 title/md(소제목) 스타일로 그린다
export type Block =
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; runs: Run[] }
  | { type: "list"; items: ListItem[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  color: MemoColor;
  category: MemoCategory;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  blocks: Block[];
};

// 디자인 시안의 샘플 데이터. 저장 기능이 붙기 전까지 화면 확인용으로 쓴다.
export const TODAY_LABEL = "10월 30일 금요일";
export const TOTAL_MEMO_COUNT = 128;

export const MEMOS: Memo[] = [
  {
    id: "design-review",
    title: "디자인 리뷰 회의록",
    preview: "검수 기준과 다음 할 일 정리",
    date: "오늘",
    color: "blue",
    category: "업무",
    pinned: true,
    createdAt: "10월 30일 오전 9:12",
    updatedAt: "오늘 오전 9:12",
    blocks: [
      { type: "title", text: "회의 요약" },
      {
        type: "paragraph",
        runs: [
          "시안 검수 기준을 팀 규칙으로 정리했다. 목표는 ",
          { bold: "AI가 구현해도 깨지지 않는 시안" },
          "이다.",
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
        runs: [
          { bold: "금요일까지" },
          " 각자 맡은 화면을 채점해 온다. 점수보다 깎인 이유를 먼저 본다.",
        ],
      },
      { type: "heading", text: "남은 질문" },
      {
        type: "paragraph",
        runs: ["다크 모드 색은 누가 정할지, 아이콘은 직접 그릴지 다음 회의에서 정한다."],
      },
    ],
  },
  {
    id: "hiking",
    title: "주말 등산 준비",
    preview: "물 두 병, 간식, 바람막이 챙기기",
    date: "어제",
    color: "green",
    category: "개인",
    pinned: true,
    createdAt: "10월 29일 오후 6:30",
    updatedAt: "어제 오후 6:30",
    blocks: [
      { type: "title", text: "챙길 것" },
      { type: "list", items: ["물 두 병", "간식", "바람막이"] },
    ],
  },
  {
    id: "groceries",
    title: "장보기 목록",
    preview: "우유, 계란, 사과, 커피 원두",
    date: "오늘",
    color: "pink",
    category: "개인",
    pinned: false,
    createdAt: "10월 30일 오전 8:05",
    updatedAt: "오늘 오전 8:05",
    blocks: [
      { type: "title", text: "살 것" },
      { type: "list", items: ["우유", "계란", "사과", "커피 원두"] },
    ],
  },
  {
    id: "app-icon",
    title: "앱 아이콘 아이디어",
    preview: "메모지 모서리가 접힌 모양",
    date: "오늘",
    color: "orange",
    category: "아이디어",
    pinned: false,
    createdAt: "10월 30일 오전 7:40",
    updatedAt: "오늘 오전 7:40",
    blocks: [
      { type: "title", text: "아이디어" },
      { type: "paragraph", runs: ["메모지 모서리가 접힌 모양"] },
    ],
  },
  {
    id: "books",
    title: "읽을 책",
    preview: "디자인 시스템 책 두 권",
    date: "어제",
    color: "green",
    category: "개인",
    pinned: false,
    createdAt: "10월 29일 오후 9:15",
    updatedAt: "어제 오후 9:15",
    blocks: [
      { type: "title", text: "책 목록" },
      { type: "list", items: ["디자인 시스템 책 두 권"] },
    ],
  },
];

export function findMemo(id: string): Memo | undefined {
  return MEMOS.find((m) => m.id === id);
}

export function runsOf(item: ListItem): Run[] {
  return typeof item === "string" ? [item] : item;
}

export function runsText(runs: Run[]): string {
  return runs.map((run) => (typeof run === "string" ? run : run.bold)).join("");
}

// 블록마다 글 한 덩어리씩 뽑는다
function blockTexts(blocks: Block[]): string[] {
  return blocks.flatMap((b) => {
    if (b.type === "paragraph") return [runsText(b.runs)];
    if (b.type === "list") return b.items.map((item) => runsText(runsOf(item)));
    return [b.text];
  });
}

// 본문 글자 수: 블록의 글을 공백 하나로 이어 붙인 길이
export function countChars(memo: Pick<Memo, "blocks">): number {
  return blockTexts(memo.blocks).join(" ").length;
}

// 목록 미리보기: 제목·소제목이 아닌 첫 글, 없으면 첫 글
export function previewOf(blocks: Block[]): string {
  const body = blocks.find((b) => b.type === "paragraph" || b.type === "list");
  const texts = blockTexts(body ? [body] : blocks);
  return texts[0] ?? "";
}
