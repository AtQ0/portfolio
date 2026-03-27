import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type {
  BentoBlock,
  IntroCard as IntroCardBlok,
  ServicesCard,
  TechStackCard,
  TestimonialsCard,
} from "@/types/storyblok";
import ClientLogos from "./ClientLogos";
import { getBgClass } from "@/lib/cmsTheme";
import IntroCard from "./IntroCard";

type BentoGridProps = {
  blok: BentoBlock;
  ctaTarget: string;
};

export default function BentoGrid({ blok, ctaTarget }: BentoGridProps) {
  const introCardBlok = blok.sections?.find(
    (s): s is IntroCardBlok => s.component === "IntroCard",
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

  const bgBlockBento = blok.background ?? "bg-primary";

  return (
    <section
      id={ctaTarget}
      className={cn(
        "gap-gutter-md flex flex-col py-25 lg:py-40",
        getBgClass(bgBlockBento, "bg-primary"),
      )}
    >
      <div
        className={cn(
          "p-gutter grid grid-cols-1 gap-4 py-0",
          "md:grid-cols-2",
          "lg:grid-cols-3",
        )}
      >
        <div className="md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1">
          <IntroCard blok={introCardBlok} />
        </div>

        <Card
          className={cn(
            "md:col-span-2 md:row-start-2",
            "lg:col-span-1 lg:col-start-2 lg:row-start-1",
          )}
        >
          TESTIMONIALS
        </Card>

        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-start-2 md:row-start-1 md:grid-cols-1",
            "lg:col-start-3 lg:row-start-1 lg:grid-cols-1",
          )}
        >
          <Card className="w-full">TECH STACK</Card>
          <Card className="w-full">SERVICES</Card>
        </div>
      </div>

      <ClientLogos />
    </section>
  );
}
