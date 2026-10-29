import Link from "next/link";
import { Icon } from "./svg-icon";

type IconButtonProps = {
  icon: string;
  label: string;
  href?: string;
  pressed?: boolean;
  className?: string;
};

// 40x40 누르는 영역 가운데에 24px 아이콘을 둔다
export function IconButton({
  icon,
  label,
  href,
  pressed,
  className = "text-text-primary",
}: IconButtonProps) {
  const classes = `flex size-10 items-center justify-center rounded-sm ${className}`;
  const content = <Icon src={icon} />;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} aria-pressed={pressed} className={classes}>
      {content}
    </button>
  );
}
