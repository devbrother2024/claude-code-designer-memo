type IconProps = {
  name: "chevron-left" | "more";
  // 색은 글자색 토큰으로 칠한다. 예) className="bg-text-primary"
  className?: string;
};

// /icons/*.svg의 모양만 마스크로 쓰고 색은 토큰으로 칠해 다크 모드에서도 보이게 한다
const MASKS = {
  "chevron-left": "mask-[url(/icons/chevron-left.svg)]",
  more: "mask-[url(/icons/more.svg)]",
} as const;

export function Icon({ name, className = "bg-text-primary" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`block size-space-24 shrink-0 mask-contain mask-center mask-no-repeat ${MASKS[name]} ${className}`}
    />
  );
}
