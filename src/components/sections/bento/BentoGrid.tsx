import type {
  BentoBlock,
  IntroCard,
  ServicesCard,
  TechStackCard,
  TestimonialsCard,
} from "@/types/storyblok";

type BentoGridProps = {
  blok: BentoBlock;
  ctaTarget: string;
};

export default function BentoGrid({ blok, ctaTarget }: BentoGridProps) {
  // Type the sections array in blok
  const introCardBlok = blok.sections?.find(
    (s): s is IntroCard => s.component === "IntroCard",
  );

  const testimonialsCardBlok = blok.sections?.find(
    (s): s is TestimonialsCard => s.component === "TestimonialsCard",
  );

  const techStackCardBlok = blok.sections?.find(
    (s): s is TechStackCard => s.component === "TechStackCard",
  );

  const servicesCardBlok = blok.sections?.find(
    (s): s is ServicesCard => s.component === "ServicesCard",
  );

  console.log("blok", blok);

  return (
    <section id={ctaTarget} className="h-screen bg-green-800">
      <h1>Bento Grid</h1>
    </section>
  );
}
