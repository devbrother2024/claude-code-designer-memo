"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { CATEGORIES, isMemoBlocks, previewOf, type MemoLabel } from "@/lib/memos";

const LABELS: MemoLabel[] = ["blue", "green", "orange", "pink"];
const MAX_TITLE = 100;

/** 실패하면 화면에 보여 줄 문구를 돌려주고, 성공하면 홈으로 이동한다. */
export async function createMemo(input: unknown): Promise<{ error: string }> {
  const { title, category, label, body } = (input ?? {}) as Record<string, unknown>;

  const trimmed = typeof title === "string" ? title.trim() : "";
  if (trimmed === "") return { error: "제목을 입력하세요." };
  if (trimmed.length > MAX_TITLE) return { error: `제목은 ${MAX_TITLE}자까지 쓸 수 있어요.` };
  if (!CATEGORIES.some((item) => item === category)) return { error: "분류를 다시 골라 주세요." };
  if (!LABELS.some((item) => item === label)) return { error: "색을 다시 골라 주세요." };
  if (!isMemoBlocks(body)) return { error: "본문을 읽지 못했어요. 다시 시도해 주세요." };

  const { error } = await getSupabase()
    .from("memos")
    .insert({ title: trimmed, preview: previewOf(body), category, label, pinned: false, body });
  if (error) return { error: `저장하지 못했어요: ${error.message}` };

  revalidatePath("/");
  redirect("/");
}
