import Link from "next/link";
import { ButtonPrimary } from "@/components/ButtonPrimary";
import { Icon } from "@/components/Icon";
import { InputField } from "@/components/InputField";

export default function Write() {
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
      </nav>
      <div className="flex flex-1 flex-col gap-space-24">
        <header className="px-space-8">
          <h1 className="text-heading-lg text-text-primary">
            어떤 메모를
            <br />
            남길까요?
          </h1>
        </header>
        <form className="flex flex-col gap-space-12">
          <InputField
            type="title"
            name="title"
            label="제목"
            placeholder="주말 등산"
            autoFocus
          />
          <InputField
            type="body"
            name="body"
            label="내용"
            placeholder="토요일 오전 7시 출발, 물 두 병과 간식 챙기기"
          />
        </form>
      </div>
      {/* 저장은 아직 연결하지 않았다 */}
      <ButtonPrimary label="저장하기" />
    </main>
  );
}
