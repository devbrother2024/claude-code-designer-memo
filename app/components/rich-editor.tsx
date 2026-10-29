"use client";

import { useEffect, useRef, useState } from "react";
import type { Block } from "../data/memos";
import { blocksToHtml, domToBlocks } from "../data/rich-text";
import { FormatButton } from "./format-button";

type ActiveFormat = { bold: boolean; title: boolean; heading: boolean; list: boolean };
const NONE: ActiveFormat = { bold: false, title: false, heading: false, list: false };

type RichEditorProps = {
  // 처음 한 번 편집기에 채울 내용(저장된 초안). null이면 빈 편집기.
  initialBlocks: Block[] | null;
  onChange: (blocks: Block[]) => void;
};

function exec(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function RichEditor({ initialBlocks, onChange }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActiveFormat>(NONE);
  const [empty, setEmpty] = useState(true);

  // 커서가 있는 줄의 서식을 서식 막대에 보여 준다
  useEffect(() => {
    function refresh() {
      const editor = editorRef.current;
      const anchor = window.getSelection()?.anchorNode;
      if (!editor || !anchor || !editor.contains(anchor)) return;
      const element = anchor instanceof Element ? anchor : anchor.parentElement;
      const block = element?.closest("h2, h3, li");
      const inside = block && editor.contains(block) ? block.tagName : "";
      const heading = inside === "H2" || inside === "H3";
      setActive({
        bold: !heading && document.queryCommandState("bold"),
        title: inside === "H2",
        heading: inside === "H3",
        list: inside === "LI",
      });
    }
    document.addEventListener("selectionchange", refresh);
    return () => document.removeEventListener("selectionchange", refresh);
  }, []);

  // Enter가 새 문단을 div로 만들게 한다(p로 두면 브라우저가 목록을 p 안에 중첩한다)
  useEffect(() => {
    exec("defaultParagraphSeparator", "div");
  }, []);

  // 내용을 읽어 저장할 블록으로 올린다. 편집 중 브라우저가 붙인 style은 지운다.
  function sync() {
    const editor = editorRef.current;
    if (!editor) return;
    editor.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));
    const blocks = domToBlocks(editor);
    setEmpty(blocks.length === 0);
    onChange(blocks);
  }

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.innerHTML = blocksToHtml(initialBlocks ?? []);
    setEmpty(!initialBlocks || initialBlocks.length === 0);
    // 초안은 채울 때만 다시 그린다. 이후 내용은 편집기가 가진다.
  }, [initialBlocks]);

  function currentBlock(): string {
    const anchor = window.getSelection()?.anchorNode;
    const element = anchor instanceof Element ? anchor : anchor?.parentElement;
    return element?.closest("h2, h3, li")?.tagName ?? "";
  }

  function run(action: () => void) {
    editorRef.current?.focus();
    action();
    sync();
  }

  function toggleBlock(tag: "H2" | "H3") {
    run(() => {
      const current = currentBlock();
      if (current === "LI") exec("insertUnorderedList");
      exec("formatBlock", current === tag ? "<div>" : `<${tag.toLowerCase()}>`);
    });
  }

  function toggleList() {
    run(() => {
      const current = currentBlock();
      if (current === "H2" || current === "H3") exec("formatBlock", "<div>");
      exec("insertUnorderedList");
    });
  }

  function toggleBold() {
    const current = currentBlock();
    if (current === "H2" || current === "H3") return; // 제목은 이미 굵다
    run(() => exec("bold"));
  }

  return (
    <div className="overflow-clip rounded-lg border-2 border-transparent bg-surface-card focus-within:border-primary">
      <div role="toolbar" aria-label="서식" className="flex h-13 items-center gap-space-4 px-space-12">
        <FormatButton label="B" ariaLabel="굵게" active={active.bold} onClick={toggleBold} />
        <FormatButton label="제목" ariaLabel="제목" active={active.title} onClick={() => toggleBlock("H2")} />
        <FormatButton label="소제목" ariaLabel="소제목" active={active.heading} onClick={() => toggleBlock("H3")} />
        <FormatButton label="목록" ariaLabel="목록" active={active.list} onClick={toggleList} />
      </div>
      <hr className="h-px border-0 bg-border-default" />
      <div className="relative">
        {empty && (
          <p
            aria-hidden
            className="pointer-events-none absolute top-space-16 left-space-20 text-body-md text-text-muted"
          >
            내용을 입력하세요
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          role="textbox"
          aria-multiline="true"
          aria-label="본문"
          onInput={sync}
          onPaste={(event) => {
            // 붙여넣은 서식이 섞이지 않게 글자만 넣는다
            event.preventDefault();
            exec("insertText", event.clipboardData.getData("text/plain"));
          }}
          onKeyDown={(event) => {
            // Shift+Enter도 줄바꿈 대신 새 문단으로 만든다
            if (event.key === "Enter" && event.shiftKey) {
              event.preventDefault();
              exec("insertParagraph");
            }
          }}
          className="memo-richtext memo-editor min-h-40 px-space-20 py-space-16 caret-primary outline-none"
        />
      </div>
    </div>
  );
}
