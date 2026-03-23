import { cn } from "@/lib/utils";

type AvailabilityBadgeProps = {
  isOpen: boolean;
  closedText?: string;
};

export default function AvailabilityBadge({
  isOpen,
  closedText,
}: AvailabilityBadgeProps) {
  const badgeText = isOpen ? "Open for new projects" : closedText;
  const badgeColor = isOpen ? "bg-tea-green" : "bg-red-500";

  return (
    <div
      className={cn(
        "bg-bg-primary text-12 flex w-fit",
        "items-center gap-2.5 rounded-full px-3 py-1.5",
      )}
    >
      <span className={cn("block size-2 rounded-full", badgeColor)} />
      <span className="-mt-px">{badgeText}</span>
    </div>
  );
}
