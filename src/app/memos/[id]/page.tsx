import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonPrimary } from "@/components/ButtonPrimary";
import { Icon } from "@/components/Icon";
import { getMemo, MEMOS } from "@/data/memos";

export function generateStaticParams() {
  return MEMOS.map((memo) => ({ id: memo.id }));
}

export default async function MemoDetail({ params }: PageProps<"/memos/[id]">) {
  const { id } = await params;
  const memo = getMemo(id);
  if (!memo) notFound();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-space-16 px-space-16 pt-space-48 pb-space-34">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="뒤로"
          className="flex size-10 items-center justify-center"
        >
          <Icon name="chevron-left" />
        </Link>
        <button
          type="button"
          aria-label="더보기"
          className="flex size-10 items-center justify-center"
        >
          <Icon name="more" />
        </button>
      </nav>
      <div className="flex flex-1 flex-col">
        <article className="flex flex-col gap-space-8 rounded-lg border border-border-default bg-surface-card px-space-20 py-space-24">
          <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
          <p className="text-body-sm text-text-secondary">{memo.createdAt}</p>
          <hr className="h-px border-0 bg-border-default" />
          <div className="flex flex-col gap-space-12 pt-space-8 text-body-md text-text-primary">
            {memo.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
      <ButtonPrimary label="수정하기" />
    </main>
  );
}
