import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/bento/BentoGrid";
import { getStoryblokApi } from "@/lib/storyblok";
import { isBentoBlock, isHeroBlock, PageContent } from "@/types/storyblok";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const pageContent = data.story.content as PageContent;
  const heroBlock = pageContent.body?.find(isHeroBlock);
  const bentoBlock = pageContent.body?.find(isBentoBlock);

  console.log("pageContent", pageContent);
  console.log("bentoBlock", bentoBlock);

  return (
    <main className="h-screen">
      {heroBlock ? <Hero blok={heroBlock} /> : null}
      {bentoBlock ? <BentoGrid blok={bentoBlock} /> : null}
    </main>
  );
}
