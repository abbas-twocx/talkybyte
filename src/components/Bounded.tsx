import type { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: "div" | "section" | "header";
  yPadding?: "sm" | "base" | "lg" | "zero";
  collapsible?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Bounded({
  as: Comp = "div",
  yPadding = "base",
  collapsible = true,
  className,
  children,
}: BoundedProps) {
  return (
    <Comp
      data-collapsible={collapsible}
      className={clsx(
        "lg:px-[30px] px-[24px]",
        yPadding === "sm" && "py-8 md:py-[60px]",
        yPadding === "base" && "py-20 md:py-28",
        yPadding === "lg" && "py-32 md:py-48",
        yPadding === "zero" && "py-0 md:py-0",
        className,
      )}
    >
      <div className="mx-auto w-full container">{children}</div>
    </Comp>
  );
}
