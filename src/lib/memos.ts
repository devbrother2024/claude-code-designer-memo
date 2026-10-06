import { supabase } from "./supabase";

export type Memo = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export async function getMemos(): Promise<Memo[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("memos")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`메모 목록을 불러오지 못했습니다: ${error.message}`);
  return data ?? [];
}

export async function getMemo(id: string): Promise<Memo | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("memos")
    .select("id, title, body, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`메모를 불러오지 못했습니다: ${error.message}`);
  return data;
}

export function formatDate(iso: string, withTime = false) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(new Date(iso));
}
