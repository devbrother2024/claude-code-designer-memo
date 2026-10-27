import Image from "next/image";
import Link from "next/link";

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  href?: string;
  onClick?: () => void;
};

const CLASS_NAME =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md text-text-on-primary whitespace-nowrap";

/** 화면의 주 버튼. href가 있으면 이동 링크가 된다. */
export function ButtonPrimary({ label, icon = false, href, onClick }: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Image src="/icons/plus.svg" alt="" width={20} height={20} />}
      {label}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={CLASS_NAME}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={CLASS_NAME}>
      {content}
    </button>
  );
}
