# @workspace/tailwind-config

Centralized Tailwind CSS configuration package providing consistent shadcn/ui styling across the entire monorepo.

## Purpose

This package serves as the single source of truth for:
- **Design tokens** (colors, spacing, typography)
- **CSS variables** (light/dark theme)
- **Tailwind configuration**
- **shadcn/ui styling**

By centralizing the configuration, all apps and packages maintain consistent styling without duplicating configuration.

## Installation

This package is already set up in the monorepo. To use it in an app or package:

```json
{
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*"
  }
}
```

## Usage

### In Your CSS File

Import the base styles in your main CSS file:

```css
/* Your app's main CSS file */
@import "@workspace/tailwind-config/base.css";

/* Add your app-specific @source directives */
@source "./components/**/*.{ts,tsx}";
@source "./app/**/*.{ts,tsx}";
```

### In PostCSS Configuration

Use the shared PostCSS config:

```js
// postcss.config.mjs
export { default } from "@workspace/tailwind-config/postcss";
```

Or extend it:

```js
// postcss.config.mjs
import baseConfig from "@workspace/tailwind-config/postcss";

export default {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    // Add your additional plugins here
  },
};
```

## What's Included

### Design Tokens

- **Colors**: background, foreground, primary, secondary, muted, accent, destructive, etc.
- **Semantic colors**: card, popover, input, border, ring, sidebar
- **Charts**: chart-1 through chart-5
- **Radius**: Consistent border radius values (sm, md, lg, xl)

### Theme Support

- **Light theme** (default)
- **Dark theme** (.dark class)
- All colors use OKLCH color space for better perceptual uniformity

### Tailwind Utilities

All CSS variables are mapped to Tailwind utilities:
- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `border-border`, `ring-ring`
- And many more...

## Theme Structure

```css
:root {
  --background: oklch(1 0 0);          /* #ffffff in light mode */
  --foreground: oklch(0.145 0 0);      /* Near black text */
  --primary: oklch(0.205 0 0);         /* Primary brand color */
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);      /* Dark background */
  --foreground: oklch(0.985 0 0);      /* Light text */
  /* ... dark mode overrides */
}
```

## Benefits

✅ **Single source of truth** - Update once, apply everywhere  
✅ **No duplication** - Apps don't need their own Tailwind config  
✅ **Consistency** - Same design tokens across all apps/packages  
✅ **Easy updates** - Change theme in one place  
✅ **Type safety** - Shared configuration ensures compatibility  

## Customization

If you need to customize the theme:

1. **Fork approach**: Edit `src/base.css` directly (affects all apps)
2. **Override approach**: Import base, then override specific variables in your app

Example override:

```css
@import "@workspace/tailwind-config/base.css";

:root {
  --primary: oklch(0.5 0.2 250);  /* Custom primary color */
}
```

## Architecture

```
packages/tailwind-config/
├── src/
│   └── base.css              # All theme variables and config
├── postcss.config.mjs        # Shared PostCSS configuration
├── package.json              # Package definition
└── README.md                 # This file
```

## Used By

- `apps/web` - Next.js application
- `apps/storybook` - Storybook documentation
- `packages/ui` - UI component library

## Maintenance

When updating theme colors or adding new design tokens:

1. Update `src/base.css`
2. Test in Storybook to see changes across all components
3. Changes automatically propagate to all apps/packages

## License

Private package for workspace use.
