import { Badge } from "@/components/badge";
import { ButtonPrimary } from "@/components/button-primary";
import { IconButton } from "@/components/icon-button";
import { MemoBody } from "@/components/memo-body";
import { Screen } from "@/components/screen";
import { countChars, type Memo } from "@/lib/memos";

export function MemoDetail({ memo }: { memo: Memo }) {
  return (
    <Screen top="48" footer={<ButtonPrimary label="수정하기" />}>
      <nav className="flex items-center justify-between">
        <IconButton icon="/icons/chevron-left.svg" label="뒤로가기" href="/" />
        <div className="flex">
          {memo.pinned && <IconButton icon="/icons/pin-24.svg" label="고정됨" className="text-primary" />}
          <IconButton icon="/icons/share.svg" label="공유" />
          <IconButton icon="/icons/more.svg" label="더보기" />
        </div>
      </nav>

      <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
        <div className="flex items-center gap-space-8">
          <Badge label={memo.category} color={memo.label} />
          <p className="text-caption-sm text-text-muted">{memo.createdAt}</p>
        </div>
        <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
        <hr className="h-px border-0 bg-border-default" />
        <MemoBody blocks={memo.body} />
        <p className="text-caption-sm text-text-muted">
          {countChars(memo)}자 · {memo.updatedAt} 수정
        </p>
      </article>
    </Screen>
  );
}

/** URL과 무관한 틀. 메모 내용이 준비되기 전에 먼저 보인다. */
export function MemoDetailSkeleton() {
  return (
    <Screen top="48" footer={<ButtonPrimary label="수정하기" />}>
      <nav className="flex items-center justify-between">
        <IconButton icon="/icons/chevron-left.svg" label="뒤로가기" href="/" />
      </nav>
      <div className="h-64 rounded-xl bg-surface-card" />
    </Screen>
  );
}
