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

const MAX_BLOCKS = 500;

const isText = (value: unknown): value is string => typeof value === "string";

function isBlock(value: unknown): value is MemoBlock {
  if (typeof value !== "object" || value === null) return false;
  const block = value as Record<string, unknown>;
  switch (block.type) {
    case "title":
    case "heading":
      return isText(block.text);
    case "paragraph":
      return (
        Array.isArray(block.spans) &&
        block.spans.every(
          (span) =>
            typeof span === "object" &&
            span !== null &&
            isText((span as MemoSpan).text) &&
            ((span as MemoSpan).bold === undefined || typeof (span as MemoSpan).bold === "boolean"),
        )
      );
    case "list":
      return Array.isArray(block.items) && block.items.every(isText);
    default:
      return false;
  }
}

/** 밖에서 들어온 값이 본문 블록 배열 모양인지 확인한다. */
export function isMemoBlocks(value: unknown): value is MemoBlock[] {
  return Array.isArray(value) && value.length <= MAX_BLOCKS && value.every(isBlock);
}

/** 목록에 보이는 한 줄 미리보기. 본문의 첫 줄을 쓴다. */
export function previewOf(blocks: MemoBlock[]): string {
  const first = blocks.flatMap(blockLines).find((line) => line.trim() !== "");
  return first?.trim().slice(0, 100) ?? "";
}
