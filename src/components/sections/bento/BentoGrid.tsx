import { cn } from "@/lib/utils";
import type {
  BentoBlock,
  IntroCard as IntroCardBlok,
  TestimonialsCard,
  ServiceCard as ServiceCardBlok,
  TechStackCard as TechStackCardBlok,
  ClientLogos as ClientLogosBlok,
} from "@/types/storyblok";
import ClientLogos from "./ClientLogos";
import { getBgClass } from "@/lib/cmsTheme";
import IntroCard from "./IntroCard";
import TestimonialCard from "./TestimonialCard";
import TechStackCard from "./TechStackCard";
import ServiceCard from "./ServiceCard";

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
    (s): s is TechStackCardBlok => s.component === "TechStackCard",
  );

  const serviceCardBlok = blok.sections?.find(
    (s): s is ServiceCardBlok => s.component === "ServiceCard",
  );

  const clientLogosBlok = blok.sections?.find(
    (s): s is ClientLogosBlok => s.component === "ClientLogos",
  );

  const bgBlockBento = blok.background ?? "bg-primary";

  return (
    <section
      id={ctaTarget}
      className={cn(
        "gap-gutter-md px-gutter flex flex-col py-[calc(var(--spacing-gutter)*2)]",
        getBgClass(bgBlockBento, "bg-primary"),
      )}
    >
      <div className="sr-only">
        <h2>Overview</h2>
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
            "grid grid-cols-1 gap-4",
            "min-[600px]:max-[800px]:grid-cols-2",
            "min-[800px]:col-start-2 min-[800px]:row-start-1",
            "min-[1200px]:col-start-3 min-[1200px]:row-start-1",
          )}
        >
          <TechStackCard blok={techStackCardBlok} />
          <ServiceCard blok={serviceCardBlok} />
        </div>
      </div>

      <ClientLogos blok={clientLogosBlok} className="-mx-gutter" />
    </section>
  );
}
