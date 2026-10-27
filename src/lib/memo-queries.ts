import { connection } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { Memo, MemoBlock, MemoCategory, MemoLabel } from "@/lib/memos";

type MemoRow = {
  id: string;
  title: string;
  preview: string;
  category: MemoCategory;
  label: MemoLabel;
  pinned: boolean;
  body: MemoBlock[];
  created_at: string;
  updated_at: string;
};

const TIME_ZONE = "Asia/Seoul";
const DAY = 24 * 60 * 60 * 1000;

const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE });
const clock = new Intl.DateTimeFormat("ko-KR", {
  timeZone: TIME_ZONE,
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const todayLong = new Intl.DateTimeFormat("ko-KR", {
  timeZone: TIME_ZONE,
  month: "long",
  day: "numeric",
  weekday: "long",
});

/** "10월 30일", "오전 9:12"처럼 Intl이 나눠 준 조각을 우리 표기로 다시 조립한다. */
function clockParts(date: Date) {
  const part = (type: string) =>
    clock.formatToParts(date).find((p) => p.type === type)?.value ?? "";
  return {
    day: `${part("month")}월 ${part("day")}일`,
    time: `${part("dayPeriod")} ${part("hour")}:${part("minute")}`,
  };
}

/** 오늘과 어제는 말로, 그 밖에는 "10월 30일"로 보여 준다. */
function dayLabel(date: Date, now: Date): string {
  const key = dayKey.format(date);
  if (key === dayKey.format(now)) return "오늘";
  if (key === dayKey.format(new Date(now.getTime() - DAY))) return "어제";
  return clockParts(date).day;
}

function toMemo(row: MemoRow, now: Date): Memo {
  const created = clockParts(new Date(row.created_at));
  const updatedAt = new Date(row.updated_at);
  const updated = clockParts(updatedAt);
  const date = dayLabel(updatedAt, now);
  return {
    id: row.id,
    title: row.title,
    preview: row.preview,
    date,
    createdAt: `${created.day} ${created.time}`,
    updatedAt: `${date} ${updated.time}`,
    label: row.label,
    category: row.category,
    pinned: row.pinned,
    body: row.body,
  };
}

/** 최근에 쓴 메모가 위로 오게 모든 메모를 읽어 온다. */
export async function getMemos(): Promise<Memo[]> {
  await connection();
  const { data, error } = await getSupabase()
    .from("memos")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<MemoRow[]>();
  if (error) throw new Error(`메모를 불러오지 못했습니다: ${error.message}`);
  const now = new Date();
  return data.map((row) => toMemo(row, now));
}

/** id에 맞는 메모 하나. 없으면 undefined. */
export async function getMemo(id: string): Promise<Memo | undefined> {
  await connection();
  const { data, error } = await getSupabase()
    .from("memos")
    .select("*")
    .eq("id", id)
    .maybeSingle<MemoRow>();
  if (error) throw new Error(`메모를 불러오지 못했습니다: ${error.message}`);
  return data ? toMemo(data, new Date()) : undefined;
}

/** 홈 머리말에 쓰는 오늘 날짜. 예: "10월 30일 금요일" */
export async function getToday(): Promise<string> {
  await connection();
  return todayLong.format(new Date());
}
