import { getBgClass } from "@/lib/cmsTheme";
import { cn } from "@/lib/utils";
import type { FaqBlock } from "@/types/storyblok";

export default function Faq({ blok }: { blok: FaqBlock }) {
  const background = blok.background ?? "bg-secondary";

  return (
    <section className={cn("h-screen", getBgClass(background, "bg-secondary"))}>
      <h2></h2>
    </section>
  );
}
