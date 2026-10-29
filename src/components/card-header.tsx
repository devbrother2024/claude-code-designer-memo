import { Icon } from "./svg-icon";

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  action?: boolean;
};

export function CardHeader({ title, pin = false, action = false }: CardHeaderProps) {
  return (
    <div className="flex h-10 items-center gap-space-4 pb-space-4 pl-space-20 pr-space-16 pt-space-12">
      {pin && <Icon src="/icons/pin.svg" className="size-4 text-primary" />}
      <h2 className="min-w-0 flex-1 text-label-md text-text-primary">{title}</h2>
      {action && (
        <button
          type="button"
          className="flex shrink-0 items-center gap-space-4 text-caption-md text-text-muted whitespace-nowrap"
        >
          전체 보기
          <Icon src="/icons/chevron-right.svg" className="size-4" />
        </button>
      )}
    </div>
  );
}
