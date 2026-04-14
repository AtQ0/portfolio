import type { ProjectsBlock } from "@/types/storyblok";

type ProjectsProps = {
  blok: ProjectsBlock;
};

export default function Projects({ blok }: ProjectsProps) {
  return <h2 className="h-screen">{blok.headline}</h2>;
}
