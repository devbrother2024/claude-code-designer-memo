import Link from "next/link";
import { formatDate, type Memo } from "../lib/memos";

// Figma 컴포넌트 Card/Memo: 미리보기는 2줄까지 보이고 넘치면 말줄임
export function MemoCard({ memo }: { memo: Memo }) {
  return (
    <Link
      href={`/memo/${memo.id}`}
      className="flex flex-col gap-s6 rounded-md border border-border-default bg-surface-card p-s16"
    >
      <span className="text-title-md text-text-primary">{memo.title}</span>
      <span className="line-clamp-2 text-body-sm text-text-body">{memo.body}</span>
      <span className="text-caption-sm text-text-muted">{formatDate(memo.created_at)}</span>
    </Link>
  );
}
