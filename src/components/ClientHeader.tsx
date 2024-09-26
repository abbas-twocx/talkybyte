"use client";

import { asText } from "@prismicio/client/richtext";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import { useState } from "react";
import { NavigationDocument, SettingsDocument } from "../../prismicio-types";

export default function ClientHeader({
  settings,
  navigation,
}: {
  settings: SettingsDocument;
  navigation: NavigationDocument;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="container transition-all duration-500 ease-in-out shadow-lg flex flex-col shadow-primary/5 mx-auto py-[12px] px-[30px] bg-gradient-to-tl mt-[12px] rounded-3xl backdrop-blur-md border border-primary/10">
      <div className="flex flex-wrap items-center lg:justify-between justify-center gap-x-6 gap-y-3 leading-none">
        <Link href="/">
          <PrismicNextImage
            field={settings.data.site_logo}
            width={150}
            height={60}
            className=""
          />
        </Link>
        <nav className="lg:flex hidden">
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
        <button onClick={() => setOpen(!open)}>Show</button>
      </div>
      <div className={`mt-[12px] duration-500 ease-in-out transition-all ${open ? "w-full h-fit" : "w-0 h-0"}`}>
        <nav className="lg:flex hidden">
          <ul className="flex flex-col">
            {navigation.data?.links.map((item) => (
              <li
                key={asText(item.label)}
                className="font-semibold tracking-tight text-dark-primary/70"
              >
                <PrismicNextLink
                  field={item?.link}
                  className="first:md-8 block px-3 py-2 text-b16 hover:text-primary duration-300 ease-in-out"
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
