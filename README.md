# Shared Tailwind Config - Monorepo Template

A production-ready monorepo template demonstrating centralized Tailwind CSS v4 configuration for scalable, multi-app projects with zero duplication.

## 🎯 The Problem

In traditional monorepos, each app independently installs and configures Tailwind CSS:

```json
// apps/app-1/package.json
{
  "dependencies": {
    "tailwindcss": "^4.1.18",
    "@tailwindcss/postcss": "^4.1.18"
  }
}

// apps/app-2/package.json
{
  "dependencies": {
    "tailwindcss": "^4.1.18",        // ❌ Duplicate install
    "@tailwindcss/postcss": "^4.1.18" // ❌ Duplicate install
  }
}
```

**This approach leads to:**

| Problem | Impact |
|---------|--------|
| 🔴 **Dependency Duplication** | Multiple Tailwind installations bloating `node_modules` |
| 🔴 **Configuration Drift** | Each app has its own config, causing inconsistent styling |
| 🔴 **Maintenance Overhead** | Design token changes require updates across all apps |
| 🔴 **No Single Source of Truth** | Can't ensure unified design system |
| 🔴 **Wasted Resources** | Longer install times, larger builds, redundant processing |

---

## ✅ The Solution: Centralized Configuration

This template centralizes **all** Tailwind CSS dependencies and configuration in a **single shared package**:

```
Only packages/tailwind-config/package.json has tailwindcss
         ↓
All apps import from @workspace/tailwind-config
         ↓
Result: One installation, infinite reusability
```

### Architecture at a Glance

```
┌─────────────────────────────────────────────────────────┐
│  @workspace/tailwind-config (SINGLE SOURCE)             │
│  • Contains: tailwindcss, @tailwindcss/postcss          │
│  • Exports: base.css, postcss.config.mjs                │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┼─────────┬──────────┐
        ↓         ↓         ↓          ↓
     app/web  app/demo  app/storybook  packages/ui
     (imports) (imports) (imports)   (imports)
     
     ✅ No tailwindcss in dependencies
     ✅ Full Tailwind class support
     ✅ Consistent design system
```

---

## 🔍 How It Works: The Magic Behind Zero Dependencies

**Key Question:** How do Tailwind classes work in apps that don't have `tailwindcss` installed?

### Answer: CSS Imports + PostCSS Processing

#### 1. **The tailwind-config Package**

```json
// packages/tailwind-config/package.json
{
  "name": "@workspace/tailwind-config",
  "exports": {
    "./base.css": "./src/base.css",       // ← Exports compiled CSS
    "./postcss": "./postcss.config.mjs"   // ← Exports PostCSS config
  },
  "dependencies": {
    "tailwindcss": "^4.1.18",            // ✅ ONLY place with tailwindcss
    "@tailwindcss/postcss": "^4.1.18"
  }
}
```

#### 2. **Apps Import the CSS**

```css
/* apps/web/app/globals.css */
@import "@workspace/tailwind-config/base.css";  /* ← Imports processed Tailwind */

/* Tell Tailwind which files to scan */
@source "../../**/*.{ts,tsx}";                  /* ← Scans app files for classes */
@source "../../../packages/ui/src/**/*.{ts,tsx}"; /* ← Scans UI components */
```

#### 3. **Apps Reference the PostCSS Config**

```javascript
// apps/web/postcss.config.mjs
export { default } from "@workspace/tailwind-config/postcss";  // ← Uses shared config
```

#### 4. **Build Process**

```
Developer writes: <div className="flex items-center gap-4">
                               ↓
App's PostCSS sees: @import "@workspace/tailwind-config/base.css"
                               ↓
Resolves to: packages/tailwind-config/src/base.css
                               ↓
Tailwind PostCSS plugin processes @source directives
                               ↓
Scans app files for: "flex", "items-center", "gap-4"
                               ↓
Generates CSS: .flex { display: flex; }
                               ↓
Result: Full Tailwind classes work WITHOUT tailwindcss in app deps! ✨
```

---

## 🏗️ Architecture Deep Dive

### 📦 Package Structure

```
poc-tailwind-config/
├── packages/
│   └── tailwind-config/          🎨 CORE PACKAGE
│       ├── src/
│       │   └── base.css          # Tailwind imports + design tokens
│       ├── postcss.config.mjs    # PostCSS configuration
│       └── package.json          # ⭐ Only file with tailwindcss dep
│
├── apps/
│   ├── web/                      🌐 Next.js App #1
│   │   ├── app/
│   │   │   ├── globals.css       # Imports tailwind-config
│   │   │   └── layout.tsx        # Imports globals.css
│   │   ├── postcss.config.mjs    # References tailwind-config
│   │   └── package.json          # ❌ NO tailwindcss dependency
│   │
│   ├── demo/                     🌐 Next.js App #2
│   │   └── (same structure)      # ❌ NO tailwindcss dependency
│   │
│   └── storybook/                📚 Storybook
│       └── (same structure)      # ❌ NO tailwindcss dependency
│
└── packages/ui/                  🧩 Shared Components
    └── package.json              # ❌ NO tailwindcss dependency
```

