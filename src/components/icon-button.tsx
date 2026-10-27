import Image from "next/image";
import Link from "next/link";

type IconButtonProps = {
  icon: string;
  label: string;
  href?: string;
};

const CLASS_NAME = "flex size-10 shrink-0 items-center justify-center rounded-sm";

/** 40×40 누르는 영역 가운데에 24px 아이콘을 둔다. href가 있으면 이동 링크가 된다. */
export function IconButton({ icon, label, href }: IconButtonProps) {
  const image = <Image src={icon} alt="" width={24} height={24} />;
  if (href) {
    return (
      <Link href={href} aria-label={label} className={CLASS_NAME}>
        {image}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} className={CLASS_NAME}>
      {image}
    </button>
  );
}
