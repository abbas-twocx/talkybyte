import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

/**
 * Props for `Blogs`.
 */
export type BlogsProps = SliceComponentProps<Content.BlogsSlice>;

/**
 * Component for "Blogs" Slices.
 */
interface Category {
  id: string;
  type: string;
  tags: string[];
  lang: string;
  slug: string;
  first_publication_date: string;
  last_publication_date: string;
  uid: string;
  link_type: string;
  isBroken: boolean;
}

const Blogs = async ({ slice }: BlogsProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogs = await client.getAllByType("blog");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" yPadding="sm">
        <div className="flex lg:flex-row flex-col w-full">
          <div className="flex flex-col w-full">
            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText field={slice.primary.body} />
          </div>
          <div className="w-full"></div>
        </div>
        {blogs && blogs.length > 0 && (
          <div className="mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {blogs.map((blog, index) => {
              return (
                <PrismicNextLink
                key={index}
                  className="no-underline duration-500 ease-in-out"
                  href={`/blog/${blog.uid}`}
                >
                  <div
                    className="group rounded-lg p-4 border border-dark-primary/5 hover:shadow-xl duration-500 ease-in-out cursor-pointer"
                  >
                    <div className="w-full max-h-[260px] h-[260px] relative">
                      <PrismicNextImage
                        field={blog.data.image}
                        fill
                        className="object-cover object-center max-w-full w-full max-h-[260px] h-full rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col w-full mt-[12px]">
                      {blog.data.categories &&
                        blog.data.categories.length > 0 && (
                          <div className="flex flex-row flex-wrap gap-1">
                            {blog.data.categories.map((item, index) => {
                              const category = item.category as Category;
                              const capitalizWords = (str: string) => {
                                return str
                                  .split("-")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ");
                              };
                              return (
                                <>
                                  <span
                                    className="text-[12px] font-medium"
                                    key={index}
                                  >
                                    {capitalizWords(category.uid)}
                                  </span>
                                  <span className="last:hidden text-dark-primary/30 text-[12px]">
                                    |
                                  </span>
                                </>
                              );
                            })}
                          </div>
                        )}
                      <h6 className="text-h6-m lg:text-h6 tracking-tighter font-medium mt-[12px] text-balance leading-[120%]">
                        {blog.data.heading}
                      </h6>
                      <div className="flex flex-row gap-[8px] items-center mt-[8px]">
                        <PrismicNextImage
                          field={blog.data.author_image}
                          width={34}
                          height={34}
                        />
                        <div className="flex flex-col">
                          <span className="text-b14 text-dark-primary/70">
                            {blog.data.author}
                          </span>
                          <span className="text-b14 text-dark-primary/70">
                            {blog.data.date}
                          </span>
                        </div>
                      </div>
                      {/* <div className="line-clamp-3 text-ellipsis mt-[8px]">
                      <PrismicRichText field={blog.data.body} />
                    </div> */}
                      {/* after:absolute after:inset-0 after:w-full after:h-full */}
                      <BsArrowUpRightCircleFill
                        className="text-dark-primary self-end group-hover:text-primary group-hover:-translate-x-5 ease-in-out duration-500 mt-[12px]"
                        size={32}
                      />
                    </div>
                  </div>
                </PrismicNextLink>
              );
            })}
          </div>
        )}
      </Bounded>
    </section>
  );
};

export default Blogs;
