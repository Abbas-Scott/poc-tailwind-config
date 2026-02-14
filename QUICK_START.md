# Quick Start Guide - Shared Tailwind Config

A 5-minute guide to understanding and using the shared Tailwind configuration.

## 📝 TL;DR

**One package (`@workspace/tailwind-config`) contains all Tailwind CSS dependencies and configuration. All apps import from it instead of installing Tailwind themselves.**

Benefits: Consistency, smaller bundles, easier maintenance.

---

## 🏗️ Architecture in 3 Points

1. **`tailwind-config` package** = Single source with Tailwind CSS installed
2. **Each app** = Creates `globals.css` importing from `tailwind-config`
3. **Result** = All apps share the same design system

---

## 🚀 Add to New App (3 Steps)

### Step 1: Add Dependency
```json
// apps/new-app/package.json
{
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*"
  }
}
```

### Step 2: Create globals.css
```css
/* apps/new-app/app/globals.css */
@import "@workspace/tailwind-config/base.css";
@source "../../**/*.{ts,tsx}";
```

### Step 3: Import It
```tsx
// apps/new-app/app/layout.tsx
import "./globals.css"
```

Done! All Tailwind classes work. ✅

---

## 💡 Key Concepts

### What is `@source`?
Tells Tailwind which files to scan for CSS classes:
```css
@source "../../**/*.{ts,tsx}";  /* Scan all .ts/.tsx files */
```

### What is `@import`?
Imports the shared CSS from tailwind-config package:
```css
@import "@workspace/tailwind-config/base.css";
```

### Why PostCSS config?
PostCSS processes the Tailwind directives. Each app references the shared config:
```js
// postcss.config.mjs
export { default } from "@workspace/tailwind-config/postcss";
```

---

## 🎨 Using Tailwind Classes

All standard Tailwind classes work:
```tsx
<div className="flex items-center gap-4 p-8 rounded-lg">
  <h1 className="text-2xl font-bold">Hello</h1>
</div>
```

All shadcn/ui tokens work:
```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

---

## 🌗 Dark Mode

Add `.dark` class to any parent:
```tsx
<html className="dark">  {/* Everything inside is dark mode */}
```

Or use `next-themes`:
```tsx
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

---

## 🎯 Common Patterns

### Card with shadcn colors
```tsx
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
  <h2 className="text-xl font-bold">Card Title</h2>
  <p className="text-muted-foreground">Description text</p>
</div>
```

### Button variants (from @workspace/ui)
```tsx
import { Button } from "@workspace/ui/components/button"

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Responsive layout
```tsx
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

---

## 🎨 Changing Theme Colors

Edit `packages/tailwind-config/src/base.css`:

```css
:root {
  --primary: oklch(0.5 0.3 270);  /* Change to purple */
  --radius: 0.25rem;               /* Sharper corners */
}
```

Rebuild:
```bash
pnpm build
```

All apps automatically use the new colors! 🎉

---

## 🔍 Troubleshooting

### Classes not working?
1. ✅ Check `@source` paths in globals.css
2. ✅ Verify PostCSS config references shared config
3. ✅ Ensure `@workspace/tailwind-config` in dependencies
4. ✅ Run `pnpm install` at root

### Build errors?
1. ✅ Run `pnpm install` at root
2. ✅ Clear `.next` folder: `rm -rf apps/*/. next`
3. ✅ Rebuild: `pnpm build`

### Colors not showing in dark mode?
1. ✅ Add `suppressHydrationWarning` to `<html>` tag
2. ✅ Verify `.dark` class is present
3. ✅ Use `next-themes` for React apps

---

## 📦 Package Structure

```
packages/tailwind-config/
├── src/base.css          ← All theme tokens and Tailwind imports
├── postcss.config.mjs    ← PostCSS configuration
└── package.json          ← Only place with Tailwind deps

apps/your-app/
├── app/
│   ├── globals.css       ← Imports tailwind-config + @source
│   └── layout.tsx        ← Imports globals.css
├── postcss.config.mjs    ← References shared config
└── package.json          ← References @workspace/tailwind-config
```

---

## 🎓 Learn More

- [Full README](../README.md) - Complete documentation
- [tailwind-config README](../packages/tailwind-config/README.md) - Package details
- [Tailwind CSS v4](https://tailwindcss.com) - Official docs
- [shadcn/ui](https://ui.shadcn.com) - Component library

---

## 💡 Pro Tips

1. **Use semantic tokens**: Prefer `bg-background` over `bg-white` for theme compatibility
2. **Leverage @workspace/ui**: Import pre-built shadcn components
3. **Test in Storybook**: See all components with live theme switching
4. **Think in CSS variables**: All colors are CSS vars that adapt to dark mode
5. **One source of truth**: Never install tailwindcss in apps directly

---

**Questions?** Check the [main README](../README.md) or examine existing apps for examples.
