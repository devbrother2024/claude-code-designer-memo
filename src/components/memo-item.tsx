import Link from "next/link";
import { Icon } from "./svg-icon";
import type { Memo, MemoLabel } from "@/lib/memos";

const LABEL_STYLE: Record<MemoLabel, { tile: string; icon: string }> = {
  blue: { tile: "bg-label-blue-soft text-label-blue", icon: "/icons/note-blue.svg" },
  green: { tile: "bg-label-green-soft text-label-green", icon: "/icons/note-green.svg" },
  orange: { tile: "bg-label-orange-soft text-label-orange", icon: "/icons/note-orange.svg" },
  pink: { tile: "bg-label-pink-soft text-label-pink", icon: "/icons/note-pink.svg" },
};

export function MemoItem({ memo }: { memo: Memo }) {
  const { tile, icon } = LABEL_STYLE[memo.label];
  return (
    <Link
      href={`/memos/${memo.id}`}
      className="flex h-18 w-full items-center gap-space-16 px-space-20 py-space-12 text-left"
    >
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-sm ${tile}`}
      >
        <Icon src={icon} className="size-5.5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-space-4">
        <span className="text-title-md text-text-primary">{memo.title}</span>
        <span className="truncate text-body-sm text-text-secondary">{memo.preview}</span>
      </span>
      <span className="shrink-0 text-caption-sm text-text-muted whitespace-nowrap">
        {memo.date}
      </span>
    </Link>
  );
}
