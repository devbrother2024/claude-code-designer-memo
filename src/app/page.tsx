import { ButtonPrimary } from "@/components/ButtonPrimary";
import { MemoItem } from "@/components/MemoItem";
import { MEMOS } from "@/data/memos";

const TODAY_LABEL = "10월 30일 금요일";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-space-16 px-space-16 pt-space-64 pb-space-34">
      <div className="flex flex-1 flex-col gap-space-24">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="text-caption-md text-text-secondary">{TODAY_LABEL}</p>
          <h1 className="text-heading-xl text-text-primary">
            오늘까지 메모를
            <br />
            <span className="text-primary">{MEMOS.length}개</span> 남겼어요
          </h1>
        </header>
        <ul className="flex flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card py-space-8">
          {MEMOS.map((memo) => (
            <li key={memo.id}>
              <MemoItem
                href={`/memos/${memo.id}`}
                title={memo.title}
                preview={memo.preview}
                date={memo.date}
              />
            </li>
          ))}
        </ul>
      </div>
      <ButtonPrimary icon href="/write" />
    </main>
  );
}
