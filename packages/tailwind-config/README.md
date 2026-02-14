# @workspace/tailwind-config

**The single source of truth for Tailwind CSS configuration across the entire monorepo.**

This package centralizes all Tailwind CSS v4 dependencies, design tokens, and shadcn/ui styling configuration, ensuring consistency and eliminating duplication across all apps and packages.

---

## 🎯 Why This Package Exists

### The Problem
In traditional monorepos, each app installs and configures Tailwind independently:
- ❌ Duplicated `tailwindcss` dependencies in multiple apps
- ❌ Inconsistent design tokens across projects
- ❌ Maintenance nightmare when updating themes
- ❌ Large `node_modules` with repeated packages

### The Solution
This package provides:
- ✅ **One** Tailwind installation for the entire monorepo
- ✅ Unified shadcn/ui design tokens
- ✅ Consistent styling across all apps
- ✅ Easy theme updates (change once, apply everywhere)
- ✅ Reduced installation time and disk usage

---

## 📦 What's Included

### 1. Tailwind CSS Dependencies
```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.18",  // Tailwind v4 PostCSS plugin
    "tailwindcss": "^4.1.18",            // Core Tailwind CSS
    "tw-animate-css": "^1.4.0"           // Animation utilities
  }
}
```

### 2. Base Styles (`src/base.css`)
- Complete Tailwind v4 imports
- shadcn/ui design tokens (light & dark themes)
- CSS variable to Tailwind utility mappings
- Global base styles

### 3. PostCSS Configuration (`postcss.config.mjs`)
- Pre-configured for Tailwind v4
- Ready to use across all apps

---

## 🚀 Installation & Usage

### In Apps

**1. Add to `package.json`:**
```json
{
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*"
  }
}
```

**2. Create `app/globals.css`:**
```css
/**
 * Import shared Tailwind configuration
 */
@import "@workspace/tailwind-config/base.css";

/**
 * Tell Tailwind which files to scan for classes
 */
@source "../../**/*.{ts,tsx}";  /* Your app files */
@source "../../../packages/ui/src/**/*.{ts,tsx}";  /* UI components */
```

**3. Create `postcss.config.mjs`:**
```javascript
// Reference shared PostCSS config
export { default } from "@workspace/tailwind-config/postcss";
```

**4. Import in your root layout:**
```tsx
import "./globals.css"

export default function RootLayout({ children }) {
  return <html>{children}</html>
}
```

Done! All Tailwind classes now work. 🎉

### In UI Packages

Same process, but only scan the package's own files:

```css
/* packages/ui/src/styles/globals.css */
@import "@workspace/tailwind-config/base.css";

/* Only scan UI package files */
@source "../**/*.{ts,tsx}";
```

---

## 🎨 Theme Tokens

### Color Palette

All colors use **OKLCH color space** for perceptual uniformity:

#### Light Theme (`:root`)
```css
--background: oklch(1 0 0);              /* Pure white */
--foreground: oklch(0.145 0 0);          /* Near black */
--primary: oklch(0.205 0 0);             /* Primary brand */
--secondary: oklch(0.97 0 0);            /* Light gray */
--muted: oklch(0.97 0 0);                /* Muted backgrounds */
--accent: oklch(0.97 0 0);               /* Accent highlights */
--destructive: oklch(0.577 0.245 27.325); /* Red errors */
--border: oklch(0.922 0 0);              /* Subtle borders */
--input: oklch(0.922 0 0);               /* Input borders */
--ring: oklch(0.708 0 0);                /* Focus rings */
```

#### Dark Theme (`.dark`)
```css
--background: oklch(0.145 0 0);          /* Dark background */
--foreground: oklch(0.985 0 0);          /* Light text */
--primary: oklch(0.985 0 0);             /* Inverted primary */
--secondary: oklch(0.269 0 0);           /* Dark gray */
--muted: oklch(0.269 0 0);               /* Muted dark */
--border: oklch(0.269 0 0);              /* Dark borders */
--ring: oklch(0.556 0 0);                /* Dark focus rings */
```

### Component Colors

**Card & Popover:**
```css
--card: var(--background);
--card-foreground: var(--foreground);
--popover: var(--background);
--popover-foreground: var(--foreground);
```

**Sidebar (for layouts):**
```css
--sidebar: oklch(0.985 0 0);             /* Light */
--sidebar-foreground: oklch(0.145 0 0);
--sidebar-primary: oklch(0.205 0 0);
--sidebar-accent: oklch(0.97 0 0);
--sidebar-border: oklch(0.922 0 0);
--sidebar-ring: oklch(0.708 0 0);
```

**Chart Colors:**
```css
--chart-1: oklch(0.646 0.222 41.116);    /* Orange */
--chart-2: oklch(0.6 0.118 184.704);     /* Teal */
--chart-3: oklch(0.398 0.07 227.392);    /* Blue */
--chart-4: oklch(0.828 0.189 84.429);    /* Green */
--chart-5: oklch(0.769 0.188 70.08);     /* Yellow */
```

### Border Radius

