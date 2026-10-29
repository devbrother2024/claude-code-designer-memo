import Link from "next/link";
import { Icon } from "./svg-icon";

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const CLASS_NAME =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md text-text-on-primary whitespace-nowrap disabled:opacity-50";

/** 화면의 주 버튼. href가 있으면 이동 링크가 된다. */
export function ButtonPrimary({ label, icon = false, href, onClick, disabled }: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Icon src="/icons/plus.svg" className="size-5" />}
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
    <button type="button" onClick={onClick} disabled={disabled} className={CLASS_NAME}>
      {content}
    </button>
  );
}
