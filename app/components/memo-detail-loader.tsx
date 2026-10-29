"use client";

import { notFound } from "next/navigation";
import { findMemo } from "../data/memos";
import { useSavedMemos } from "../data/memo-store";
import { MemoDetail, MemoDetailFallback } from "./memo-detail";

// 시안 샘플 메모는 바로, 이 브라우저에 저장한 메모는 읽은 뒤에 보여 준다
export function MemoDetailLoader({ id }: { id: string }) {
  const saved = useSavedMemos();

  const sample = findMemo(id);
  if (sample) return <MemoDetail memo={sample} />;

  if (saved === null) return <MemoDetailFallback />;
  const memo = saved.find((m) => m.id === id);
  if (!memo) notFound();
  return <MemoDetail memo={memo} />;
}
