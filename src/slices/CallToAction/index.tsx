import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" yPadding="zero" className="">
        <div
          className="bg-gradient-to-tl from-primary to-blue-600 text-white text-balance flex flex-col 
        justify-center items-center text-center py-14 rounded-xl"
        >
          <PrismicRichText
            components={{
              paragraph: ({ children }) => (
                <p className="mb-7 last:mb-0 text-white text-b18">{children}</p>
              ),
            }}
            field={slice.primary.content}
          />
          <ButtonLink field={slice.primary.button_link}>
            {slice.primary.button_text}
          </ButtonLink>
        </div>
      </Bounded>
    </section>
  );
};

export default CallToAction;
