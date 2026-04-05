"use client";

import Image from "next/image";
import { useState } from "react";
import type { TechItem } from "@/types/storyblok";

const PLACEHOLDER_SRC = "/icons/tech-icons/placeholder.svg";

function techItemLabel(item: TechItem): string {
  return (
    item.title?.trim() ||
    item.icon?.alt?.trim() ||
    item.icon?.title?.trim() ||
    ""
  );
}

type TechStackItemIconProps = {
  item: TechItem;
};

export function TechStackItemIcon({ item }: TechStackItemIconProps) {
  const label = techItemLabel(item);
  const remoteSrc = item.icon?.filename;
  const [failed, setFailed] = useState(false);

  const usePlaceholder = !remoteSrc || failed;
  const src = usePlaceholder ? PLACEHOLDER_SRC : remoteSrc;

  const displayName = label || "Technology";

  return (
    <Image
      title={displayName}
      src={src}
      alt={displayName}
      width={32}
      height={32}
      className="h-7 w-7 object-contain"
      onError={() => setFailed(true)}
    />
  );
}
