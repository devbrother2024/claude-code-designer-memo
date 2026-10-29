import type { ReactNode } from "react";

// 화면 아래에 붙는 주 버튼 영역. 스크롤돼도 아래에 남는다.
export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <footer className="sticky bottom-0 bg-surface-page px-space-16 pt-space-16 pb-space-34">
      {children}
    </footer>
  );
}
