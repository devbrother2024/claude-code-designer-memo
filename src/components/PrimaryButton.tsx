import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  type?: "button" | "submit";
};

// Figma 컴포넌트 Button/Primary
export function PrimaryButton({ label, href, type = "button" }: Props) {
  const className =
    "flex w-full items-center justify-center rounded-md bg-primary px-s24 py-s12 text-button-md text-text-on-primary";
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <button type={type} className={className}>
      {label}
    </button>
  );
}
