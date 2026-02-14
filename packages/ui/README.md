# @workspace/ui

A shadcn-based UI component library with Storybook documentation and Vite development preview.

## Features

- 🎨 Built with [shadcn/ui](https://ui.shadcn.com/) components
- 📚 Storybook for component documentation and testing
- ⚡ Vite for fast development and preview
- 🎭 Tailwind CSS v4 for styling
- 🌗 Light/Dark theme support
- 📦 TypeScript for type safety

## Getting Started

### Install Dependencies

```bash
pnpm install
```

## Available Scripts

### Development

#### Run Storybook (Recommended for development)

```bash
pnpm storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006) where you can:
- Browse all components
- Test different variants and states
- Switch between light and dark themes
- View component documentation

#### Run Vite Preview

```bash
pnpm dev
```

This will start a Vite development server on [http://localhost:3001](http://localhost:3001) with a demo application showcasing all components.

### Build

#### Build Storybook

```bash
pnpm build-storybook
```

Builds Storybook as a static site in `storybook-static/` directory.

#### Build Vite App

```bash
pnpm build
```

Builds the Vite application for production in `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

Preview the production build of the Vite application.

## Project Structure

```
packages/ui/
├── .storybook/          # Storybook configuration
│   ├── main.ts          # Main Storybook config
│   └── preview.tsx      # Preview settings and decorators
├── demo/                # Vite demo application
│   ├── App.tsx          # Main demo app component
│   └── main.tsx         # Vite entry point
├── src/
│   ├── components/      # UI components
│   │   ├── button.tsx
│   │   └── button.stories.tsx  # Storybook stories
│   ├── lib/            # Utility functions
│   │   └── utils.ts
│   ├── styles/         # Global styles
│   │   └── globals.css
│   └── hooks/          # Custom React hooks
├── index.html          # Vite HTML entry
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Package dependencies and scripts
```

## Adding New Components

1. Create your component in `src/components/[component-name].tsx`
2. Create a story file at `src/components/[component-name].stories.tsx`
3. Export your component in the package.json exports field (if needed for external use)

Example story structure:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { YourComponent } from "./your-component";

const meta: Meta<typeof YourComponent> = {
  title: "Components/YourComponent",
  component: YourComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {
    // your props
  },
};
```

## Using Components

### In the Monorepo

```tsx
import { Button } from "@workspace/ui/components/button";
import "@workspace/ui/globals.css";

function App() {
  return <Button>Click me</Button>;
}
```

## Theme Support

The components support light and dark themes. The theme can be toggled by adding/removing the `dark` class on the `<html>` element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

## Technologies Used

- React 19
- TypeScript 5
- Tailwind CSS 4
- Vite 6
- Storybook 8
- shadcn/ui components
- Radix UI primitives
- Lucide React icons

## License

Private package for workspace use.
