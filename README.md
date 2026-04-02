## Portfolio (Next.js + Storyblok)

Ongoing portfolio website built with Next.js and Storyblok. The homepage is CMS-driven and assembled from reusable content blocks, animations, and carousels.

## Features

- CMS-driven homepage - Storyblok powers the `home` story and block content
- Hero section - animated headline reveal, availability status, CTA anchor navigation
- Bento section - intro card with local date/time and email CTA
- Testimonials carousel - Keen Slider with CMS data plus local fallback testimonials
- Typed content model - strongly typed Storyblok blocks and guards in TypeScript

## Design

- UI mockups and sketches live in Figma: [Portfolio - Figma](https://www.figma.com/design/kB6x0y5TT83q78VFuO034G/portfolio?node-id=0-1&m=dev&t=AEzwjMjfw2Kvteqz-1)

## Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── providers/
│   │   │   └── StoryblokProvider.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   └── bento/
│   │   │       ├── BentoGrid.tsx
│   │   │       ├── ClientLogos.tsx
│   │   │       ├── IntroCard.tsx
│   │   │       └── TestimonialCard.tsx
│   │   └── ui/
│   │       ├── AvailabilityBadge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── Carousel.tsx
│   │       ├── GlowButton.tsx
│   │       └── date-time/
│   │           ├── Clock.tsx
│   │           └── DateDisplay.tsx
│   ├── hooks/
│   │   └── useHeroAnimation.ts
│   ├── lib/
│   │   ├── cmsTheme.ts
│   │   ├── storyblok.ts
│   │   ├── testimonials.ts
│   │   └── utils.ts
│   └── types/
│       └── storyblok.ts
├── public/
│   ├── icons/
│   │   └── logotypes/
│   └── palette/
├── docs/
│   └── storyblok/
│       └── storyblok-schema.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── readme1.md
└── tsconfig.json
```

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 + shadcn
- Storyblok (`@storyblok/react`)
- GSAP (hero animations)
- Keen Slider (testimonials carousel)
- Radix UI / shadcn components + Lucide icons

## Prerequisites

- Node.js installed
- A Storyblok access token for local development

## Environment variables

Create a `.env.local` file in the project root:

```bash
STORYBLOK_TOKEN=your_storyblok_access_token
```

The token is used by `src/lib/storyblok.ts` (`getStoryblokApi`).

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Build / production

```bash
npm run build
npm start
```

## Notes about assets

- `next.config.ts` allows loading Storyblok images from:
  - `a.storyblok.com`
  - `a2.storyblok.com`
- `src/app/globals.css` references font files under `public/fonts/` (ComicNeue + Saans). If you want the same typography, ensure those `.woff2` files exist in `public/fonts/`.
- The `Hero` CTA includes a resume link to `/files/resume-atko-babic.pdf`. If you want that to work locally, add the PDF at `public/files/resume-atko-babic.pdf`.
