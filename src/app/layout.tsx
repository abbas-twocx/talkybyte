import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import clsx from "clsx";
import Image from "next/image";

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
      <body className="overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
        <Footer />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (
    <header className="container shadow-lg shadow-primary/5 mx-auto py-[12px] px-[30px] bg-gradient-to-tl from-primary to-blue-600 mt-[12px] rounded-3xl backdrop-blur-md border border-primary/10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 leading-none">
        <PrismicNextLink
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          <PrismicText field={settings.data.siteTitle} />
        </PrismicNextLink>
        <nav>
          <ul className="flex flex-wrap gap-[6px] md:gap-[6px]">
            {navigation.data?.links.map((item) => (
              <li
                key={asText(item.label)}
                className="font-semibold tracking-tight text-white"
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
        <div className="w-full py-[12px] flex justify-between items-center">
          <div className="flex flex-col gap-[6px]">
            <span className="text-b16 text-dark-primary/80">Powered by</span>
            <Image
              alt="Swifty Byte Logo"
              width={180}
              height={120}
              src="/swiftybyte-logo.svg"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            {navigations.data.links && navigations.data.links.length > 0 && (
              <div className="flex flex-col lg:flex-row gap-[12px]">
                {navigations.data.links.map((link, index) => {
                  return (
                    <PrismicNextLink
                      key={index}
                      field={link.link}
                      className="text-xl font-semibold tracking-tight text-dark-primary/80 hover:text-primary duration-500 ease-in-out"
                    >
                      {" "}
                      <PrismicText field={link.label} />{" "}
                    </PrismicNextLink>
                  );
                })}
              </div>
            )}
            <p className="text-b16 text-dark-primary/80 text-end">
              © 2024 SwiftyByte
            </p>
          </div>
        </div>
      </Bounded>
    </footer>
  );
}
