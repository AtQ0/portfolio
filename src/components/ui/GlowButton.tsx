import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

type GlowButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    innerClassName?: string;
    glowClassName?: string;
    children: React.ReactNode;
  };

function GlowInner({
  children,
  innerClassName,
  glowClassName,
}: {
  children: React.ReactNode;
  innerClassName?: string;
  glowClassName?: string;
}) {
  return (
    <span className="relative inline-block">
      <span
        className={cn(
          "glow-button-inner bg-fg-primary text-bg-primary relative z-10 inline-block rounded-[30px] px-12 py-4 text-[16px] font-medium",
          innerClassName,
        )}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-1 z-0 block rounded-[30px] blur-xl",
          "bg-[conic-gradient(at_50%_50%,#ffa4d2,#fb8989,#0c8ce9,#c1ffa5,#f1a3ff,#ffa4d2)]",
          "scale-75 opacity-0 transition-[opacity,transform] duration-700 ease-out",
          "group-hover/button:scale-100 group-hover/button:opacity-100 group-hover/button:duration-300",
          glowClassName,
        )}
      />
    </span>
  );
}

export function GlowButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  innerClassName,
  glowClassName,
  children,
  ...props
}: GlowButtonProps) {
  const baseClass = cn(
    buttonVariants({ variant, size }),
    "h-auto justify-start gap-0 rounded-none border-0 bg-transparent p-0",
    className,
  );

  if (asChild) {
    const child = React.Children.only(children);

    if (!React.isValidElement(child)) return null;

    const typedChild = child as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;

    return React.cloneElement(typedChild, {
      ...props,
      className: cn(baseClass, typedChild.props.className),
      children: (
        <GlowInner
          innerClassName={innerClassName}
          glowClassName={glowClassName}
        >
          {typedChild.props.children}
        </GlowInner>
      ),
    });
  }

  return (
    <Button className={baseClass} variant={variant} size={size} {...props}>
      <GlowInner innerClassName={innerClassName} glowClassName={glowClassName}>
        {children}
      </GlowInner>
    </Button>
  );
}
