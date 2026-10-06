import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { formatDate, getMemo } from "../../../lib/memos";

export const dynamic = "force-dynamic";

// Figma 프레임 Mobile/Detail
export default async function MemoDetail(props: PageProps<"/memo/[id]">) {
  const { id } = await props.params;
  const memo = await getMemo(id);
  if (!memo) notFound();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-s16 px-s20 pt-s64 pb-s34">
      <nav>
        <Link href="/" className="text-body-md text-text-primary">
          ‹ 목록
        </Link>
      </nav>
      <header className="flex flex-col gap-s4">
        <h1 className="text-heading-xl text-text-primary">{memo.title}</h1>
        <p className="text-caption-sm text-text-muted">{formatDate(memo.created_at, true)}</p>
      </header>
      <hr className="border-border-default" />
      <article className="flex-1 whitespace-pre-line text-body-md text-text-body">{memo.body}</article>
      <PrimaryButton label="수정하기" />
    </main>
  );
}
