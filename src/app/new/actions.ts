"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "../../lib/supabase";

export async function createMemo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!supabase || !title) return;

  const { error } = await supabase.from("memos").insert({ title, body });
  if (error) throw new Error(`메모를 저장하지 못했습니다: ${error.message}`);

  revalidatePath("/");
  redirect("/");
}
