import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh bg-background">
      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg border border-border bg-card shadow-lg">
        <h1 className="text-2xl font-bold text-foreground">Hello World</h1>
        <p className="text-muted-foreground">Testing Tailwind + shadcn classes</p>
        <div className="flex gap-2">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <div className="mt-4 p-4 bg-primary text-primary-foreground rounded-md">
          All Tailwind and shadcn classes work! 🎉
        </div>
      </div>
    </div>
  )
}
