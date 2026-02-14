# @workspace/storybook

Storybook application for the UI component library in this Turborepo monorepo.

## Overview

This is a dedicated Storybook app that provides interactive documentation for all components in the `@workspace/ui` package. It's configured to automatically discover and display all stories from the UI package.

## Development

Start the Storybook development server:

```bash
# From the root of the monorepo
pnpm dev --filter=@workspace/storybook

# Or using turbo directly
turbo dev --filter=@workspace/storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006).

## Building

Build the static Storybook site:

```bash
# From the root
pnpm build --filter=@workspace/storybook

# Or
turbo build --filter=@workspace/storybook
```

The built static site will be in the `storybook-static/` directory.

## Preview

Preview the built Storybook:

```bash
cd apps/storybook
pnpm preview
```

## Structure

```
apps/storybook/
├── .storybook/          # Storybook configuration
│   ├── main.ts          # Main config - story discovery, addons
│   └── preview.tsx      # Preview config - decorators, themes
├── stories/             # Documentation and example stories
│   └── Introduction.mdx # Welcome page
├── package.json
├── tsconfig.json
└── eslint.config.js
```

## Story Discovery

Storybook is configured to discover stories from two locations:

1. **Local stories**: `./stories/**/*.stories.@(js|jsx|ts|tsx)`
2. **UI package stories**: `../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)`

This means component stories can live alongside the components in the UI package, and Storybook will automatically pick them up.

## Adding Stories

### In the UI Package

Create stories next to your components:

```tsx
// packages/ui/src/components/my-component.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./my-component.js";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // your props
  },
};
```

### In the Storybook App

For documentation or composite examples:

```tsx
// apps/storybook/stories/Patterns.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@workspace/ui/components/button";

const meta: Meta = {
  title: "Patterns/Forms",
};

export default meta;

export const LoginForm: StoryObj = {
  render: () => (
    <form>
      {/* composition of multiple components */}
    </form>
  ),
};
```

## Configuration

### Theming

The app supports light and dark themes through a toolbar toggle. Theme switching is handled in [.storybook/preview.tsx](.storybook/preview.tsx).

### Aliases

The Vite configuration includes path aliases:
- `@workspace/ui` → `../../packages/ui/src`

This matches the monorepo structure and allows importing from the UI package naturally.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build static Storybook
- `pnpm preview` - Preview built Storybook
- `pnpm lint` - Lint stories and config

## Integration with Turborepo

This app is integrated into the Turborepo pipeline:

- `turbo dev` - Runs Storybook in watch mode
- `turbo build` - Builds Storybook for deployment
- `turbo lint` - Lints the Storybook app

The Storybook app depends on the `@workspace/ui` package, and Turbo ensures proper build ordering.
