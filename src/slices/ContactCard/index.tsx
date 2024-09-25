import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";

/**
 * Props for `ContactCard`.
 */
export type ContactCardProps = SliceComponentProps<Content.ContactCardSlice>;

/**
 * Component for "ContactCard" Slices.
 */

const icons = {
  Call: <IoCallOutline size={64} />,
  Mail: <IoMailOutline size={64} />,
};

const ContactCard = ({ slice }: ContactCardProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" yPadding="zero" className="my-[24px]">
        <div
          className="bg-gradient-to-tl gap-4 from-primary to-blue-600 text-white flex lg:flex-row flex-col 
        justify-center items-center text-center py-14 px-[32px] rounded-xl lg:justify-start lg:items-start lg:ext-start"
        >
          <div className="flex flex-col lg:items-start items-center lg:text-start text-center w-full">
            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText
              components={{
                paragraph: ({ children }) => (
                  <p className="mb-7 mt-[-24px] last:mb-0 lg:max-w-[460px] max-w-full text-white text-b18">
                    {children}
                  </p>
                ),
              }}
              field={slice.primary.body}
            />
            <ButtonLink className="group" field={slice.primary.button_link}>
              {slice.primary.button_text}
            </ButtonLink>
          </div>
          <div className="w-full flex items-center lg:justify-end justify-center">
            {slice?.primary?.icon && (
              <div className="w-[120px] h-[120px] flex items-center justify-center rounded-full bg-slate-100/20 backdrop-blur-md p-4 text-3xl">
                {icons[slice?.primary?.icon]}
              </div>
            )}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default ContactCard;
