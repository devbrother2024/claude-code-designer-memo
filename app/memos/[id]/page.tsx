import { Suspense } from "react";
import { MemoDetailFallback } from "../../components/memo-detail";
import { MemoDetailLoader } from "../../components/memo-detail-loader";
import { MEMOS } from "../../data/memos";

export function generateStaticParams() {
  return MEMOS.map((memo) => ({ id: memo.id }));
}

async function Memo({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  return <MemoDetailLoader id={id} />;
}

export default function MemoPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={<MemoDetailFallback />}>
      <Memo params={params} />
    </Suspense>
  );
}
