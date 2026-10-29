import { countChars, runsOf } from "../data/memos";
import type { Block, Memo, Run } from "../data/memos";
import { Badge } from "./badge";
import { BottomBar } from "./bottom-bar";
import { ButtonPrimary } from "./button-primary";
import { IconButton } from "./icon-button";

function Runs({ runs }: { runs: Run[] }) {
  return runs.map((run, i) =>
    typeof run === "string" ? run : <strong key={i}>{run.bold}</strong>,
  );
}

function BodyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "title":
      return <h2>{block.text}</h2>;
    case "heading":
      return <h3>{block.text}</h3>;
    case "paragraph":
      return (
        <p>
          <Runs runs={block.runs} />
        </p>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Runs runs={runsOf(item)} />
            </li>
          ))}
        </ul>
      );
  }
}

export function MemoDetail({ memo }: { memo: Memo }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex flex-1 flex-col gap-space-16 px-space-16 pt-space-48">
        <nav aria-label="메모 도구" className="flex items-center justify-between">
          <IconButton icon="/icons/chevron-left.svg" label="뒤로가기" href="/" />
          <div className="flex">
            <IconButton
              icon="/icons/pin-lg.svg"
              label="고정"
              pressed={memo.pinned}
              className={memo.pinned ? "text-primary" : "text-text-primary"}
            />
            <IconButton icon="/icons/share.svg" label="공유" />
            <IconButton icon="/icons/more.svg" label="더보기" />
          </div>
        </nav>

        <main>
          <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
            <div className="flex items-center gap-space-8">
              <Badge label={memo.category} color={memo.color} />
              <p className="text-caption-sm text-text-muted">{memo.createdAt}</p>
            </div>
            <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
            <hr className="h-px border-0 bg-border-default" />
            <div className="memo-richtext flex flex-col gap-space-12">
              {memo.blocks.map((block, i) => (
                <BodyBlock key={i} block={block} />
              ))}
            </div>
            <p className="text-caption-sm text-text-muted">
              {countChars(memo)}자 · {memo.updatedAt} 수정
            </p>
          </article>
        </main>
      </div>

      <BottomBar>
        <ButtonPrimary label="수정하기" />
      </BottomBar>
    </div>
  );
}

// 메모를 불러오는 동안 보이는 틀. 뒤로가기는 바로 쓸 수 있다.
export function MemoDetailFallback() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex flex-1 flex-col gap-space-16 px-space-16 pt-space-48">
        <nav aria-label="메모 도구" className="flex items-center">
          <IconButton icon="/icons/chevron-left.svg" label="뒤로가기" href="/" />
        </nav>
        <div aria-hidden className="h-64 rounded-xl bg-surface-card" />
      </div>
    </div>
  );
}
