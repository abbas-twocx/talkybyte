import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import {
  PrismicNextImage,
  PrismicNextLink,
  PrismicPreview,
} from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      </head>
      <body className="overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (
    <header className="container shadow-lg shadow-primary/5 mx-auto py-[12px] px-[30px] bg-gradient-to-tl mt-[12px] rounded-3xl backdrop-blur-md border border-primary/10">
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

async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigations = await client.getSingle("navigation");

  return (
    <footer>
      <Bounded yPadding="zero" className="bg-primary/5 mt-[32px]" as="div">
        <div className="w-full py-[12px] gap-[12px] flex justify-between items-center flex-col md:flex-row">
          <div className="flex flex-col gap-[6px] text-center md:text-start">
            <span className="text-b14 text-dark-primary/80">
              {settings.data.poweredby_text}
            </span>
            <PrismicNextImage
              field={settings.data.poweredby_logo}
              width={150}
              height={60}
              className=""
            />
          </div>
          <div className="flex flex-col gap-[6px] ">
            {navigations.data.links && navigations.data.links.length > 0 && (
              <div className="flex flex-row flex-wrap lg:flex-row gap-[12px]">
                {navigations.data.links.map((link, index) => {
                  return (
                    <PrismicNextLink
                      key={index}
                      field={link.link}
                      className="text-b16 font-semibold tracking-tight text-dark-primary/80 hover:text-primary duration-500 ease-in-out"
                    >
                      {" "}
                      <PrismicText field={link.label} />{" "}
                    </PrismicNextLink>
                  );
                })}
              </div>
            )}
            <p className="text-b14 text-dark-primary/80 lg:text-end text-center">
              {settings.data.copyright}
            </p>
          </div>
        </div>
      </Bounded>
    </footer>
  );
}
