import { MemoCard } from "../components/MemoCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { SetupNotice } from "../components/SetupNotice";
import { getMemos } from "../lib/memos";
import { supabase } from "../lib/supabase";

// 매 요청마다 Supabase에서 새로 읽는다
export const dynamic = "force-dynamic";

// Figma 프레임 Mobile/Home
export default async function Home() {
  const memos = await getMemos();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-s16 px-s20 pt-s64 pb-s34">
      <header className="flex flex-col gap-s4">
        <h1 className="text-heading-xl text-text-primary">내 메모</h1>
        <p className="text-body-sm text-text-secondary">오늘 기록한 생각들</p>
      </header>
      <section className="flex flex-1 flex-col gap-s12">
        {!supabase && <SetupNotice />}
        {supabase && memos.length === 0 && <p className="text-body-sm text-text-muted">아직 메모가 없습니다.</p>}
        {memos.map((memo) => (
          <MemoCard key={memo.id} memo={memo} />
        ))}
      </section>
      <PrimaryButton label="새 메모" href="/new" />
    </main>
  );
}
