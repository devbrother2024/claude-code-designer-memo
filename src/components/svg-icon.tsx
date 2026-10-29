type IconProps = {
  src: string;
  className?: string;
};

// 선 아이콘은 글자색 변수로 색을 바꾼다(Figma 아이콘 설명). 에셋 모양은 그대로 두고 currentColor로 칠한다.
export function Icon({ src, className = "size-6" }: IconProps) {
  return (
    <span
      aria-hidden
      className={`block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
