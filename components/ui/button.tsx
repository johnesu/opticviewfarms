import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "forest"
  | "outline"
  | "outline-light"
  | "ghost"
  | "ghost-light";

type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 font-medium tracking-[0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink-800 text-sand-50 hover:bg-ink-700",
  forest: "bg-ink-800 text-sand-50 hover:bg-ink-700",
  outline:
    "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-sand-50",
  "outline-light":
    "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-sand-50",
  ghost: "px-0 text-ink-900 hover:text-bronze-600",
  "ghost-light": "px-0 text-ink-900 hover:text-bronze-600",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[12.5px]",
  md: "h-12 px-6 text-[13px]",
  lg: "h-[54px] px-7 text-[13.5px]",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-[13px] w-[13px] transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type NativeProps = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = LinkProps | NativeProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    variant === "ghost" || variant === "ghost-light" ? "h-auto px-0" : sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow ? <Arrow /> : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<NativeProps, keyof CommonProps>)}>
      {content}
    </button>
  );
}
