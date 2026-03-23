```text
┌─────────────────────────────────────────────────────────────────────────┐
│ page (root story)                                                       │
│ ────────────────────────────────────────────────────────────────────────│
│ blocks[] → ordered stack of block\_\* components                        │
│ SEO tab: seo_title | seo_description | seo_image                        │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ blocks[] (order = section order on the page)                            │
└─────────────────────────────────────────────────────────────────────────┘
```

    ┌──────────────────────────┐
    │  block_hero              │
    │  ─────────────           │
    │  • signal (boolean)      │  ← true=open, false=closed
    │  • signal_closed_text    │  ← text for closed state
    │    (text, optional)      │     e.g. "Unavailable for new projects"
    │                          │
    │  • headline (text)       │
    │  • text (richtext)       │
    │  • cta (text)            │  ← button label (schema is "text" + link
    │                          │     UI options in Storyblok)
    │  • media (asset)         │  ← image or video
    │  • footnote (richtext)   │  ← e.g. links / resume line
    │  • background (option)   │  ← datasource: backgrounds
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  block_bento             │
    │  ─────────────           │
    │  • headline (text)       │
    │  • headline_a11y (bool)  │  ← boolean, not a free-text a11y field
    │  • text (richtext)       │
    │  • about (richtext)      │  ← includes style presets (e.g. "Lead")
    │  • testimonials[]        │  → nested: testimonial
    │  • background (option)   │
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  (client logos / marquee)│  ← NOT in components.json for this space;
    │                          │     implement in app or add your own blok
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  block_text              │
    │  ─────────────           │
    │  • headline (text)       │
    │  • text (richtext)       │  ← e.g. "Strategy"-style copy
    │  • background (option)   │
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  block_projects          │
    │  ─────────────           │
    │  • headline (text)       │
    │  • headline_a11y (bool)  │
    │  • text (richtext)       │
    │  • projects[]            │  → nested: project
    │  • background (option)   │
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  block_faq               │
    │  ─────────────           │
    │  • headline (text)       │
    │  • faq[]                 │  → nested: faq
    │  • background (option)   │
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  block_play              │
    │  ─────────────           │
    │  • headline (text)       │
    │  • headline_a11y (bool)  │
    │  • text (richtext)       │  ← intro copy only in schema; no child
    │                          │     bloks here — UI cards = app code
    │  • background (option)   │
    └──────────────────────────┘

                 │
                 ▼

    ┌──────────────────────────┐
    │  footer / globals        │  ← not in page.blocks[] in this schema;
    │  (email, company line…)  │     likely layout, env, or hardcoded
    └──────────────────────────┘

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ NESTED COMPONENTS (used inside blocks above)                            │
└─────────────────────────────────────────────────────────────────────────┘
```

    testimonial          project                 faq
    ───────────          ───────                 ───
    • quote (richtext)   • headline (text)       • question (text)
    • name (text)        • text (richtext)       • answer (richtext)
    • subtext (text)     • media (asset)
                         • link (multilink)

---

## Next.js repo mapping

Storyblok `component` strings (API) ↔ this repo’s React components. Update when you rename files or change the blok resolver.

### Page root

| Storyblok | Role                        | Repo / usage                                                                                                                     |
| --------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `page`    | Root story: `blocks[]`, SEO | `src/app/page.tsx` (fetch story, loop `blocks`), `src/app/layout.tsx` (shell). SEO: `seo_title`, `seo_description`, `seo_image`. |

### Section blocks (`page.content.blocks[]`)

| Storyblok `component` | React component                    | Path                                               |
| --------------------- | ---------------------------------- | -------------------------------------------------- |
| `block_hero`          | `Hero`                             | `src/components/sections/Hero.tsx`                 |
| `block_bento`         | `IntroGrid` (or rename to `Bento`) | `src/components/sections/intro-grid/IntroGrid.tsx` |
| `block_text`          | `Strategy`                         | `src/components/sections/Strategy.tsx`             |
| `block_projects`      | `Projects`                         | `src/components/sections/projects/Projects.tsx`    |
| `block_faq`           | `Faq`                              | `src/components/sections/Faq.tsx`                  |
| `block_play`          | `Play`                             | `src/components/sections/Play.tsx`                 |

### Fields → props (by block)

Rough mapping from `blok.content`:

| Block            | Fields                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `block_hero`     | `signal`, `signal_closed_text`, `headline`, `text`, `cta`, `media`, `footnote`, `background` |
| `block_bento`    | `headline`, `headline_a11y`, `text`, `about`, `testimonials` (nested), `background`          |
| `block_text`     | `headline`, `text`, `background`                                                             |
| `block_projects` | `headline`, `headline_a11y`, `text`, `projects` (nested), `background`                       |
| `block_faq`      | `headline`, `faq` (nested), `background`                                                     |
| `block_play`     | `headline`, `headline_a11y`, `text`, `background`                                            |

### Nested bloks

| Storyblok `component` | Parent                           | React component     | Path                                                         |
| --------------------- | -------------------------------- | ------------------- | ------------------------------------------------------------ |
| `testimonial`         | `block_bento` → `testimonials[]` | `TestimonialCard`   | `src/components/sections/intro-grid/TestimonialCard.tsx`     |
| `project`             | `block_projects` → `projects[]`  | `ProjectCard`       | `src/components/sections/projects/ProjectCard.tsx`           |
| `faq`                 | `block_faq` → `faq[]`            | inline or `FaqItem` | `src/components/sections/Faq.tsx` (or extract `FaqItem.tsx`) |

### Not in this Storyblok schema / layout-only

| Repo                                      | Notes                                                   |
| ----------------------------------------- | ------------------------------------------------------- |
| `src/components/sections/ClientLogos.tsx` | No blok in this export; code-only or add a blok later.  |
| `src/components/sections/Footer.tsx`      | Not in `page.blocks[]`; layout, env, or separate story. |

### Resolver (conceptual)

```text
block_hero      → Hero
block_bento     → IntroGrid (or Bento)
block_text      → Strategy
block_projects  → Projects
block_faq       → Faq
block_play      → Play

testimonial     → TestimonialCard
project         → ProjectCard
faq             → FaqItem (or inline in Faq)
```
