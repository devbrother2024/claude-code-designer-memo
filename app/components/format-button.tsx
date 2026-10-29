type FormatButtonProps = {
  label: string;
  ariaLabel: string;
  active?: boolean;
  onClick: () => void;
};

// 서식 막대의 버튼. 눌러도 편집기의 선택이 풀리지 않게 마우스 누름을 막는다.
export function FormatButton({ label, ariaLabel, active = false, onClick }: FormatButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-9 items-center justify-center rounded-sm px-space-12 text-label-md whitespace-nowrap ${
        active ? "bg-label-blue-soft text-primary" : "text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
