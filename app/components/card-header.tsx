import Image from "next/image";

type CardHeaderProps = {
  id?: string;
  title: string;
  pin?: boolean;
  action?: boolean;
};

export function CardHeader({
  id,
  title,
  pin = false,
  action = false,
}: CardHeaderProps) {
  return (
    <div className="flex h-10 items-center gap-space-4 pt-space-12 pr-space-16 pb-space-4 pl-space-20">
      {pin && (
        <Image src="/icons/pin.svg" alt="" width={16} height={16} className="shrink-0" />
      )}
      <h2 id={id} className="min-w-0 flex-1 text-label-md text-text-primary">
        {title}
      </h2>
      {action && (
        <button
          type="button"
          className="flex shrink-0 items-center gap-space-4 text-caption-md text-text-muted"
        >
          전체 보기
          <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
        </button>
      )}
    </div>
  );
}
