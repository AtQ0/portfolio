import Hero from "@/components/sections/Hero";
import Strategy from "@/components/sections/Strategy";
import BentoGrid from "@/components/sections/bento/BentoGrid";
import Projects from "@/components/sections/projects/Projects";
import { getStoryblokApi } from "@/lib/storyblok";
import type {
  PageContent,
  HeroBlock,
  BentoBlock,
  StrategyBlock,
  ProjectsBlock,
} from "@/types/storyblok";
import {
  isBentoBlock,
  isHeroBlock,
  isStrategyBlock,
  isProjectsBlock,
} from "@/types/storyblok";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const pageContent: PageContent = data.story.content as PageContent;
  const heroBlock: HeroBlock | undefined = pageContent.body?.find(isHeroBlock);
  const bentoBlock: BentoBlock | undefined =
    pageContent.body?.find(isBentoBlock);
  const strategyBlock: StrategyBlock | undefined =
    pageContent.body?.find(isStrategyBlock);
  const projectsBlock: ProjectsBlock | undefined =
    pageContent.body?.find(isProjectsBlock);

  // normalized hero cta anchor link to be passed to hero (a) and bento (id) sections for match
  const ctaTarget =
    (heroBlock?.ctaLink ?? "bento").replace(/^#/, "").trim() || "bento";

  //console.log("pageContent", pageContent);
  //console.log("bentoBlock", bentoBlock);
  console.log("strategyBlock", strategyBlock);

  return (
    <div>
      {heroBlock ? <Hero blok={heroBlock} ctaTarget={ctaTarget} /> : null}

      {bentoBlock ? (
        <BentoGrid blok={bentoBlock} ctaTarget={ctaTarget} />
      ) : null}

      {strategyBlock ? <Strategy blok={strategyBlock} /> : null}

      {projectsBlock ? <Projects blok={projectsBlock} /> : null}
    </div>
  );
}
