import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client/richtext";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = createClient();
    const settings = await client.getSingle("settings");

    if (!settings || !settings.data?.robots_text) {
      throw new Error("Robots data not found.");
    }

    const richTextContent = settings.data.robots_text;
    const robotsContent = asText(richTextContent);

    return new NextResponse(robotsContent, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error generating robots.txt", error);

    return new NextResponse("Error generating robots.txt", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
