import type { MemoBlock, MemoSpan } from "@/lib/memos";

/** 이어진 같은 굵기의 조각을 합치고, 빈 조각은 버린다. */
function mergeSpans(spans: MemoSpan[]): MemoSpan[] {
  const merged: MemoSpan[] = [];
  for (const { text, bold } of spans) {
    if (text === "") continue;
    const last = merged.at(-1);
    if (last && Boolean(last.bold) === Boolean(bold)) last.text += text;
    else merged.push(bold ? { text, bold: true } : { text });
  }
  return merged;
}

function inlineSpans(node: Node, bold = false): MemoSpan[] {
  if (node.nodeType === Node.TEXT_NODE) {
    return [{ text: (node.textContent ?? "").replace(/ /g, " "), bold }];
  }
  if (!(node instanceof HTMLElement)) return [];
  const isBold = bold || node.tagName === "B" || node.tagName === "STRONG";
  return Array.from(node.childNodes).flatMap((child) => inlineSpans(child, isBold));
}

const textOf = (node: Node) => (node.textContent ?? "").replace(/ /g, " ").trim();

/**
 * 본문 칸(contentEditable)의 HTML을 DB에 저장하는 블록 배열로 바꾼다.
 * h2는 제목, h3은 소제목, ul은 목록, 나머지 줄은 문단(굵은 글씨 유지)이 된다.
 */
export function htmlToBlocks(root: HTMLElement): MemoBlock[] {
  const blocks: MemoBlock[] = [];
  let inline: MemoSpan[] = [];

  const flush = () => {
    const spans = mergeSpans(inline);
    inline = [];
    if (spans.some((span) => span.text.trim() !== "")) blocks.push({ type: "paragraph", spans });
  };

  for (const node of Array.from(root.childNodes)) {
    const tag = node instanceof HTMLElement ? node.tagName : "";
    if (tag === "H2" || tag === "H3") {
      flush();
      const text = textOf(node);
      if (text) blocks.push({ type: tag === "H2" ? "title" : "heading", text });
    } else if (tag === "UL" || tag === "OL") {
      flush();
      const items = Array.from(node.childNodes).map(textOf).filter(Boolean);
      if (items.length > 0) blocks.push({ type: "list", items });
    } else if (tag === "DIV" || tag === "P") {
      flush();
      inline = inlineSpans(node);
      flush();
    } else if (tag === "BR") {
      flush();
    } else {
      inline.push(...inlineSpans(node));
    }
  }
  flush();
  return blocks;
}
