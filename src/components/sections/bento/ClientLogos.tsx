import { Marquee } from "@/components/ui/Marquee";
import { getBgClass } from "@/lib/cmsTheme";
import { cn } from "@/lib/utils";
import { ClientLogos as ClientLogosBlok } from "@/types/storyblok";
import Image from "next/image";

type ClientLogosProps = {
  blok?: ClientLogosBlok;
  className?: string;
};

export default function ClientLogos({ blok, className }: ClientLogosProps) {
  const background = blok?.background ?? "bg-primary";
  const clientLogos = blok?.client_logo_items;

  return (
    <div
      className={cn(
        "text-fg-secondary",
        getBgClass(background, "bg-primary"),
        className,
      )}
    >
      {clientLogos?.length ? (
        <Marquee
          loopSeamClassName="pe-40"
          durationSeconds={30}
          className="marquee-fade"
          style={
            {
              "--marquee-fade-size": "392px",
            } as React.CSSProperties
          }
        >
          <ul className="flex shrink-0 flex-nowrap gap-40">
            {clientLogos.map((item) => {
              const src = item.logo?.filename;
              if (!src) return null;

              return (
                <li key={item._uid}>
                  <a
                    className="group"
                    href={item.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={128}
                      height={128}
                      src={src}
                      alt={item.logo?.alt || "Client logo"}
                      className="h-8 w-auto object-contain opacity-80"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </Marquee>
      ) : null}
    </div>
  );
}
