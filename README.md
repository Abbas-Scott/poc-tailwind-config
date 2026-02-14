# Shared Tailwind Config - Monorepo Template

A production-ready monorepo template with centralized Tailwind CSS v4 configuration and shadcn/ui components, designed for scalable multi-app projects.

## 🎯 Why Shared Tailwind Config?

### The Problem

In traditional monorepos with multiple apps:
- Each app installs its own Tailwind CSS dependencies (bloated `node_modules`)
- Duplicated configuration across apps leads to inconsistent styling
- Design token changes require updates in multiple places
- Difficult to maintain a unified design system
- Package managers install multiple copies of the same dependencies

### The Solution

This template centralizes Tailwind CSS configuration in a **single shared package** (`@workspace/tailwind-config`) that:
- ✅ **Single source of truth** for all Tailwind dependencies
- ✅ **Unified design system** with consistent shadcn/ui tokens across all apps
- ✅ **Reduced bundle size** - Tailwind installed once, shared everywhere
- ✅ **Zero configuration** - Apps import CSS and work immediately
- ✅ **Easy maintenance** - Update design tokens in one place
- ✅ **Type-safe** - Full TypeScript support across the monorepo

---

## 📁 Project Structure

```
poc-tailwind-config/
├── apps/
│   ├── web/              # Main Next.js app
│   │   └── app/
│   │       ├── globals.css        # App-specific globals with @source
│   │       └── layout.tsx         # Imports ./globals.css
│   ├── demo/             # Demo Next.js app
│   │   └── app/
│   │       ├── globals.css        # App-specific globals with @source
│   │       └── layout.tsx
│   └── storybook/        # Storybook for UI components
│       └── .storybook/
│           ├── globals.css        # Storybook-specific globals
│           └── preview.tsx
│
├── packages/
│   ├── tailwind-config/  # 🎨 CORE: Shared Tailwind configuration
│   │   ├── src/
│   │   │   └── base.css           # Base Tailwind + shadcn tokens
│   │   ├── postcss.config.mjs     # PostCSS config
│   │   └── package.json           # Only place with Tailwind deps
│   │
│   └── ui/               # Shared React components
│       ├── src/
│       │   ├── components/        # shadcn/ui components
│       │   ├── lib/              # Utilities (cn, etc.)
│       │   └── styles/
│       │       └── globals.css   # UI package styles (for builds)
│       └── package.json          # Exports components only
│
└── package.json          # Root workspace config
```

---

## 🏗️ Architecture Breakdown

### 1. **`@workspace/tailwind-config` Package** (The Core)

**Purpose:** Centralized Tailwind CSS v4 configuration and design tokens.

**Key Files:**

#### `packages/tailwind-config/package.json`
```json
{
  "name": "@workspace/tailwind-config",
  "exports": {
    "./base.css": "./src/base.css",
    "./postcss": "./postcss.config.mjs"
  },
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "tailwindcss": "^4.1.18",
    "tw-animate-css": "^1.4.0"
  }
}
```

#### `packages/tailwind-config/src/base.css`
```css
@import "tailwindcss";
@import "tw-animate-css";

/* Custom dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Light & Dark theme CSS variables */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... all shadcn/ui design tokens ... */
}

.dark {
  --background: oklch(0.145 0 0);
  /* ... dark theme tokens ... */
}

/* Map CSS vars to Tailwind utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}

/* Global styles */
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
  plugins: { "@tailwindcss/postcss": {} },
};
export default config;
```

---

### 2. **App-Level Configuration**

Each app (web, demo, storybook) has:

#### `apps/web/app/globals.css`
```css
/* Import shared Tailwind config */
@import "@workspace/tailwind-config/base.css";

/* Scan this app's files for Tailwind classes */
@source "../../**/*.{ts,tsx}";
/* Include UI package components */
@source "../../../packages/ui/src/**/*.{ts,tsx}";
```

#### `apps/web/app/layout.tsx`
```tsx
import "./globals.css" // Import app-specific globals

export default function RootLayout({ children }) {
  return <html>{children}</html>
}
```

#### `apps/web/postcss.config.mjs`
```javascript
// Reference shared PostCSS config
export { default } from "@workspace/tailwind-config/postcss";
```

---

### 3. **UI Package Configuration**

The UI package is a **component library** that exports React components:

#### `packages/ui/package.json`
```json
{
  "name": "@workspace/ui",
  "exports": {
    "./lib/*": "./src/lib/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts"
  },
  "dependencies": {
    "@workspace/tailwind-config": "workspace:*",
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^3.4.0"
    // ... other deps, NO tailwindcss here
  }
}
```

#### `packages/ui/src/styles/globals.css`
```css
@import "@workspace/tailwind-config/base.css";

/* Only scan UI package files */
@source "../**/*.{ts,tsx}";
```

---

## 🚀 Benefits

