import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-config";

const ROUTES: {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/sample", changeFrequency: "monthly", priority: 0.8 },
  { path: "/poc", changeFrequency: "monthly", priority: 0.85 },
  { path: "/poc/design", changeFrequency: "weekly", priority: 0.85 },
  { path: "/poc/pricing", changeFrequency: "monthly", priority: 0.75 },
  { path: "/poc/patterns", changeFrequency: "monthly", priority: 0.75 },
  { path: "/poc/sprint", changeFrequency: "monthly", priority: 0.75 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
