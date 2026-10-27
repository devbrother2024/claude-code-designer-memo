type InputFieldProps = {
  // title: 제목 한 줄, body: 여러 줄 내용 (최소 높이 156)
  type: "title" | "body";
  name: string;
  label: string;
  placeholder: string;
  autoFocus?: boolean;
};

// 입력 중(포커스)에는 파란 2px 테두리를 보이고, 비어 있으면 회색 안내 문구를 보인다.
// 테두리는 inset ring으로 그려서 포커스가 바뀌어도 칸의 크기가 변하지 않는다.
export function InputField({
  type,
  name,
  label,
  placeholder,
  autoFocus,
}: InputFieldProps) {
  const field = "w-full bg-transparent outline-none placeholder:text-text-muted";

  return (
    <label
      className={`flex flex-col gap-space-4 rounded-lg bg-surface-card px-space-20 py-space-16 focus-within:inset-ring-2 focus-within:inset-ring-primary ${
        type === "title" ? "h-20" : "min-h-39"
      }`}
    >
      <span className="text-caption-sm text-text-muted">{label}</span>
      {type === "title" ? (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`${field} text-title-md text-text-primary`}
        />
      ) : (
        <textarea
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`${field} field-sizing-content min-h-0 flex-1 resize-none text-body-md text-text-primary`}
        />
      )}
    </label>
  );
}
