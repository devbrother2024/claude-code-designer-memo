import type { MemoColor } from "../data/memos";

const BADGE_COLOR: Record<MemoColor, string> = {
  blue: "bg-label-blue-soft text-label-blue",
  green: "bg-label-green-soft text-label-green",
  orange: "bg-label-orange-soft text-label-orange",
  pink: "bg-label-pink-soft text-label-pink",
};

type BadgeProps = {
  label: string;
  color: MemoColor;
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className={`flex h-6.5 items-center rounded-full px-space-8 text-caption-sm whitespace-nowrap ${BADGE_COLOR[color]}`}
    >
      {label}
    </span>
  );
}
