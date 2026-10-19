import { hero, site } from "@/content";
import { ogCard, ogSize } from "@/lib/og-card";

// Link preview for the home page (and any page that doesn't define its own).
export const alt = `${site.fullName}: ${hero.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ title: hero.headline, period: true });
}