```css
--radius: 0.625rem;                       /* Base radius */
--radius-sm: calc(var(--radius) - 4px);  /* Small */
--radius-md: calc(var(--radius) - 2px);  /* Medium */
--radius-lg: var(--radius);               /* Large */
--radius-xl: calc(var(--radius) + 4px);  /* Extra large */
```

---

## 🛠️ Tailwind Utilities

All CSS variables are automatically mapped to Tailwind utilities via `@theme inline`:

### Background & Text
```tsx
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="bg-accent text-accent-foreground">
<div className="bg-destructive text-destructive-foreground">
```

### Borders & Rings
```tsx
<div className="border border-border">
<input className="border-input focus:ring-ring">
<div className="rounded-lg">  {/* Uses --radius-lg */}
```

### Cards & Popovers
```tsx
<div className="bg-card text-card-foreground">
<div className="bg-popover text-popover-foreground">
```

### Chart Colors
```tsx
<div className="bg-chart-1">
<div className="bg-chart-2">
```

---

## 🌗 Dark Mode

Dark mode is implemented using the `.dark` class with a custom variant:

```css
@custom-variant dark (&:is(.dark *));
```

### Enabling Dark Mode

**1. Add the dark class to `<html>`:**
```tsx
<html className="dark">
```

**2. With next-themes (recommended):**
```tsx
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**3. Theme switcher:**
```tsx
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  )
}
```

---

## 📐 Architecture

```
packages/tailwind-config/
├── src/
│   └── base.css              # Core styles and theme variables
├── postcss.config.mjs        # PostCSS plugin configuration
├── package.json              # Package exports and deps
└── README.md                 # This file
```

### Package Exports

```json
{
  "exports": {
    "./base.css": "./src/base.css",           // Import styles
    "./postcss": "./postcss.config.mjs"       // Import PostCSS config
  }
}
```

Usage:
```css
@import "@workspace/tailwind-config/base.css";
```

```js
export { default } from "@workspace/tailwind-config/postcss";
```

---

## ✏️ Customization

### Approach 1: Direct Modification (Recommended)
Edit `src/base.css` to change tokens for all apps:

```css
:root {
  --primary: oklch(0.5 0.3 270);  /* Change primary to purple */
  --radius: 0.25rem;               /* Make corners sharper */
}
```

Then rebuild:
```bash
pnpm build
```

### Approach 2: Per-App Overrides
Import base, then override in your app's globals.css:

```css
/* apps/my-app/app/globals.css */
@import "@workspace/tailwind-config/base.css";

/* App-specific overrides */
:root {
  --primary: oklch(0.6 0.2 140);  /* Green primary for this app only */
}

@source "../../**/*.{ts,tsx}";
```

---

## 🔬 How It Works

### Tailwind v4 `@source` Directive
Tells Tailwind which files to scan for class usage:

```css
@source "../../**/*.{ts,tsx}";  /* Scans all .ts/.tsx files */
```

This replaces the old `content` config in `tailwind.config.js`.

### `@theme inline`
Maps CSS variables to Tailwind utilities:

```css
@theme inline {
  --color-primary: var(--primary);
}
```

This enables:
- `bg-primary` → `background-color: var(--primary)`
- `text-primary` → `color: var(--primary)`
- Etc.

### `@custom-variant`
Creates custom selector variants:

```css
@custom-variant dark (&:is(.dark *));
```

Enables dark mode with `.dark` class on any parent.

---

## 🎯 Used By

This package is consumed by:
- ✅ `apps/web` - Main Next.js application
- ✅ `apps/demo` - Demo Next.js application
- ✅ `apps/storybook` - Storybook documentation
- ✅ `packages/ui` - Shared UI component library

---

## 🔧 Maintenance

### Adding New Design Tokens

1. Add CSS variable to `src/base.css`:
```css
:root {
  --my-new-color: oklch(0.5 0.2 180);
}
```

2. Map to Tailwind utility:
```css
@theme inline {
  --color-my-new-color: var(--my-new-color);
}
```

3. Use in components:
```tsx
<div className="bg-my-new-color text-my-new-color">
```

### Updating Tailwind Version

1. Update `package.json`:
```json
{
  "dependencies": {
    "tailwindcss": "^4.x.x"
  }
}
```

2. Reinstall:
```bash
pnpm install
```

3. Rebuild all apps:
```bash
pnpm build
```

All apps automatically use the new version! 🚀

---

## 🤝 Integration with shadcn/ui

This package provides all design tokens required by [shadcn/ui](https://ui.shadcn.com) components.

### Adding Components

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components are automatically styled using the theme tokens from this package.

---

## 📊 Benefits Summary

| Benefit | Description |
|---------|-------------|
| **🎯 Single Source** | One place for all Tailwind config |
| **🔄 Consistency** | Same tokens across all apps |
| **⚡ Performance** | No duplicate dependencies |
| **🛠️ Maintainability** | Update once, apply everywhere |
| **🎨 Themeable** | Easy light/dark mode support |
| **📦 Modular** | Apps choose what to import |
| **🔒 Type-Safe** | TypeScript-friendly CSS vars |

---

## 📝 License

Private workspace package.
