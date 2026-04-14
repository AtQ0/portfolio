import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  charClassName?: string;
  wordClassName?: string;
};

export default function SplitText({
  text,
  charClassName = "split-char",
  wordClassName = "inline-block",
}: SplitTextProps) {
  // Normalize whitespace so animation wrappers don't break on extra spaces/newlines.
  const normalized = text.trim();
  if (!normalized) return null;

  const words = normalized.split(/\s+/);

  return (
    <>
      {words.map((word, wi) => (
        <span
          key={`word-${wi}`}
          aria-hidden="true"
          className={cn(wordClassName)}
        >
          {word.split("").map((char, ci) => (
            <span
              key={`char-${wi}-${ci}`}
              aria-hidden="true"
              className={cn("inline-block", charClassName)}
            >
              {char}
            </span>
          ))}
          {/* Keep visual spacing intact between animated words. */}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}
