import Link from "next/link";
import { Icon } from "./svg-icon";

type IconButtonProps = {
  icon: string;
  label: string;
  href?: string;
  className?: string;
};

/** 40×40 누르는 영역 가운데에 24px 아이콘을 둔다. 아이콘 색은 글자색(className)을 따른다. href가 있으면 이동 링크가 된다. */
export function IconButton({ icon, label, href, className = "text-text-primary" }: IconButtonProps) {
  const classes = `flex size-10 shrink-0 items-center justify-center rounded-sm ${className}`;
  const image = <Icon src={icon} />;
  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {image}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} className={classes}>
      {image}
    </button>
  );
}
