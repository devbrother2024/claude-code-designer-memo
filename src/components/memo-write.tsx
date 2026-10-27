"use client";

import { useState, useTransition } from "react";
import { createMemo } from "@/app/memos/actions";
import { ButtonPrimary } from "@/components/button-primary";
import { Chip } from "@/components/chip";
import { IconButton } from "@/components/icon-button";
import { InputField } from "@/components/input-field";
import { LabelDot } from "@/components/label-dot";
import { MemoEditor } from "@/components/memo-editor";
import { Screen } from "@/components/screen";
import { CATEGORIES, type MemoBlock, type MemoCategory, type MemoLabel } from "@/lib/memos";

const COLORS: { value: MemoLabel; name: string }[] = [
  { value: "blue", name: "파랑" },
  { value: "green", name: "초록" },
  { value: "orange", name: "주황" },
  { value: "pink", name: "분홍" },
];

export function MemoWrite() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MemoCategory>(CATEGORIES[0]);
  const [color, setColor] = useState<MemoLabel>(COLORS[0].value);
  const [body, setBody] = useState<MemoBlock[]>([]);
  const [error, setError] = useState("");
  const [saving, startSaving] = useTransition();

  const save = () => {
    setError("");
    startSaving(async () => {
      // 성공하면 서버가 홈으로 이동시키므로, 돌아오는 값은 실패 문구뿐이다.
      const result = await createMemo({ title, category, label: color, body });
      setError(result.error);
    });
  };

  return (
    <Screen
      top="48"
      footer={
        <div className="flex flex-col gap-space-12">
          {error && (
            <p role="alert" className="px-space-8 text-caption-sm text-label-orange">
              {error}
            </p>
          )}
          <ButtonPrimary label={saving ? "저장하는 중" : "저장하기"} onClick={save} disabled={saving} />
        </div>
      }
    >
      <nav className="flex items-center justify-between">
        <IconButton icon="/icons/chevron-left.svg" label="뒤로가기" href="/" />
        <p className="text-caption-sm text-text-muted">자동 저장됨</p>
      </nav>

      <div className="flex flex-col gap-space-12">
        <InputField
          label="제목"
          value={title}
          placeholder="제목을 입력하세요"
          onChange={setTitle}
        />

        <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
          <div className="flex items-center gap-space-8">
            <span className="text-caption-sm text-text-muted">분류</span>
            {CATEGORIES.map((item) => (
              <Chip
                key={item}
                label={item}
                selected={category === item}
                onClick={() => setCategory(item)}
              />
            ))}
          </div>
          <div className="flex items-center gap-space-8">
            <span className="text-caption-sm text-text-muted">색</span>
            {COLORS.map(({ value, name }) => (
              <LabelDot
                key={value}
                color={value}
                name={name}
                selected={color === value}
                onClick={() => setColor(value)}
              />
            ))}
          </div>
        </div>

        <MemoEditor onChange={setBody} />
      </div>
    </Screen>
  );
}
