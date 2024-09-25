import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import ButtonLink from "@/components/ButtonLink";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { BsFacebook } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import dynamic from "next/dynamic";

// const Socials = dynamic(() => import("./socials"), { ssr: false });

type Params = { uid: string };
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

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog", params.uid)
    .catch(() => notFound());

  const currentUrl = `https://talkybyte.com/blog/${params.uid}`;

  const blogBanner = page.data.image;
  const categories = page.data.categories;
  return (
    <>
      <section className="relative cursor-none pointer-events-none">
        <Bounded yPadding="sm" className="relative">
          <div className="flex flex-col w-full items-start justify-start text-balance gap-8 text-start">
            <div className="flex flex-col col-span-1 gap-[8px]">
              {categories && categories.length > 0 && (
                <div className="flex flex-row flex-wrap w-full gap-[12px]">
                  {categories.map((category, index) => {
                    const cat = category.category as Category;
                    const capitalizWords = (str: String) => {
                      return str
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");
                    };
                    return (
                      <div
                        key={index}
                        className="text-[12px] px-[8px] py-[4px] bg-gradient-to-bl rounded-full text-white from-blue-600 to-primary"
                      >
                        {capitalizWords(cat.uid)}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="max-w-full w-full text-dark-primary hover:text-primary">
                <h1 className="text-h1-m lg:text-h1 tracking-tighter mb-[12px] leading-[120%]">
                  {page.data.heading}
                </h1>
                <PrismicRichText field={page.data.body} />
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-row gap-[8px] items-center mt-[0px]">
                <PrismicNextImage
                  field={page.data.author_image}
                  width={34}
                  height={34}
                />
                <div className="flex flex-col">
                  <span className="text-b14 text-dark-primary/70">
                    {page.data.author}
                  </span>
                  <span className="text-b14 text-dark-primary/70">
                    {page.data.date}
                  </span>
                </div>
              </div>
              {/* <Socials
                url={currentUrl}
                title={page.data.meta_title || "Default Title"}
              /> */}
            </div>
            <div className="col-span-1 rounded-lg max-w-full w-full max-h-[420px] h-[420px]">
              {isFilled.image(blogBanner) && (
                <PrismicNextImage
                  field={blogBanner}
                  alt=""
                  width={750}
                  height={420}
                  className="pointer-events-none select-none object-cover rounded-lg max-w-full w-full max-h-[420px] h-[420px]"
                />
              )}
            </div>
          </div>
        </Bounded>
      </section>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
      siteName: "TalkyBye",
      url: "https://talkybyte.com",
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
