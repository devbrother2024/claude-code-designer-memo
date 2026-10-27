"use client";

import { useEffect, useRef, useState } from "react";
import { htmlToBlocks } from "@/lib/memo-html";
import type { MemoBlock } from "@/lib/memos";

type Format = "bold" | "title" | "subtitle" | "list";

const FORMATS: { key: Format; label: string }[] = [
  { key: "bold", label: "B" },
  { key: "title", label: "제목" },
  { key: "subtitle", label: "소제목" },
  { key: "list", label: "목록" },
];

const NONE: Record<Format, boolean> = {
  bold: false,
  title: false,
  subtitle: false,
  list: false,
};

function currentBlock() {
  return document.queryCommandValue("formatBlock").toLowerCase().replace(/[<>]/g, "");
}

function FormatButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      // 버튼을 눌러도 본문의 선택 영역이 풀리지 않게 한다.
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

/** 서식 막대와 본문. 글자를 고르고 서식 버튼을 누르면 굵게, 제목, 소제목, 목록이 된다. */
export function MemoEditor({ onChange }: { onChange: (blocks: MemoBlock[]) => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(NONE);
  const [empty, setEmpty] = useState(true);

  // 커서가 있는 글자의 서식을 서식 막대에 표시한다.
  useEffect(() => {
    const sync = () => {
      const body = bodyRef.current;
      const anchor = document.getSelection()?.anchorNode;
      if (!body || !anchor || !body.contains(anchor)) return;
      const block = currentBlock();
      setActive({
        bold: document.queryCommandState("bold") && block !== "h2" && block !== "h3",
        title: block === "h2",
        subtitle: block === "h3",
        list: document.queryCommandState("insertUnorderedList"),
      });
    };
    document.addEventListener("selectionchange", sync);
    return () => document.removeEventListener("selectionchange", sync);
  }, []);

  const apply = (format: Format) => {
    bodyRef.current?.focus();
    switch (format) {
      case "bold":
        document.execCommand("bold");
        break;
      case "title":
        document.execCommand("formatBlock", false, currentBlock() === "h2" ? "<div>" : "<h2>");
        break;
      case "subtitle":
        document.execCommand("formatBlock", false, currentBlock() === "h3" ? "<div>" : "<h3>");
        break;
      case "list":
        document.execCommand("insertUnorderedList");
        break;
    }
  };

  const handleInput = () => {
    const body = bodyRef.current;
    if (!body) return;
    setEmpty((body.textContent ?? "").trim() === "" && !body.querySelector("li"));
    onChange(htmlToBlocks(body));
  };

  return (
    <section className="overflow-clip rounded-lg bg-surface-card outline-primary focus-within:outline-2 focus-within:-outline-offset-2">
      <div className="flex h-13 items-center gap-space-4 px-space-12">
        {FORMATS.map(({ key, label }) => (
          <FormatButton
            key={key}
            label={label}
            active={active[key]}
            onClick={() => apply(key)}
          />
        ))}
      </div>
      <hr className="h-px border-0 bg-border-default" />
      <div className="relative">
        {empty && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-space-20 top-space-16 text-body-md text-text-muted"
          >
            내용을 입력하세요
          </span>
        )}
        <div
          ref={bodyRef}
          contentEditable
          role="textbox"
          aria-multiline
          aria-label="본문"
          spellCheck={false}
          onInput={handleInput}
          onPaste={(event) => {
            // 서식이 섞여 들어오지 않게 글자만 붙인다.
            event.preventDefault();
            document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
          }}
          className="min-h-40 px-space-20 py-space-16 text-body-md text-text-secondary outline-none [&_:is(h2,h3,ul,div)+:is(h2,h3,ul,div)]:mt-space-8 [&_b]:font-bold [&_b]:text-text-primary [&_h2]:text-title-lg [&_h2]:text-text-primary [&_h3]:text-title-md [&_h3]:text-text-primary [&_li]:relative [&_li]:pl-space-16 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['•'] [&_li+li]:mt-space-4 [&_strong]:font-bold [&_strong]:text-text-primary"
        />
      </div>
    </section>
  );
}
