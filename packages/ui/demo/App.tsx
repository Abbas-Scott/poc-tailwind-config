import React, { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Heart,
  Mail,
  Download,
  Settings,
  Moon,
  Sun,
  Trash2,
  Plus,
  Check,
} from "lucide-react";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">UI Component Library</h1>
            <p className="text-muted-foreground">
              Built with React, TypeScript, Tailwind CSS, and Vite
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </div>

        {/* Button Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Button Variants</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
        </section>

        {/* Button Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Button Sizes</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* Buttons with Icons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Buttons with Icons</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap gap-4">
              <Button>
                <Mail />
                Email
              </Button>
              <Button variant="secondary">
                <Download />
                Download
              </Button>
              <Button variant="outline">
                <Plus />
                Add Item
              </Button>
              <Button variant="destructive">
                <Trash2 />
                Delete
              </Button>
              <Button variant="ghost">
                <Check />
                Complete
              </Button>
            </div>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Icon Buttons</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="icon-xs" variant="outline">
                <Heart />
              </Button>
              <Button size="icon-sm" variant="secondary">
                <Settings />
              </Button>
              <Button size="icon">
                <Download />
              </Button>
              <Button size="icon-lg" variant="ghost">
                <Plus />
              </Button>
            </div>
          </div>
        </section>

        {/* Button States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Button States</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap gap-4">
              <Button>Active</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline">Active Outline</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Interactive Demo</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Try clicking these buttons to see interactions:
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => alert("Default button clicked!")}>
                  Click Me
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert("Secondary action performed!")}
                >
                  <Settings />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert("Outline button clicked!")}
                >
                  <Plus />
                  Add New
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    confirm("Are you sure you want to delete?") &&
                    alert("Item deleted!")
                  }
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p>
            This is a demo application showcasing the UI component library. For
            more detailed documentation, run{" "}
            <code className="bg-muted px-2 py-1 rounded">pnpm storybook</code>
          </p>
        </footer>
      </div>
    </div>
  );
}
