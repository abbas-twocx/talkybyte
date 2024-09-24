import type { ReactNode } from "react";
import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children?: ReactNode;
};

export function Heading({
  as: Comp = "h1",
  size = "lg",
  children,
  className,
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-semibold leading-tight tracking-tight md:leading-tight",
        size === "xl" && "text-h1-m md:text-h1",
        size === "lg" && "text-h2-m md:text-h2",
        size === "md" && "text-h3-m md:text-h3",
        size === "sm" && "text-h4-m md:text-h4",
        className
      )}
    >
      {children}
    </Comp>
  );
}
