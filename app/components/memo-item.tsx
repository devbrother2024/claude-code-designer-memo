import Image from "next/image";
import Link from "next/link";
import type { Memo, MemoColor } from "../data/memos";

const TILE_BG: Record<MemoColor, string> = {
  blue: "bg-label-blue-soft",
  green: "bg-label-green-soft",
  orange: "bg-label-orange-soft",
  pink: "bg-label-pink-soft",
};

const NOTE_ICON: Record<MemoColor, string> = {
  blue: "/icons/note-blue.svg",
  green: "/icons/note-green.svg",
  orange: "/icons/note-orange.svg",
  pink: "/icons/note-pink.svg",
};

type MemoItemProps = Pick<Memo, "id" | "title" | "preview" | "date" | "color">;

export function MemoItem({ id, title, preview, date, color }: MemoItemProps) {
  return (
    <li>
      <Link
        href={`/memos/${id}`}
        className="flex items-center gap-space-16 px-space-20 py-space-12"
      >
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-sm ${TILE_BG[color]}`}
        >
          <Image src={NOTE_ICON[color]} alt="" width={22} height={22} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-space-4">
          <p className="text-title-md text-text-primary">{title}</p>
          <p className="truncate text-body-sm text-text-secondary">{preview}</p>
        </div>
        <p className="shrink-0 text-caption-sm text-text-muted">{date}</p>
      </Link>
    </li>
  );
}
