import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/bento/BentoGrid";
import { getStoryblokApi } from "@/lib/storyblok";
import type { PageContent, HeroBlock, BentoBlock } from "@/types/storyblok";
import { isBentoBlock, isHeroBlock } from "@/types/storyblok";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const pageContent: PageContent = data.story.content as PageContent;
  const heroBlock: HeroBlock | undefined = pageContent.body?.find(isHeroBlock);
  const bentoBlock: BentoBlock | undefined =
    pageContent.body?.find(isBentoBlock);

  // normalized hero cta anchor link to be passed to hero (a) and bento (id) sections for match
  const ctaTarget =
    (heroBlock?.ctaLink ?? "bento").replace(/^#/, "").trim() || "bento";

  //console.log("pageContent", pageContent);
  //console.log("bentoBlock", bentoBlock);

  return (
    <div>
      {heroBlock ? <Hero blok={heroBlock} ctaTarget={ctaTarget} /> : null}
      <article>
        {bentoBlock ? (
          <BentoGrid blok={bentoBlock} ctaTarget={ctaTarget} />
        ) : null}
      </article>
    </div>
  );
}
