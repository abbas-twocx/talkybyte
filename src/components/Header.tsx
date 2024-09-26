import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client/richtext";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (
    <header className="container shadow-lg shadow-primary/5 mx-auto py-[12px] px-[30px] bg-gradient-to-tl lg:mt-[12px] rounded-3xl backdrop-blur-md border border-primary/10">
      <div className="flex flex-wrap items-center lg:justify-between justify-center gap-x-6 gap-y-3 leading-none">
        <Link href="/">
          <PrismicNextImage
            field={settings.data.site_logo}
            width={150}
            height={60}
            className=""
          />
        </Link>
        <nav>
          <ul className="flex flex-wrap gap-[6px] md:gap-[6px]">
            {navigation.data?.links.map((item) => (
              <li
                key={asText(item.label)}
                className="font-semibold tracking-tight text-dark-primary/70"
              >
                <PrismicNextLink
                  field={item?.link}
                  className="first:md-8 block px-3 text-b16 hover:text-primary duration-300 ease-in-out"
                  aria-current="page"
                >
                  <PrismicText field={item.label} />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
