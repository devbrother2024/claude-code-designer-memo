import Image from "next/image";
import Link from "next/link";

type MemoItemProps = {
  href: string;
  title: string;
  preview: string;
  date: string;
};

export function MemoItem({ href, title, preview, date }: MemoItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-space-16 px-space-20 py-space-12"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-label-blue-soft">
        <Image src="/icons/note.svg" alt="" width={22} height={22} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-space-4">
        <p className="text-title-md text-text-primary">{title}</p>
        <p className="truncate text-body-sm text-text-secondary">{preview}</p>
      </div>
      <p className="shrink-0 whitespace-nowrap text-caption-sm text-text-muted">
        {date}
      </p>
    </Link>
  );
}
