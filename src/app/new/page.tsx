import Link from "next/link";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SetupNotice } from "../../components/SetupNotice";
import { supabase } from "../../lib/supabase";
import { createMemo } from "./actions";

// 키를 나중에 넣어도 바로 반영되도록 요청마다 렌더링한다
export const dynamic = "force-dynamic";

// Figma에 없는 화면: 기존 컴포넌트와 디자인 토큰으로 홈·상세와 같은 톤을 맞춘다
export default function NewMemo() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-s16 px-s20 pt-s64 pb-s34">
      <nav>
        <Link href="/" className="text-body-md text-text-primary">
          ‹ 목록
        </Link>
      </nav>
      <h1 className="text-heading-xl text-text-primary">새 메모</h1>
      {!supabase ? (
        <SetupNotice />
      ) : (
        <form action={createMemo} className="flex flex-1 flex-col gap-s12">
          <input
            name="title"
            required
            placeholder="제목"
            className="rounded-md border border-border-default bg-surface-card p-s16 text-title-md text-text-primary placeholder:text-text-muted"
          />
          <textarea
            name="body"
            rows={10}
            placeholder="내용을 적어 보세요"
            className="flex-1 rounded-md border border-border-default bg-surface-card p-s16 text-body-md text-text-body placeholder:text-text-muted"
          />
          <PrimaryButton label="저장하기" type="submit" />
        </form>
      )}
    </main>
  );
}
