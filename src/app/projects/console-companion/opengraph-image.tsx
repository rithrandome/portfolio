import { consoleCompanion as study } from "@/content";
import { ogCard, ogSize } from "@/lib/og-card";

// Link preview for the Console Companion case study.
export const alt = `${study.title} case study`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Case study", title: study.title, subtitle: study.subtitle, titleSize: 84 });
}
