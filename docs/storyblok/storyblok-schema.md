```text
+---------------------+------------------+------------------+
| Name                | Type             | Naming convention|
+---------------------+------------------+------------------+
| page                | Content          | lowercase        |
| block_bento         | Nestable block   | lowercase        |
| IntroCard           | Nestable block   | PascalCase       |
| TestimonialsCard    | Nestable block   | PascalCase       |
| TechStackCard       | Nestable block   | PascalCase       |
| TechItem            | Nestable block   | PascalCase       |
| DateClock           | Nestable block   | PascalCase       |
+---------------------+------------------+------------------+



page (Content)
 ├─ block_hero (Nestable block)
 │    ├─ signal              → Boolean (field)
 │    ├─ signalClosedText    → Text (field)
 │    ├─ headline            → Text (field)
 │    ├─ text                → Richtext (field)
 │    ├─ cta                 → Text (field)
 │    ├─ ctaLink             → Text (field)
 │    ├─ media               → Asset (field)
 │    ├─ footnote            → Richtext (field)
 │    └─ background          → Single-Option (field)
 │
 ├─ block_bento (Nestable block)
 │    ├─ background          → Single-Option (field)
 │    └─ sections (Blocks field)
 │         ├─ IntroCard (Nestable block)
 │         │    ├─ background        → Single-Option (field)
 │         │    ├─ headline          → Text (field)
 │         │    ├─ description       → Richtext / Textarea (field)
 │         │    ├─ ctaText           → Text (field)
 │         │    └─ ctaLink           → Text (field)
 │         │
 │         ├─ TestimonialsCard (Nestable block)
 │         │    ├─ background        → Single-Option (field)
 │         │    └─ testimonials      → Blocks field
 │         │         └─ TestimonialItem (Nestable block)
 │         │              ├─ quote            → Richtext / Textarea (field)
 │         │              ├─ authorName       → Text (field)
 │         │              └─ authorPosition   → Text (job title + company) (field)
 │         │
 │         ├─ TechStackCard (Nestable block)
 │         │    ├─ background        → Single-Option (field)
 │         │    ├─ techHeadline      → Text (field)
 │         │    ├─ techDescription   → Richtext / Textarea (field)
 │         │    └─ techItems         → Blocks field
 │         │         └─ TechItem (Nestable block)
 │         │              ├─ title       → Text (field)
 │         │              ├─ icon        → Asset / Image (field)
 │         │              ├─ background  → Single-Option (field)
 │         │              └─ stroke      → Single-Option (field)
 │         │
 │         └─ ServiceCard (Nestable block)
 │              ├─ background        → Single-Option (field)
 │              ├─ headline          → Text (field)
 │              ├─ text              → Richtext / Textarea (field)
 │              ├─ artworkSVG        → Asset / Image (field)   # main artwork from Storyblok
 │              └─ overlayLabel      → Text (field)            # label text from Storyblok
 │
 │              (hardcoded in frontend, not Storyblok fields)
 │              ├─ interactive overlay icon SVG (e.g. pointer)
 │              └─ animation logic (CSS/GSAP)
 │
 ├─ block_strategy (Nestable block)
 │    └─ background          → Single-Option (field)
 ├─ block_projects (Nestable block)
 │    └─ background          → Single-Option (field)
 ├─ block_faq (Nestable block)
 │    └─ background          → Single-Option (field)
 ├─ block_play (Nestable block)
 │    └─ background          → Single-Option (field)
 └─ block_footer (Nestable block)
      └─ background          → Single-Option (field)
```