**Notice:** Only `tailwind-config/package.json` has `tailwindcss` installed. Everything else imports from it.

---

### 🎯 The Core: tailwind-config Package

#### `packages/tailwind-config/src/base.css`

```css
/**
 * This file is the SINGLE SOURCE for all Tailwind CSS in the monorepo
 */

@import "tailwindcss";            /* ← Imports Tailwind v4 */
@import "tw-animate-css";         /* ← Animation utilities */

/* Custom dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Design Tokens - Light Theme */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... all shadcn/ui tokens ... */
}

/* Design Tokens - Dark Theme */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark overrides ... */
}

/* Map CSS variables to Tailwind utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* Enables: bg-background, text-foreground, bg-primary, etc. */
}

/* Global base styles */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

#### `packages/tailwind-config/postcss.config.mjs`

```javascript
const config = {
  plugins: { 
    "@tailwindcss/postcss": {}  /* ← Tailwind v4 PostCSS plugin */
  },
};
export default config;
```

---

### 🌐 App-Level Configuration

Each app has minimal configuration:

#### `apps/web/app/globals.css`

```css
/* Import the shared Tailwind base */
@import "@workspace/tailwind-config/base.css";

/* Tell Tailwind which files to scan for class names */
@source "../../**/*.{ts,tsx}";                    /* This app's files */
@source "../../../packages/ui/src/**/*.{ts,tsx}"; /* UI components */
```

#### `apps/web/postcss.config.mjs`

```javascript
/* Use the shared PostCSS configuration */
export { default } from "@workspace/tailwind-config/postcss";
```

#### `apps/web/app/layout.tsx`

```tsx
import "./globals.css"  // Import your app's globals

export default function RootLayout({ children }) {
  return <html>{children}</html>
}
```

#### `apps/web/package.json`

```json
{
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*",  // ✅ Reference shared config
    "react": "^19.2.4",
    "next": "16.1.6"
    // ❌ NO "tailwindcss" here!
  }
}
```

**That's it!** Now all Tailwind classes work in this app:

```tsx
export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 rounded-lg border border-border bg-card shadow-lg">
        <h1 className="text-2xl font-bold text-foreground">
          Hello World
        </h1>
        <p className="text-muted-foreground mt-2">
          All Tailwind classes work! ✨
        </p>
      </div>
    </div>
  )
}
```

---

## 🚀 Scalability Benefits

### 1. **Horizontal Scaling: Add Apps Instantly**

Adding a new app requires **3 lines of configuration**:

```css
/* new-app/app/globals.css */
@import "@workspace/tailwind-config/base.css";
@source "../../**/*.{ts,tsx}";
```

```javascript
// new-app/postcss.config.mjs
export { default } from "@workspace/tailwind-config/postcss";
```

```json
// new-app/package.json
{ "dependencies": { "@workspace/tailwind-config": "workspace:*" } }
```

**Done.** The new app has:
- ✅ Full Tailwind CSS support
- ✅ All design tokens
- ✅ shadcn/ui compatibility
- ✅ Zero Tailwind installation overhead

### 2. **Vertical Scaling: Consistent Design System**

Update the design system **once**, applies to **all apps**:

```css
/* packages/tailwind-config/src/base.css */
:root {
  --primary: oklch(0.5 0.3 270);  /* Change primary to purple */
}
```

```bash
pnpm build  # Rebuild all apps
```

**Result:** All apps now use purple as primary color. No per-app changes needed.

### 3. **Resource Efficiency**

| Metric | Traditional Approach | Shared Config Approach |
|--------|---------------------|------------------------|
| `tailwindcss` installations | 1 per app (5 apps = 5x) | 1 total |
| Tailwind config files | 1 per app | 0 (centralized) |
| PostCSS config | 1 per app | 1 reference per app |
| Design token updates | Update N apps | Update 1 file |
| Bundle size overhead | Multiplied | Shared |
| Install time | Longer (redundant) | Faster (1 install) |

---

## 🔄 Reusability Benefits

### 1. **Component Library Integration**

The `@workspace/ui` package demonstrates perfect reusability:

```json
// packages/ui/package.json
{
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*",  // ← Shares same config
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^3.4.0"
    // ❌ NO tailwindcss - reuses parent config
  }
}
```

```tsx
// packages/ui/src/components/button.tsx
import { cn } from "../lib/utils"

