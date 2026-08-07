import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outlineDark";
export type ButtonSize = "sm" | "md";

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none " +
  "active:translate-y-0";

// Sombra colorida (não cinza-padrão) para dar profundidade sem parecer o
// "card genérico com shadow-md" de todo template de IA.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-sage-600 to-sage-700 text-white " +
    "shadow-[0_1px_2px_rgba(20,29,22,0.2),0_6px_14px_-6px_rgba(61,92,71,0.65)] " +
    "hover:to-sage-800 hover:-translate-y-0.5 hover:shadow-[0_2px_6px_rgba(20,29,22,0.22),0_14px_22px_-8px_rgba(61,92,71,0.7)] " +
    "focus-visible:ring-sage-400 focus-visible:ring-offset-cream-50",
  secondary:
    "border border-cream-border bg-white text-ink-800 shadow-sm " +
    "hover:border-sage-400 hover:text-sage-800 hover:-translate-y-0.5 hover:shadow-md " +
    "focus-visible:ring-sage-300 focus-visible:ring-offset-cream-50",
  ghost:
    "text-ink-700 hover:bg-cream-100 focus-visible:ring-sage-300 focus-visible:ring-offset-cream-50",
  danger:
    "border border-red-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50 " +
    "focus-visible:ring-red-300 focus-visible:ring-offset-cream-50",
  outlineDark:
    "border border-ink-700 bg-transparent text-cream-100/90 " +
    "hover:border-ink-600 hover:bg-ink-900 hover:-translate-y-0.5 " +
    "focus-visible:ring-sage-500 focus-visible:ring-offset-ink-950",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function buttonClasses({ variant = "primary", size = "md", fullWidth, className }: ButtonClassOptions = {}) {
  return [BASE, VARIANT_STYLES[variant], SIZE_STYLES[size], fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, fullWidth, className, ...props },
  ref
) {
  return <button ref={ref} className={buttonClasses({ variant, size, fullWidth, className })} {...props} />;
});
