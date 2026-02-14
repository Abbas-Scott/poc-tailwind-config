import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.js";
import { Heart, Mail, Download, Settings } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    asChild: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail />
        Login with Email
      </>
    ),
  },
};

export const IconButton: Story = {
  args: {
    size: "icon",
    children: <Heart />,
  },
};

export const IconButtonSmall: Story = {
  args: {
    size: "icon-sm",
    children: <Settings />,
  },
};

export const IconButtonLarge: Story = {
  args: {
    size: "icon-lg",
    children: <Download />,
  },
};

export const SmallButton: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const ExtraSmallButton: Story = {
  args: {
    children: "XS Button",
    size: "xs",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <Button size="icon-xs">
          <Heart />
        </Button>
        <Button size="icon-sm">
          <Heart />
        </Button>
        <Button size="icon">
          <Heart />
        </Button>
        <Button size="icon-lg">
          <Heart />
        </Button>
      </div>
    </div>
  ),
};
