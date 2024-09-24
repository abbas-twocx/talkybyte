import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import ButtonLink from "@/components/ButtonLink";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  const backgroundImage = slice.primary.backgroundImage;

  return (
    <section className="relative">
      <Bounded yPadding="base" className="relative">
        <div className="w-full h-full absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/15 to-white -z-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center lg:justify-between text-balance gap-8 text-center lg:text-start">
          <div className="flex flex-col col-span-1">
            <div className="max-w-2xl text-dark-primary">
              <PrismicRichText field={slice.primary.text} />
              <PrismicRichText field={slice.primary.body} />
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
