import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "focus:ring-offset-3 text-b18 relative inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-primary px-[32px] py-[12px] text-white font-semibold outline-none ring-primary transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-primary after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-primary/40 hover:text-white after:hover:bg-opacity-15 focus:ring-2 hover:shadow-lg duration-500 ease-in-out",
        className
      )}
      {...restProps}
    />
  );
}
