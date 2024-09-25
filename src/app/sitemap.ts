import { createClient } from "@/prismicio";
import { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL || "https://talkybyte.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  const dynamicPages = await client.getAllByType("page");
  const dynamicBlogs = await client.getAllByType("blog");

  const pageRoutes = dynamicPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date().toISOString(),
  }));

  const blogRoutes = dynamicBlogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.uid}`,
    lastModified: new Date().toISOString(),
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  return [...pageRoutes, ...blogRoutes, ...staticRoutes];
}
