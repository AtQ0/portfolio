import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type {
  BentoBlock,
  IntroCard,
  ServicesCard,
  TechStackCard,
  TestimonialsCard,
} from "@/types/storyblok";
import ClientLogos from "./ClientLogos";
import { getBgClass } from "@/lib/cmsTheme";

type BentoGridProps = {
  blok: BentoBlock;
  ctaTarget: string;
};

export default function BentoGrid({ blok, ctaTarget }: BentoGridProps) {
  const background = blok.background ?? "bg-primary";
  const bentoBgClass: Record<"bg-primary" | "bg-tertiary", string> = {
    "bg-primary": "bg-bg-primary",
    "bg-tertiary": "bg-bg-tertiary",
  };

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
  console.log("background", background); // bg-tertiary

  return (
    <section
      id={ctaTarget}
      className={cn(
        "gap-gutter-md flex flex-col py-25 lg:py-40",
        getBgClass(background, "bg-primary"),
      )}
    >
      <div className="p-gutter bg-bg-primary grid grid-cols-1 gap-4 py-0 lg:grid-cols-3">
        <Card className="h-[70vh]">INTRO</Card>
        <Card>TESTIMONIALS</Card>
        <div className="grid grid-rows-2 gap-4">
          <Card className="w-full">TECH STACK</Card>
          <Card className="w-full">SERVICES</Card>
        </div>
      </div>
      <ClientLogos />
    </section>
  );
}
