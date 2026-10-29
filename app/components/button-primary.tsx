import Image from "next/image";
import Link from "next/link";

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
};

const CLASSES =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md text-text-on-primary disabled:bg-border-default disabled:text-text-muted";

// 화면의 주 버튼. href가 있으면 다른 화면으로 가는 링크가 된다.
export function ButtonPrimary({ label, icon = false, disabled, href, onClick }: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Image src="/icons/plus.svg" alt="" width={20} height={20} />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={CLASSES}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={CLASSES}>
      {content}
    </button>
  );
}
