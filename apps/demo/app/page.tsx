"use client";

import { Button } from "@workspace/ui/components/button";
import { Moon, Sun, Palette, Zap, Code2, Package } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen mt-12 bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              @workspace/tailwind-config Demo
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Shared Tailwind Configuration
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Centralized design system using{" "}
              <code className="rounded bg-muted px-2 py-1 text-sm font-mono text-primary">
                @workspace/tailwind-config
              </code>{" "}
              for consistent styling across all packages and applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                View Docs
              </Button>
              <Button variant="ghost" size="lg">
                <Code2 className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          Key Features
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-card-foreground">
              Design Tokens
            </h4>
            <p className="text-muted-foreground">
              Centralized color palette using OKLCH color space for perceptually uniform colors.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
              <Zap className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-card-foreground">
              Zero Duplication
            </h4>
            <p className="text-muted-foreground">
              Single source of truth for all Tailwind configurations across the monorepo.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Code2 className="h-6 w-6 text-accent-foreground" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-card-foreground">
              Developer Experience
            </h4>
            <p className="text-muted-foreground">
              Easy integration with PostCSS and seamless theme switching support.
            </p>
          </div>
        </div>
      </section>

      {/* Button Variants Showcase */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
            shadcn/ui Button Component
          </h3>
          <div className="space-y-8">
            {/* Variants */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h4 className="mb-4 text-lg font-semibold text-card-foreground">
                Variants
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h4 className="mb-4 text-lg font-semibold text-card-foreground">
                Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* States */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h4 className="mb-4 text-lg font-semibold text-card-foreground">
                States
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button>Active</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tailwind Utilities Demo */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
          Tailwind Utility Classes
        </h3>
        <div className="space-y-6">
          {/* Colors */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-lg font-semibold text-card-foreground">
              Theme Colors
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-background border border-border" />
                <p className="text-xs text-muted-foreground">background</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-foreground" />
                <p className="text-xs text-muted-foreground">foreground</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-primary" />
                <p className="text-xs text-muted-foreground">primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-secondary" />
                <p className="text-xs text-muted-foreground">secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-accent" />
                <p className="text-xs text-muted-foreground">accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-destructive" />
                <p className="text-xs text-muted-foreground">destructive</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="mb-4 text-lg font-semibold text-card-foreground">
              Typography
            </h4>
            <div className="space-y-2">
              <p className="text-4xl font-bold">Heading 1</p>
              <p className="text-3xl font-bold">Heading 2</p>
              <p className="text-2xl font-bold">Heading 3</p>
              <p className="text-xl font-semibold">Heading 4</p>
              <p className="text-lg">Large text</p>
              <p className="text-base">Base text</p>
              <p className="text-sm text-muted-foreground">Small muted text</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS v4, and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
