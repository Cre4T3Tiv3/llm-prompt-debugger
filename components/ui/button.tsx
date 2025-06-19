import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
  default: "bg-zinc-800 text-white hover:bg-zinc-700",
  outline: "border border-zinc-600 text-white hover:bg-zinc-700",
  ghost: "text-zinc-300 hover:bg-zinc-800/50",
};

const sizeVariants = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm",
  lg: "px-5 py-2.5 text-base",
  icon: "w-8 h-8 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          buttonVariants[variant],
          sizeVariants[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