export function Button({ variant, children }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-md",           // ← Tailwind classes work
      "bg-primary text-primary-foreground", // ← shadcn tokens work
      variant === "outline" && "border border-border bg-transparent"
    )}>
      {children}
    </button>
  )
}
```

All apps can import and use these components with **guaranteed consistent styling**:

```tsx
// apps/web/app/page.tsx
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return <Button>Click me</Button>  // ✅ Styles inherited from shared config
}
```

### 2. **Cross-App Consistency**

All apps use the **exact same** shadcn/ui design tokens:

```tsx
// Works identically in apps/web, apps/demo, apps/storybook
<div className="bg-background text-foreground border border-border">
  <div className="bg-primary text-primary-foreground">
    Primary action
  </div>
  <div className="bg-secondary text-secondary-foreground">
    Secondary content
  </div>
</div>
```

### 3. **Shared Utilities**

Utility classes work everywhere without configuration:

```tsx
// Spacing, layout, typography - all consistent
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Title</h2>
      <p className="text-muted-foreground">Description</p>
    </div>
  </div>
</div>
```

---

## 💡 Key Concepts
## 💡 Key Concepts

### Tailwind v4 `@source` Directive

The `@source` directive tells Tailwind which files to scan for class usage:

```css
@source "../../**/*.{ts,tsx}";  /* Scans all TypeScript/TSX files */
```

**How it works:**
1. PostCSS processes your CSS during build
2. Encounters `@source` directive
3. Scans specified files for Tailwind class names
4. Generates only the CSS for classes found in your code
5. Results in optimized, tree-shaken CSS bundles

**Example:**
```tsx
// Your component uses these classes:
<div className="flex items-center gap-4 bg-primary text-primary-foreground">

// Tailwind generates only:
.flex { display: flex; }
.items-center { align-items: center; }
.gap-4 { gap: 1rem; }
.bg-primary { background-color: var(--primary); }
.text-primary-foreground { color: var(--primary-foreground); }
```

---

### `@theme inline` - CSS Variable Mapping

Maps CSS variables to Tailwind utility classes:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
}
```

**Enables utilities like:**
- `bg-background` → `background-color: var(--background)`
- `text-foreground` → `color: var(--foreground)`
- `bg-primary` → `background-color: var(--primary)`
- `border-border` → `border-color: var(--border)`

**Why this matters:**
- ✅ Change one CSS variable, updates all utilities
- ✅ Supports runtime theme switching (light/dark mode)
- ✅ No rebuild needed for CSS variable changes
- ✅ Better than static color values

---

### Workspace Protocol

The `workspace:*` protocol links to local packages:

```json
{
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*"  // ← Links to local package
  }
}
```

**Benefits:**
- ✅ Changes to `tailwind-config` reflect immediately in dev mode
- ✅ No need to publish to npm for internal sharing
- ✅ Version management handled by workspace
- ✅ Builds are always in sync

---

### PostCSS Processing Flow

```
1. App imports globals.css
         ↓
2. globals.css has: @import "@workspace/tailwind-config/base.css"
         ↓
3. PostCSS resolves workspace package
         ↓
4. Finds: packages/tailwind-config/src/base.css
         ↓
5. Processes: @import "tailwindcss" (from the package's node_modules)
         ↓
6. Processes: @source directives (scans app files)
         ↓
7. Generates: Optimized CSS with only used classes
         ↓
8. Result: App has full Tailwind WITHOUT installing it
```

---

## 🎨 Customizing Design Tokens

### Centralized Updates

Edit `packages/tailwind-config/src/base.css`:

```css
:root {
  --primary: oklch(0.5 0.3 270);  /* Change primary to purple */
  --radius: 0.25rem;               /* Sharper corners */
  --font-sans: 'Inter', sans-serif; /* Change default font */
}
```

Rebuild all apps:
```bash
pnpm build
```

**All apps automatically use the new design tokens.** ✨

---

### Per-App Overrides (Optional)

If a specific app needs custom tokens:

```css
/* apps/custom-app/app/globals.css */
@import "@workspace/tailwind-config/base.css";

/* Override specific tokens for this app only */
:root {
  --primary: oklch(0.6 0.2 140);  /* Green primary for this app */
}

@source "../../**/*.{ts,tsx}";
```

---

## 🛠️ Development Workflow

### Install Dependencies

```bash
pnpm install
```

### Build All Packages

```bash
pnpm build
```

### Run Development Servers

```bash
# Web app (localhost:3000)
pnpm --filter=web dev

# Demo app (localhost:3000)
pnpm --filter=demo dev

# Storybook (localhost:6006)
pnpm --filter=storybook dev
```

### Test Tailwind Classes

Use any Tailwind class in your components:

