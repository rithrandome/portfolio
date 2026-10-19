import { brandMark } from "@/lib/brand-mark";

// Icon for saving the site to an iPhone home screen. iOS rounds the corners
// itself, so the tile is drawn square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return brandMark(size.width, { rounded: false });
}
