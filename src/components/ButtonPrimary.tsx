import Image from "next/image";
import Link from "next/link";

type ButtonPrimaryProps = {
  label?: string;
  icon?: boolean;
  // 주면 버튼 대신 링크로 그린다
  href?: string;
  onClick?: () => void;
};

const STYLE =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md text-text-on-primary";

export function ButtonPrimary({
  label = "새 메모 쓰기",
  icon = false,
  href,
  onClick,
}: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && (
        <Image src="/icons/plus.svg" alt="" width={20} height={20} className="shrink-0" />
      )}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={STYLE}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={STYLE}>
      {content}
    </button>
  );
}
