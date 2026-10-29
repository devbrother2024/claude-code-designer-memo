import { useSyncExternalStore } from "react";
import { CATEGORIES, previewOf } from "./memos";
import type { Block, Memo, MemoCategory, MemoColor, Run } from "./memos";

// 이 브라우저(localStorage)에 저장하는 메모와 작성 중 초안
const MEMOS_KEY = "memo-app:memos:v1";
const DRAFT_KEY = "memo-app:draft:v1";

const COLORS: MemoColor[] = ["blue", "green", "orange", "pink"];

export type StoredMemo = {
  id: string;
  title: string;
  category: MemoCategory;
  color: MemoColor;
  blocks: Block[];
  createdAt: number;
  updatedAt: number;
};

export type Draft = Pick<StoredMemo, "title" | "category" | "color" | "blocks">;

// ---- 저장된 값은 믿지 않고 모양을 확인한다 ----

function isRun(value: unknown): value is Run {
  if (typeof value === "string") return true;
  const v = value as { bold?: unknown } | null;
  return typeof v === "object" && v !== null && typeof v.bold === "string";
}

function isRuns(value: unknown): value is Run[] {
  return Array.isArray(value) && value.every(isRun);
}

function isBlock(value: unknown): value is Block {
  const b = value as { type?: unknown; text?: unknown; runs?: unknown; items?: unknown } | null;
  if (typeof b !== "object" || b === null) return false;
  switch (b.type) {
    case "title":
    case "heading":
      return typeof b.text === "string";
    case "paragraph":
      return isRuns(b.runs);
    case "list":
      return Array.isArray(b.items) && b.items.every((i) => typeof i === "string" || isRuns(i));
    default:
      return false;
  }
}

function isDraft(value: unknown): value is Draft {
  const d = value as Partial<Draft> | null;
  return (
    typeof d === "object" &&
    d !== null &&
    typeof d.title === "string" &&
    (CATEGORIES as readonly unknown[]).includes(d.category) &&
    (COLORS as unknown[]).includes(d.color) &&
    Array.isArray(d.blocks) &&
    d.blocks.every(isBlock)
  );
}

function isStoredMemo(value: unknown): value is StoredMemo {
  const m = value as Partial<StoredMemo> | null;
  return (
    isDraft(value) &&
    typeof m?.id === "string" &&
    typeof m.createdAt === "number" &&
    typeof m.updatedAt === "number"
  );
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null): boolean {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function parseMemos(raw: string | null): StoredMemo[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredMemo) : [];
  } catch {
    return [];
  }
}

// ---- 메모 목록: useSyncExternalStore로 읽는다 ----

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedDay: string | undefined;
let cachedList: Memo[] = [];

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener); // 다른 탭에서 바뀐 경우
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// 브라우저에서만 불린다. 오늘·어제 같은 날짜 글자를 만들려고 지금 시각을 여기서 읽는다.
// 저장된 값이나 날이 바뀐 경우에만 다시 만들어 같은 배열을 돌려준다.
function getSnapshot(): Memo[] {
  const raw = readStorage(MEMOS_KEY);
  const now = new Date();
  const day = now.toDateString();
  if (raw !== cachedRaw || day !== cachedDay) {
    cachedRaw = raw;
    cachedDay = day;
    cachedList = parseMemos(raw).map((stored) => toMemo(stored, now));
  }
  return cachedList;
}

// 서버와 하이드레이션 중에는 아직 모른다
function getServerSnapshot(): Memo[] | null {
  return null;
}

// 이 브라우저에 저장한 메모(최근 것이 앞). null이면 아직 브라우저에서 읽기 전이다.
export function useSavedMemos(): Memo[] | null {
  return useSyncExternalStore<Memo[] | null>(subscribe, getSnapshot, getServerSnapshot);
}

// http://100.x 같은 보안 컨텍스트가 아닌 주소에서는 crypto.randomUUID가 없어서 직접 만든다
function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// 가장 최근 메모가 맨 앞에 온다. 저장하지 못하면 null.
export function saveMemo(input: Draft): StoredMemo | null {
  const now = Date.now();
  const memo: StoredMemo = {
    ...input,
    title: input.title.trim() || "제목 없음",
    id: newId(),
    createdAt: now,
    updatedAt: now,
  };
  const next = [memo, ...parseMemos(readStorage(MEMOS_KEY))];
  if (!writeStorage(MEMOS_KEY, JSON.stringify(next))) return null;
  notify();
  return memo;
}

// ---- 작성 중 초안(자동 저장) ----

let draftRaw: string | null | undefined;
let draftValue: Draft | null = null;

function noSubscription() {
  return () => {};
}

function getDraftSnapshot(): Draft | null {
  const raw = readStorage(DRAFT_KEY);
  if (raw !== draftRaw) {
    draftRaw = raw;
    draftValue = null;
    if (raw) {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (isDraft(parsed)) draftValue = parsed;
      } catch {
        draftValue = null;
      }
    }
  }
  return draftValue;
}

// undefined면 아직 브라우저에서 읽기 전, null이면 이어 쓸 초안이 없다
export function useSavedDraft(): Draft | null | undefined {
  return useSyncExternalStore<Draft | null | undefined>(
    noSubscription,
    getDraftSnapshot,
    () => undefined,
  );
}

export function writeDraft(draft: Draft): boolean {
  return writeStorage(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDraft() {
  writeStorage(DRAFT_KEY, null);
}

// ---- 저장된 메모를 화면용 Memo로 바꾼다(날짜 글자는 보는 날을 기준으로 만든다) ----

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayLabel(date: Date, now: Date): string {
  if (sameDay(date, now)) return "오늘";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay(date, yesterday)) return "어제";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function clockLabel(date: Date): string {
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour < 12 ? "오전" : "오후"} ${hour % 12 || 12}:${minute}`;
}

export function toMemo(stored: StoredMemo, now: Date): Memo {
  const created = new Date(stored.createdAt);
  const updated = new Date(stored.updatedAt);
  return {
    id: stored.id,
    title: stored.title,
    preview: previewOf(stored.blocks),
    date: dayLabel(created, now),
    color: stored.color,
    category: stored.category,
    pinned: false,
    createdAt: `${created.getMonth() + 1}월 ${created.getDate()}일 ${clockLabel(created)}`,
    updatedAt: `${dayLabel(updated, now)} ${clockLabel(updated)}`,
    blocks: stored.blocks,
  };
}
