import Hero from "@/components/sections/Hero";
import IntroGrid from "@/components/sections/intro-grid/IntroGrid";
import { getStoryblokApi } from "@/lib/storyblok";

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const heroBlok = data.story.content;
  console.log("keys", Object.keys(heroBlok));
  console.log("yeah", heroBlok.yeah);

  return (
    <main className="h-screen">
      <Hero blok={heroBlok} />
      <IntroGrid />
    </main>
  );
}
