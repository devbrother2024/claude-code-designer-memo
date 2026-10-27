import { Suspense } from "react";
import { MemoHome, MemoHomeSkeleton } from "@/components/memo-home";
import { getMemos, getToday } from "@/lib/memo-queries";

export default function Home() {
  return (
    <Suspense fallback={<MemoHomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const [memos, today] = await Promise.all([getMemos(), getToday()]);
  return <MemoHome memos={memos} today={today} />;
}
