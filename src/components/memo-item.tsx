import Image from "next/image";
import Link from "next/link";
import type { Memo, MemoLabel } from "@/lib/memos";

const LABEL_STYLE: Record<MemoLabel, { tile: string; icon: string }> = {
  blue: { tile: "bg-label-blue-soft", icon: "/icons/note-blue.svg" },
  green: { tile: "bg-label-green-soft", icon: "/icons/note-green.svg" },
  orange: { tile: "bg-label-orange-soft", icon: "/icons/note-orange.svg" },
  pink: { tile: "bg-label-pink-soft", icon: "/icons/note-pink.svg" },
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
        <Image src={icon} alt="" width={22} height={22} />
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
