import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MemoDetail, MemoDetailSkeleton } from "@/components/memo-detail";
import { getMemo } from "@/lib/memo-queries";

export default function MemoPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={<MemoDetailSkeleton />}>
      <MemoContent params={params} />
    </Suspense>
  );
}

async function MemoContent({ params }: Pick<PageProps<"/memos/[id]">, "params">) {
  const { id } = await params;
  const memo = await getMemo(id);
  if (!memo) notFound();
  return <MemoDetail memo={memo} />;
}
