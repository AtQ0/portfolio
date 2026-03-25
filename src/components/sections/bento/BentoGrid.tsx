import { BentoBlock } from "@/types/storyblok";
type BentoGridProps = {
  blok: BentoBlock;
};

export default function BentoGrid({ blok }: BentoGridProps) {
  return (
    <section id="bento" className="h-screen bg-green-800">
      <h1>Bento Grid</h1>
    </section>
  );
}
