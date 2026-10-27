import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MemoDetail, MemoDetailSkeleton } from "@/components/memo-detail";
import { getMemo, MEMOS } from "@/lib/memos";

export function generateStaticParams() {
  return MEMOS.map(({ id }) => ({ id }));
}

export default function MemoPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={<MemoDetailSkeleton />}>
      <MemoContent params={params} />
    </Suspense>
  );
}

async function MemoContent({ params }: Pick<PageProps<"/memos/[id]">, "params">) {
  const { id } = await params;
  const memo = getMemo(id);
  if (!memo) notFound();
  return <MemoDetail memo={memo} />;
}
