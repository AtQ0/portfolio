import { cn } from "@/lib/utils";

type ClientLogosProps = {
  className?: string;
};

export default function ClientLogos({ className }: ClientLogosProps) {
  return (
    <div className={cn("text-40 bg-amber-500", className)}>ClientLogos</div>
  );
}
