"use client";

import { useState } from "react";
import { ButtonPrimary } from "@/components/button-primary";
import { CardHeader } from "@/components/card-header";
import { Chip } from "@/components/chip";
import { MemoItem } from "@/components/memo-item";
import { Screen } from "@/components/screen";
import { CATEGORIES, type Memo, type MemoCategory } from "@/lib/memos";

type Filter = "전체" | MemoCategory;

const FILTERS: Filter[] = ["전체", ...CATEGORIES];

export function MemoHome({ memos, today }: { memos: Memo[]; today: string }) {
  const [filter, setFilter] = useState<Filter>("전체");

  const visible = memos.filter((m) => filter === "전체" || m.category === filter);
  const pinned = visible.filter((m) => m.pinned);
  const recent = visible.filter((m) => !m.pinned);

  return (
    <Screen top="64" footer={<ButtonPrimary label="새 메모 쓰기" icon href="/memos/new" />}>
      <header className="flex flex-col gap-space-8 px-space-8">
        <p className="text-caption-md text-text-muted">{today}</p>
        <h1 className="text-heading-xl text-text-primary">
          <span className="block">오늘까지 메모를</span>
          <span className="block">
            <span className="text-primary">{memos.length}개</span> 남겼어요
          </span>
        </h1>
      </header>

      <div className="flex gap-space-8 px-space-4">
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={filter === f}
            onClick={() => setFilter(f)}
          />
        ))}
      </div>

      {pinned.length > 0 && (
        <section className="rounded-xl bg-surface-card py-space-8">
          <CardHeader title="고정한 메모" pin />
          <ul>
            {pinned.map((memo) => (
              <li key={memo.id}>
                <MemoItem memo={memo} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {recent.length > 0 && (
        <section className="rounded-xl bg-surface-card py-space-8">
          <CardHeader title="최근 메모" action />
          <ul>
            {recent.map((memo) => (
              <li key={memo.id}>
                <MemoItem memo={memo} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Screen>
  );
}

/** 메모를 불러오는 동안 먼저 보이는 틀. */
export function MemoHomeSkeleton() {
  return (
    <Screen top="64" footer={<ButtonPrimary label="새 메모 쓰기" icon href="/memos/new" />}>
      <div className="h-24 px-space-8" />
      <div className="h-64 rounded-xl bg-surface-card" />
    </Screen>
  );
}
