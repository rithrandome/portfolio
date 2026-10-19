import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

// The site's icon: the nav logo's "r/" in cream on a tobacco tile. Used by
// app/icon.tsx (browser tab) and app/apple-icon.tsx (iPhone home screen).
const mono = await readFile(
  join(process.cwd(), "node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.ttf"),
);

export function brandMark(px: number, { rounded = true } = {}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: brand.accent,
          borderRadius: rounded ? px * 0.22 : 0,
          color: brand.accentInk,
          fontFamily: "Geist Mono",
          fontWeight: 600,
          fontSize: px * 0.58,
          letterSpacing: -px * 0.06,
          paddingBottom: px * 0.05,
        }}
      >
        r/
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Geist Mono", data: mono, weight: 600, style: "normal" }],
    },
  );
}
