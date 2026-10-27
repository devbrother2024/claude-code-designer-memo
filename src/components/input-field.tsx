type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

/** 제목 입력 칸. 입력 중에는 파란 테두리를 보이고, 비어 있으면 회색 안내 문구를 보인다. */
export function InputField({ label, value, placeholder, onChange }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-space-4 rounded-lg bg-surface-card px-space-20 py-space-16 outline-primary focus-within:outline-2 focus-within:-outline-offset-2">
      <span className="text-caption-sm text-text-muted">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}
