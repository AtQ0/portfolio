"use client";

import { isValidElement, useState, type ReactNode } from "react";

import { getBgClass } from "@/lib/cmsTheme";
import { hasRichTextContent } from "@/lib/storyblokRichText";
import { cn } from "@/lib/utils";
import type { FaqBlock, StoryblokRichText } from "@/types/storyblok";
import { StoryblokRichText as SbRichText } from "@storyblok/react";

const FALLBACK_HEADLINE = "Frequently Asked Questions";

type FallbackFaqQuestion = {
  question: string;
  answer: string | ReactNode;
};

const FALLBACK_QUESTIONS: FallbackFaqQuestion[] = [
  {
    question: "What projects do you work on?",
    answer: `
Everything from marketing sites and product landing pages to fully custom web apps. Whether you're a startup or a large organisation, I deliver fast, accessible, bespoke digital experiences using modern frontend technologies.

I also work within existing development and design teams, remotely or on-site, for web-related projects.
`,
  },
  {
    question: "Do you work remotely or on-site?",
    answer: `
I primarily work remotely from my studio in Gothenburg, but I'm happy to attend meetings at your office when needed or collaborate as part of a larger team.`,
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
    answer: (
      <div className="space-y-4">
        <p>
          If you&apos;d like to collaborate, you can message me at{" "}
          <a href="mailto:mail@atkobabic.com">mail@atkobabic.com</a> with as
          much detail about your project as possible (timeframes/deadlines,
          budget, and scope). The more detail, the better!
        </p>
        <p>
          If everything looks good, we can arrange a call and take it from
          there.
        </p>
      </div>
    ),
  },
];

type RenderFaqQuestion = {
  key: string;
  question: string;
  answer: StoryblokRichText | string | ReactNode;
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

function renderResolvedAnswer(answer: StoryblokRichText | string | ReactNode) {
  if (typeof answer === "string") {
    return renderFallbackAnswer(answer);
  }

  if (isValidElement(answer)) {
    return answer;
  }

  if (
    answer !== null &&
    typeof answer === "object" &&
    hasRichTextContent(answer as StoryblokRichText)
  ) {
    return (
      <div className="[&_p+p]:mt-4">
        <SbRichText doc={answer as StoryblokRichText} />
      </div>
    );
  }

  return <>{answer}</>;
}

export default function Faq({ blok }: { blok: FaqBlock }) {
  const background = blok.background ?? "bg-secondary";
  const headline = blok.headline?.trim() || FALLBACK_HEADLINE;

  const [openKey, setOpenKey] = useState<string | null>(null);

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
        "px-gutter py-gutter-xl",
        getBgClass(background, "bg-secondary"),
      )}
    >
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-153.75">
        <h2 className="text-fg-secondary text-18">{headline}</h2>

        <ul className="faq-list flex list-none flex-col gap-4 p-0">
          {questions.map((question, index) => {
            const isOpen = openKey === question.key;
            const panelId = `faq-panel-${question.key}`;

            return (
              <li
                key={question.key}
                className="transition-opacity duration-200 motion-reduce:transition-none [.faq-list:hover:has(>_li:hover)>_li:not(:hover)]:opacity-35"
              >
                <button
                  type="button"
                  id={`faq-trigger-${question.key}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenKey((k) =>
                      k === question.key ? null : question.key,
                    )
                  }
                  className="text-20 md:text-24 grid w-full cursor-pointer grid-cols-[44px_minmax(0,1fr)] text-left"
                >
                  <span className="tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-balance">{question.question}</span>
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                  aria-hidden={!isOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={`faq-trigger-${question.key}`}
                      className="richtext-links text-fg-secondary text-18 border-t-transparent px-[44px] pt-4"
                      inert={!isOpen ? true : undefined}
                    >
                      {renderResolvedAnswer(question.answer)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
