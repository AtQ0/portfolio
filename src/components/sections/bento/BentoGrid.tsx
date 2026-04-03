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
import TestimonialCard from "./TestimonialCard";

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
        "gap-gutter-md p-gutter flex flex-col",
        getBgClass(bgBlockBento, "bg-primary"),
      )}
    >
      <div className="sr-only">
        <h1>Overview</h1>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          "min-[800px]:grid-cols-2 min-[800px]:max-[1199px]:grid-rows-2",
          "min-[1200px]:grid-cols-[clamp(250px,24%,300px)_minmax(0,1fr)_clamp(250px,24%,300px)] min-[1200px]:grid-rows-none",
        )}
      >
        <div className="min-[800px]:col-start-1 min-[800px]:row-start-1 min-[1200px]:col-start-1 min-[1200px]:row-start-1">
          <IntroCard blok={introCardBlok} />
        </div>

        <TestimonialCard blok={testimonialsCardBlok} />

        <div
          className={cn(
            "grid grid-cols-1 gap-4 min-[800px]:col-start-2 min-[800px]:row-start-1",
            "min-[1200px]:col-start-3 min-[1200px]:row-start-1 min-[1200px]:grid-cols-1",
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
