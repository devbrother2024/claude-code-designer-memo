import type { ReactNode } from "react";

const TOP_PADDING = {
  "48": "pt-space-48",
  "64": "pt-space-64",
} as const;

type ScreenProps = {
  top: keyof typeof TOP_PADDING;
  footer: ReactNode;
  children: ReactNode;
};

/** 390px 폭 화면 틀. 아래 주 버튼은 스크롤해도 화면 아래에 붙어 있다. */
export function Screen({ top, footer, children }: ScreenProps) {
  return (
    // max-w-97.5 = 390px (Figma 프레임 너비)
    <div
      className={`mx-auto flex w-full max-w-97.5 flex-1 flex-col px-space-16 ${TOP_PADDING[top]}`}
    >
      <main className="flex flex-1 flex-col gap-space-16">{children}</main>
      <div className="sticky bottom-0 bg-surface-page pb-space-34 pt-space-16">
        {footer}
      </div>
    </div>
  );
}
