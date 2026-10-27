import type { MemoLabel } from "@/lib/memos";

const DOT_COLOR: Record<MemoLabel, string> = {
  blue: "bg-label-blue",
  green: "bg-label-green",
  orange: "bg-label-orange",
  pink: "bg-label-pink",
};

type LabelDotProps = {
  color: MemoLabel;
  name: string;
  selected: boolean;
  onClick: () => void;
};

/** 색 라벨 고르기. 고른 색은 바깥에 파란 테두리가 생긴다. */
export function LabelDot({ color, name, selected, onClick }: LabelDotProps) {
  return (
    <button
      type="button"
      aria-label={name}
      aria-pressed={selected}
      onClick={onClick}
      className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
        selected ? "border-primary" : "border-transparent"
      }`}
    >
      <span className={`size-5.5 rounded-full ${DOT_COLOR[color]}`} />
    </button>
  );
}
