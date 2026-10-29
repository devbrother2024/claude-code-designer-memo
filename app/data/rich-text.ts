import type { Block, ListItem, Run } from "./memos";
import { runsOf } from "./memos";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function runsToHtml(runs: Run[]): string {
  return runs
    .map((run) => (typeof run === "string" ? escapeHtml(run) : `<b>${escapeHtml(run.bold)}</b>`))
    .join("");
}

// 저장된 블록을 편집기 안에 다시 넣을 HTML로 바꾼다
export function blocksToHtml(blocks: Block[]): string {
  if (blocks.length === 0) return "<div><br></div>";
  return blocks
    .map((block) => {
      switch (block.type) {
        case "title":
          return `<h2>${escapeHtml(block.text)}</h2>`;
        case "heading":
          return `<h3>${escapeHtml(block.text)}</h3>`;
        case "paragraph":
          return `<div>${runsToHtml(block.runs)}</div>`;
        case "list": {
          const items = block.items.map((item: ListItem) => `<li>${runsToHtml(runsOf(item))}</li>`);
          return `<ul>${items.join("")}</ul>`;
        }
      }
    })
    .join("");
}

// 글자를 굵은 글 / 그냥 글로 나눠 담는다. 이웃한 같은 종류는 하나로 합친다.
function pushRun(runs: Run[], text: string, bold: boolean) {
  if (!text) return;
  const last = runs[runs.length - 1];
  if (bold) {
    if (last && typeof last !== "string") last.bold += text;
    else runs.push({ bold: text });
  } else if (typeof last === "string") {
    runs[runs.length - 1] = last + text;
  } else {
    runs.push(text);
  }
}

function collectNode(node: Node, bold: boolean, runs: Run[]) {
  if (node.nodeType === Node.TEXT_NODE) {
    // 편집기가 넣는 줄바꿈 없는 공백(nbsp)은 보통 공백으로 되돌린다
    pushRun(runs, (node.textContent ?? "").replace(/\u00a0/g, " "), bold);
  } else if (node instanceof HTMLElement && node.tagName !== "BR") {
    const childBold = bold || node.tagName === "B" || node.tagName === "STRONG";
    node.childNodes.forEach((child) => collectNode(child, childBold, runs));
  }
}

function trimRuns(runs: Run[]): Run[] {
  if (runs.length === 0) return runs;
  const first = runs[0];
  runs[0] = typeof first === "string" ? first.trimStart() : { bold: first.bold.trimStart() };
  const last = runs[runs.length - 1];
  runs[runs.length - 1] =
    typeof last === "string" ? last.trimEnd() : { bold: last.bold.trimEnd() };
  return runs.filter((run) => (typeof run === "string" ? run : run.bold) !== "");
}

function runsOfNode(node: Node): Run[] {
  const runs: Run[] = [];
  collectNode(node, false, runs);
  return trimRuns(runs);
}

function plainText(node: Node): string {
  return (node.textContent ?? "").replace(/\u00a0/g, " ").trim();
}

const BLOCK_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "P", "DIV", "BLOCKQUOTE"]);

function isBlockElement(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName);
}

// 문단·div가 다른 블록을 품고 있으면(브라우저가 중첩해서 만들 때가 있다) 안쪽 블록을 하나씩 꺼낸다
function walk(parent: Node, blocks: Block[]) {
  let inline: Run[] = [];
  const flush = () => {
    const runs = trimRuns(inline);
    if (runs.length > 0) blocks.push({ type: "paragraph", runs });
    inline = [];
  };

  parent.childNodes.forEach((node) => {
    if (!isBlockElement(node)) {
      collectNode(node, false, inline);
      return;
    }
    flush();
    switch (node.tagName) {
      case "H1":
      case "H2": {
        const text = plainText(node);
        if (text) blocks.push({ type: "title", text });
        break;
      }
      case "H3":
      case "H4":
      case "H5":
      case "H6": {
        const text = plainText(node);
        if (text) blocks.push({ type: "heading", text });
        break;
      }
      case "UL":
      case "OL": {
        const items: ListItem[] = [];
        node.querySelectorAll(":scope > li").forEach((li) => {
          const runs = runsOfNode(li);
          if (runs.length > 0) items.push(runs);
        });
        if (items.length > 0) blocks.push({ type: "list", items });
        break;
      }
      default:
        walk(node, blocks);
    }
  });
  flush();
}

// 편집기 안의 HTML을 저장할 블록으로 바꾼다. 빈 줄은 버린다.
export function domToBlocks(root: HTMLElement): Block[] {
  const blocks: Block[] = [];
  walk(root, blocks);
  return blocks;
}