### 1. **Single Dependency Installation**
- Tailwind CSS installed **once** in `tailwind-config` package
- All apps reference the shared package
- Reduced `node_modules` size and install time

### 2. **Consistent Design System**
- All shadcn/ui design tokens in one place
- Change `--primary` color once, applies everywhere
- No design drift between apps

### 3. **Zero Configuration**
- New apps just need:
  1. Add `@workspace/tailwind-config` to `package.json`
  2. Create `globals.css` importing base styles
  3. Add PostCSS config referencing shared config
- No complex Tailwind config files per app

### 4. **Tailwind v4 Features**
- **`@source` directive**: Automatic file scanning for classes
- **CSS-first configuration**: No `tailwind.config.js` needed
- **Native CSS variables**: Better performance and DX

### 5. **Type Safety**
- Centralized TypeScript configuration
- Shared ESLint rules
- Consistent across all packages

### 6. **Easy Maintenance**
- Update Tailwind once, all apps get the update
- Add new design tokens in base.css
- Modify animations/plugins in one location

---

## 🔄 How to Replicate in Your Project

### Step 1: Create the Tailwind Config Package

```bash
mkdir -p packages/tailwind-config/src
cd packages/tailwind-config
```

**`packages/tailwind-config/package.json`:**
```json
{
  "name": "@your-workspace/tailwind-config",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./base.css": "./src/base.css",
    "./postcss": "./postcss.config.mjs"
  },
  "files": ["src", "postcss.config.mjs"],
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "tailwindcss": "^4.1.18"
  }
}
```

**`packages/tailwind-config/src/base.css`:**
```css
@import "tailwindcss";

/* Add your design tokens here */
:root {
  --background: #ffffff;
  --foreground: #000000;
  /* ... your variables ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

**`packages/tailwind-config/postcss.config.mjs`:**
```javascript
const config = {
  plugins: { "@tailwindcss/postcss": {} },
};
export default config;
```

### Step 2: Configure Your Apps

**Add dependency to `apps/your-app/package.json`:**
```json
{
  "dependencies": {
    "@your-workspace/tailwind-config": "workspace:*"
  }
}
```

**Create `apps/your-app/app/globals.css`:**
```css
@import "@your-workspace/tailwind-config/base.css";

/* Scan your app's files */
@source "../../**/*.{ts,tsx}";
```

**Create `apps/your-app/postcss.config.mjs`:**
```javascript
export { default } from "@your-workspace/tailwind-config/postcss";
```

**Import in `apps/your-app/app/layout.tsx`:**
```tsx
import "./globals.css"
```

### Step 3: Install Dependencies

```bash
pnpm install
```

That's it! Your app now uses the shared Tailwind configuration.

---

## 📦 Using Components

### Import shadcn/ui Components

```tsx
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <div className="flex items-center gap-4 p-8">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
```

All Tailwind classes and shadcn/ui design tokens work automatically!

### Adding New Components

```bash
# From workspace root
pnpm dlx shadcn@latest add button -c apps/web
```

This places components in `packages/ui/src/components/`.

---

## 🎨 Customizing Design Tokens

Edit `packages/tailwind-config/src/base.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.5 0.3 270);  /* ← Change primary color */
  --radius: 0.5rem;                /* ← Change border radius */
}
```

Rebuild apps to apply changes:
```bash
pnpm build
```

---

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run dev servers
pnpm --filter=web dev       # Web app (localhost:3000)
pnpm --filter=demo dev      # Demo app (localhost:3000)
pnpm --filter=storybook dev # Storybook (localhost:6006)
```

---

## 📚 Key Concepts

### `@source` Directive (Tailwind v4)
Tells Tailwind which files to scan for class usage:
```css
@source "../../**/*.{ts,tsx}";
```

### `@theme inline`
Maps CSS variables to Tailwind utilities:
```css
@theme inline {
  --color-primary: var(--primary);
}
/* Enables: bg-primary, text-primary, etc. */
```

### Workspace Protocol
```json
"@workspace/tailwind-config": "workspace:*"
```
Links to local package instead of npm registry.

---

## 🔍 Troubleshooting

### Classes not applying?
1. Check `@source` paths in your `globals.css`
2. Ensure PostCSS config references shared config
3. Verify `@workspace/tailwind-config` in dependencies

### Build errors?
1. Run `pnpm install` at root
2. Build tailwind-config first: `pnpm --filter=@workspace/tailwind-config build`
3. Check PostCSS plugin is installed

### Dark mode not working?
1. Verify `@custom-variant dark` in `base.css`
2. Add `suppressHydrationWarning` to `<html>` tag
3. Use `next-themes` or similar for React apps

---

## 📄 License

MIT

## 🤝 Contributing

PRs welcome! This template demonstrates best practices for Tailwind CSS v4 in monorepos.

---

**Built with:**
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Turborepo](https://turbo.build/repo)
- [pnpm workspaces](https://pnpm.io/workspaces)
