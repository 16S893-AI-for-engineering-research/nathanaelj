---
name: new-page
description: Rules and workflow for creating a new page (*.astro file) in the website. Use whenever creating or structuring a new page to ensure clean layout, accurate title padding for tall fonts, minimal extra decorations, sharp corners, and proper path resolution.
---

# New Page Creation Guidelines (`new-page` Skill)

Use this skill whenever creating a new page (`*.astro` file) in `src/pages/`.

## Key Formatting Rules & Avoiding Common Mistakes

### 1. No Top Banner Boxes or Miscellaneous Callouts
- **Do NOT** include boxes at the top of the page containing miscellaneous introductory text, sub-titles, or decorative notice banners.
- Start directly with the main page header or primary content section.

### 2. Minimal Text & Peripheral Decorations
- Keep body text and peripheral decorations (borders, accent lines, extra badges) to a minimum.
- Focus strictly on implementing the title, text, and subtitles requested by the user without adding excessive or unprompted filler content.

### 3. Box Styling (Sharp Corners Only)
- Do **NOT** use boxes with rounded corners (avoid Tailwind `rounded-*` classes or CSS `border-radius` on content boxes/cards).
- Maintain sharp, geometric 90-degree corners for all containers and cards.

### 4. Margins & Padding (Use Scripting for Verification)
- Pay careful attention to vertical and horizontal spacing (`padding` and `margin`).
- **Use Scripting for Mathematical Checks:** Where helpful, write a small script (Node/JS/Python) or perform mathematical checks to verify line-heights, container dimensions, font heights, and spacing budgets rather than guessing values.
- **Tall Font Protection:**
  - The site's display font (`Playfair Display` / `font-display`) is vertically tall.
  - Title text often gets cropped off at the top or bottom if `line-height` (`leading-*`) or `padding` is insufficient.
  - Always ensure `leading-tight` or `leading-snug` with adequate `pt-*` / `pb-*` or `py-*` to prevent clipping.
- **Avoid Excessive Padding:** Do not apply excessively large padding or margins just to be safe; think carefully and calculate exact values.

### 5. Standard Page Boilerplate
- Wrap pages with `BaseLayout` from `@layouts/BaseLayout.astro`.
- Use `resolvePath()` from `@lib/paths` for any internal navigation links or images.

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import { resolvePath } from '@lib/paths';

const title = "Page Title";
const description = "Page description for SEO and header.";
---

<BaseLayout title={title} description={description}>
  <main class="max-w-4xl mx-auto px-6 py-12">
    <!-- Clean title section with sufficient line-height and padding for tall font -->
    <h1 class="font-display text-4xl sm:text-5xl font-bold text-solar-light leading-tight pt-2 pb-4 mb-6">
      Page Title
    </h1>
    
    <div class="text-void-200 font-sans space-y-4">
      <p>Content requested by the user...</p>
    </div>
  </main>
</BaseLayout>
```
