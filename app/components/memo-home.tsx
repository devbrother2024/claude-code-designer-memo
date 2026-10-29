"use client";

import { useState } from "react";
import { CATEGORIES, MEMOS, TODAY_LABEL, TOTAL_MEMO_COUNT } from "../data/memos";
import type { MemoCategory } from "../data/memos";
import { useSavedMemos } from "../data/memo-store";
import { BottomBar } from "./bottom-bar";
import { ButtonPrimary } from "./button-primary";
import { CardHeader } from "./card-header";
import { Chip } from "./chip";
import { MemoItem } from "./memo-item";

type Filter = "전체" | MemoCategory;
const FILTERS: Filter[] = ["전체", ...CATEGORIES];

export function MemoHome() {
  const [filter, setFilter] = useState<Filter>("전체");

  // 이 브라우저에 저장한 메모가 시안 샘플보다 앞에 온다
  const savedMemos = useSavedMemos() ?? [];
  const visible = [...savedMemos, ...MEMOS].filter(
    (m) => filter === "전체" || m.category === filter,
  );
  const pinned = visible.filter((m) => m.pinned);
  const recent = visible.filter((m) => !m.pinned);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <main className="flex flex-1 flex-col gap-space-16 px-space-16 pt-space-64">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="text-caption-md text-text-muted">{TODAY_LABEL}</p>
          <h1 className="text-heading-xl text-text-primary">
            <span className="block">오늘까지 메모를</span>
            <span className="block">
              <span className="text-primary">{TOTAL_MEMO_COUNT + savedMemos.length}개</span> 남겼어요
            </span>
          </h1>
        </header>

        <div role="group" aria-label="메모 분류" className="flex gap-space-8 px-space-4">
          {FILTERS.map((f) => (
            <Chip key={f} label={f} selected={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {pinned.length > 0 && (
          <section
            aria-labelledby="pinned-title"
            className="rounded-xl bg-surface-card py-space-8"
          >
            <CardHeader id="pinned-title" title="고정한 메모" pin />
            <ul>
              {pinned.map((memo) => (
                <MemoItem key={memo.id} {...memo} />
              ))}
            </ul>
          </section>
        )}

        {recent.length > 0 && (
          <section
            aria-labelledby="recent-title"
            className="rounded-xl bg-surface-card py-space-8"
          >
            <CardHeader id="recent-title" title="최근 메모" action />
            <ul>
              {recent.map((memo) => (
                <MemoItem key={memo.id} {...memo} />
              ))}
            </ul>
          </section>
        )}
      </main>

      <BottomBar>
        <ButtonPrimary label="새 메모 쓰기" icon href="/write" />
      </BottomBar>
    </div>
  );
}
