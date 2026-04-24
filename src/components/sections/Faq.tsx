import { getBgClass } from "@/lib/cmsTheme";
import { hasRichTextContent } from "@/lib/storyblokRichText";
import { cn } from "@/lib/utils";
import type { FaqBlock, StoryblokRichText } from "@/types/storyblok";
import { StoryblokRichText as SbRichText } from "@storyblok/react";

const FALLBACK_HEADLINE = "Frequently Asked Questions";

type FallbackFaqQuestion = {
  question: string;
  answer: string;
};

const FALLBACK_QUESTIONS: FallbackFaqQuestion[] = [
  {
    question: "What projects do you work on?",
    answer: `
ERverything from marketing sites and product landing pages to fully custom web apps. Whether you're a startup or a large organisation, I deliver fast, accessible, bespoke digital experiences using modern frontend technologies.

I also work within existing development and design teams, remotely or on-site, for web-related projects.
`,
  },
  {
    question: "Do you work remotely or on-site?",
    answer: `
I primarily work remotely from my studio in Gothenburg, but I'm happy to attend meetings at your office when needed or collaborate as part of a larger team.
`,
  },
  {
    question: "What tech stack and tools do you use?",
    answer: `
I specialise in modern web technologies such as React, Angular, Vue, Next, Nuxt, TypeScript, Tailwind, .NET, GSAP, Supabase, and more. I also use design tools like Figma for crafting pixel-perfect UI designs.

If you have a tech stack I'm not familiar with, I'll do my best to ramp up quickly. If that's not possible or it's out of scope, I'll happily recommend an alternative developer or designer you could work with.

I also have broad experience managing the full project lifecycle, from planning and client communication to collaborating with designers and architecting the approach.
`,
  },
  {
    question: "Can I see more of your work?",
    answer: `
You can explore my recently selected projects in the section above. I don't typically write lengthy case studies here and prefer to show the work live, in situ, so you can make your own judgement.

Projects that have undergone significant change since I last worked on them, and many projects in general, are not shown. This is so you can be confident that every project displayed here is something I've built myself.

This portfolio is only a fraction of all the work I've done. Most projects can't be shown due to NDAs or aren't visual enough to include here (for example, bug fixes, feature work, or internal projects).
`,
  },
  {
    question: "How can I start a new project?",
    answer: `
If you'd like to collaborate, you can message me at mail@atkobabic.com with as much detail about your project as possible (timeframes/deadlines, budget, and scope). The more detail, the better!

If everything looks good, we can arrange a call and take it from there.
`,
  },
];

type RenderFaqQuestion = {
  key: string;
  question: string;
  answer: string | StoryblokRichText;
};

function renderFallbackAnswer(answer: string) {
  const paragraphs = answer
    .trim()
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function Faq({ blok }: { blok: FaqBlock }) {
  const background = blok.background ?? "bg-secondary";
  const headline = blok.headline?.trim() || FALLBACK_HEADLINE;

  const questions: RenderFaqQuestion[] = FALLBACK_QUESTIONS.map((fb, index) => {
    const cms = blok.questions?.[index];

    const question = cms?.question?.trim() ? cms.question.trim() : fb.question;
    const answer =
      cms?.answer && hasRichTextContent(cms.answer) ? cms.answer : fb.answer;

    return {
      key: cms?._uid ?? `fallback-${index}`,
      question,
      answer,
    };
  });

  return (
    <section
      className={cn(
        "px-gutter py-gutter-xl flex flex-col gap-10",
        getBgClass(background, "bg-secondary"),
        "bg-blue-400",
      )}
    >
      <div className="bg-red-300">
        <div className="mx-auto w-full md:max-w-153.75">
          <h2 className="text-fg-secondary text-18">{headline}</h2>

          <div className="flex flex-col gap-4">
            {questions.map((question) => (
              <div key={question.key}>
                <h3>{question.question}</h3>
                {typeof question.answer === "string" ? (
                  renderFallbackAnswer(question.answer)
                ) : (
                  <div className="text-fg-secondary text-18 bg-pink-300 [&_p+p]:mt-4">
                    <SbRichText doc={question.answer} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
