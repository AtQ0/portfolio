import Hero from "@/components/sections/Hero";
import IntroGrid from "@/components/sections/intro-grid/IntroGrid";
import { getStoryblokApi } from "@/lib/storyblok";
import { isHeroBlock, PageContent } from "@/types/storyblok";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const pageContent = data.story.content as PageContent;
  const heroBlock = pageContent.body?.find(isHeroBlock);

  console.log("heroBlock", heroBlock);

  return (
    <main className="h-screen">
      {heroBlock ? <Hero blok={heroBlock} /> : null}
      <IntroGrid />
    </main>
  );
}
