import type { MemoBlock } from "@/lib/memos";

export function MemoBody({ blocks }: { blocks: MemoBlock[] }) {
  return (
    <div className="flex flex-col gap-space-12">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "title":
            return (
              <h2 key={index} className="text-title-lg text-text-primary">
                {block.text}
              </h2>
            );
          case "heading":
            return (
              <h3 key={index} className="text-title-md text-text-primary">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="text-body-md text-text-secondary">
                {block.spans.map((span, i) =>
                  span.bold ? (
                    <strong key={i} className="font-bold text-text-primary">
                      {span.text}
                    </strong>
                  ) : (
                    span.text
                  ),
                )}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-space-4">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-space-8 text-body-md text-text-secondary"
                  >
                    <span aria-hidden>•</span>
                    <span className="min-w-0 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
