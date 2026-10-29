"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../data/memos";
import type { Block, MemoCategory, MemoColor } from "../data/memos";
import type { Draft } from "../data/memo-store";
import { clearDraft, saveMemo, useSavedDraft, writeDraft } from "../data/memo-store";
import { BottomBar } from "./bottom-bar";
import { ButtonPrimary } from "./button-primary";
import { Chip } from "./chip";
import { IconButton } from "./icon-button";
import { InputField } from "./input-field";
import { LabelDot } from "./label-dot";
import { RichEditor } from "./rich-editor";

const COLOR_OPTIONS: { color: MemoColor; name: string }[] = [
  { color: "blue", name: "파랑" },
  { color: "green", name: "초록" },
  { color: "orange", name: "주황" },
  { color: "pink", name: "분홍" },
];

const AUTOSAVE_DELAY_MS = 500;

// 브라우저에서 초안을 읽고 나면 폼을 새로 마운트해, 이어 쓸 초안을 처음 값으로 넣는다
export function MemoWrite() {
  const draft = useSavedDraft();
  return (
    <MemoWriteForm
      key={draft === undefined ? "server" : "browser"}
      ready={draft !== undefined}
      initialDraft={draft ?? null}
    />
  );
}

function MemoWriteForm({ ready, initialDraft }: { ready: boolean; initialDraft: Draft | null }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialDraft?.title ?? "");
  const [category, setCategory] = useState<MemoCategory>(initialDraft?.category ?? CATEGORIES[0]);
  const [color, setColor] = useState<MemoColor>(initialDraft?.color ?? "blue");
  const [blocks, setBlocks] = useState<Block[]>(initialDraft?.blocks ?? []);
  const [autosaved, setAutosaved] = useState(initialDraft !== null);
  const [error, setError] = useState(false);
  const leaving = useRef(false);

  // 바뀌고 잠깐 멈추면 초안으로 자동 저장한다
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      if (leaving.current) return;
      if (title.trim() === "" && blocks.length === 0) {
        clearDraft();
        setAutosaved(false);
      } else {
        setAutosaved(writeDraft({ title, category, color, blocks }));
      }
    }, AUTOSAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [ready, title, category, color, blocks]);

  const canSave = title.trim() !== "" || blocks.length > 0;

  function save() {
    if (!canSave) return;
    const saved = saveMemo({ title, category, color, blocks });
    if (!saved) {
      setError(true);
      return;
    }
    leaving.current = true;
    clearDraft();
    router.push("/");
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <div className="flex flex-1 flex-col gap-space-16 px-space-16 pt-space-48">
        <nav aria-label="메모 도구" className="flex items-center justify-between">
          <IconButton icon="/icons/chevron-left.svg" label="뒤로가기" href="/" />
          <p aria-live="polite" className="text-caption-sm text-text-muted">
            {autosaved ? "자동 저장됨" : ""}
          </p>
        </nav>

        <main className="flex flex-col gap-space-12">
          <InputField
            label="제목"
            value={title}
            placeholder="제목을 입력하세요"
            onChange={setTitle}
          />

          <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
            <div role="group" aria-label="분류" className="flex items-center gap-space-8">
              <span className="text-caption-sm whitespace-nowrap text-text-muted">분류</span>
              {CATEGORIES.map((c) => (
                <Chip key={c} label={c} selected={category === c} onClick={() => setCategory(c)} />
              ))}
            </div>
            <div role="radiogroup" aria-label="색" className="flex items-center gap-space-8">
              <span className="text-caption-sm whitespace-nowrap text-text-muted">색</span>
              {COLOR_OPTIONS.map((option) => (
                <LabelDot
                  key={option.color}
                  color={option.color}
                  name={option.name}
                  selected={color === option.color}
                  onClick={() => setColor(option.color)}
                />
              ))}
            </div>
          </div>

          <RichEditor initialBlocks={initialDraft?.blocks ?? null} onChange={setBlocks} />
        </main>
      </div>

      <BottomBar>
        {error && (
          <p role="alert" className="pb-space-8 text-caption-sm text-label-pink">
            저장하지 못했어요. 브라우저 저장 공간을 확인해 주세요.
          </p>
        )}
        <ButtonPrimary label="저장하기" disabled={!canSave} onClick={save} />
      </BottomBar>
    </div>
  );
}
