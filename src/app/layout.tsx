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
import Header from "@/components/Header";

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      </head>
      <body className="">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
        <Footer />
        <Analytics />
      </body>
    </html>
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
