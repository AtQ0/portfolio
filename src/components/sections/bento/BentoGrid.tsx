import { Card, CardContent } from "@/components/ui/card";
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
    <section
      id={ctaTarget}
      className="p-gutter grid grid-cols-1 gap-4 bg-green-800 py-25 lg:grid-cols-3 lg:py-40"
    >
      <Card className="h-[75vh]">INTRO</Card>
      <Card>TESTIMONIALS</Card>
      <div className="grid grid-rows-2 gap-4">
        <Card className="w-full">TECH STACK</Card>
        <Card className="w-full">SERVICES</Card>
      </div>
    </section>
  );
}