```tsx
// Standard Tailwind utilities
<div className="flex items-center justify-between p-4 rounded-lg">

// Responsive utilities  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// shadcn/ui design tokens
<div className="bg-background text-foreground border border-border">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Click me
  </button>
</div>

// Dark mode variants
<div className="bg-white dark:bg-black text-black dark:text-white">
  Adapts to theme
</div>
```

All work automatically! ✨

---

## 🌗 Dark Mode Implementation

Dark mode uses the `.dark` class with a custom variant:

```css
/* In packages/tailwind-config/src/base.css */
@custom-variant dark (&:is(.dark *));
```

### Usage with next-themes

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// components/theme-toggle.tsx
"use client"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  
  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
    >
      Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  )
}
```

**All design tokens automatically adapt to dark mode!**

---

## 🔍 Troubleshooting

### Issue: Tailwind classes not applying

**Check:**
1. ✅ `@source` paths in `globals.css` are correct
2. ✅ PostCSS config references `@workspace/tailwind-config/postcss`
3. ✅ `@workspace/tailwind-config` in app's `package.json` dependencies
4. ✅ App imports `globals.css` in root layout

**Fix:**
```bash
# Clear Next.js cache
rm -rf apps/*/.next

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

---

### Issue: Build errors with PostCSS

**Check:**
1. ✅ `postcss.config.mjs` exists in app root
2. ✅ Config exports default from tailwind-config
3. ✅ No conflicting PostCSS plugins

**Fix:**
```javascript
// apps/your-app/postcss.config.mjs
export { default } from "@workspace/tailwind-config/postcss";  // Must be exact
```

---

### Issue: Design tokens not updating

**Solution:**
```bash
# Clear all build caches
pnpm clean

# Rebuild from scratch
pnpm install
pnpm build
```

---

### Issue: Dark mode not working

**Check:**
1. ✅ `suppressHydrationWarning` on `<html>` tag
2. ✅ `@custom-variant dark` in `base.css`
3. ✅ `.dark` class applied to parent element
4. ✅ Using `next-themes` or similar library

---

## 📊 Technical Advantages

### Single Dependency Model

| Aspect | Traditional | Shared Config |
|--------|------------|---------------|
| **Tailwind installations** | N apps × 1 | 1 total |
| **Config files** | N apps | 1 |
| **node_modules size** | Multiplied | Shared |
| **Update complexity** | Update N times | Update once |
| **Version consistency** | At risk | Guaranteed |
| **Design system drift** | High risk | Impossible |

---

### Performance Benefits

**Build Time:**
- ✅ Tailwind CSS processed once, imported everywhere
- ✅ Shared PostCSS configuration reduces overhead
- ✅ Parallel builds benefit from shared cache

**Runtime:**
- ✅ CSS variables enable theme switching without re-render
- ✅ Shared CSS chunks across apps in production
- ✅ No duplicate styles in bundles

**Developer Experience:**
- ✅ Change design token once, see everywhere instantly
- ✅ No confusion about which config to edit
- ✅ Auto-completion works consistently
- ✅ Less context switching between apps

---

## 🏆 Best Practices

### 1. Keep Design Tokens Semantic

```css
/* ✅ Good: Semantic naming */
--primary: oklch(0.5 0.3 270);
--muted-foreground: oklch(0.556 0 0);

/* ❌ Avoid: Color-specific names */
--purple-500: oklch(0.5 0.3 270);
--gray-600: oklch(0.556 0 0);
```

**Why?** Semantic names work with both light and dark themes.

---

### 2. Use CSS Variables Over Static Values

```tsx
/* ✅ Good: Uses design tokens */
<div className="bg-background text-foreground border-border">

/* ❌ Avoid: Hard-coded colors */
<div className="bg-white text-black border-gray-300">
```

**Why?** Design tokens adapt to themes automatically.

---

### 3. Leverage `@source` Efficiently

```css
/* ✅ Good: Scan relevant directories */
@source "../../app/**/*.{ts,tsx}";
@source "../../components/**/*.{ts,tsx}";

/* ❌ Avoid: Overly broad patterns */
@source "../../../../**/*.{ts,tsx}";  /* Scans entire monorepo */
```

**Why?** Faster builds, smaller CSS bundles.

---

### 4. Centralize Theme Updates

```css
/* ✅ Good: Update in tailwind-config/base.css */
:root {
  --primary: oklch(0.5 0.3 270);
}

/* ❌ Avoid: Update in individual apps */
```

**Why?** Ensures all apps stay in sync.

---

## 📚 Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Turborepo Guide](https://turbo.build/repo)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js + Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)

---

## 📄 License

MIT

---

**Built with:**
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Turborepo](https://turbo.build/repo)
- [pnpm workspaces](https://pnpm.io/workspaces)
