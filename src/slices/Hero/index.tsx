import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps, JSXMapSerializer } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { PrismicRichText } from "@/components/PrismicRichText";
import ButtonLink from "@/components/ButtonLink";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h2" size="xl" className="mb-4 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),
};

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  const backgroundImage = slice.primary.backgroundImage;

  return (
    <section className="relative">
      <Bounded yPadding="base" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center lg:text-start">
          <div className="flex flex-col col-span-1">
            <div className="max-w-2xl text-dark-primary">
              <PrismicRichText
                field={slice.primary.text}
                components={components}
              />
            </div>
            {isFilled.link(slice.primary.buttonLink) && (
              <ButtonLink className="mt-6" field={slice.primary.buttonLink}>
                {slice.primary.buttonText || "Learn More"}
              </ButtonLink>
            )}
          </div>
          <div className="col-span-1 rounded-lg">
            {isFilled.image(backgroundImage) && (
              <PrismicNextImage
                field={backgroundImage}
                alt=""
                width={750}
                height={420}
                className="pointer-events-none select-none object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Hero;
