import { brandMark } from "@/lib/brand-mark";

// Browser-tab icon. Drawn large so it stays crisp; browsers scale it down.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return brandMark(size.width);
}
