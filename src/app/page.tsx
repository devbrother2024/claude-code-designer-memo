import { MemoCard } from "../components/MemoCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { sampleMemos } from "../lib/memos";

// Figma 프레임 Mobile/Home
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-s16 px-s20 pt-s64 pb-s34">
      <header className="flex flex-col gap-s4">
        <h1 className="text-heading-xl text-text-primary">내 메모</h1>
        <p className="text-body-sm text-text-secondary">오늘 기록한 생각들</p>
      </header>
      <section className="flex flex-1 flex-col gap-s12">
        {sampleMemos.map((memo) => (
          <MemoCard key={memo.id} memo={memo} />
        ))}
      </section>
      <PrimaryButton label="새 메모" />
    </main>
  );
}
