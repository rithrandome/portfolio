import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content";
import { brand } from "@/lib/brand";

// Shared layout for the link-preview images (what shows up when the site is pasted
// into LinkedIn, Slack or an email). Each page's opengraph-image.tsx just picks the
// words; this file draws them in the site's fonts and colours.

export const ogSize = { width: 1200, height: 630 };

// Fonts are read once at module load (as in the Next.js docs), which lets the
// images be generated at build time instead of on every request.
const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");
const [sansMedium, sansSemiBold, mono] = await Promise.all([
  readFile(join(fontDir, "geist-sans/Geist-Medium.ttf")),
  readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
  readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
]);

type OgCardProps = {
  /** small mono line above the title, e.g. "Case study" */
  eyebrow?: string;
  title: string;
  /** adds the accent-coloured full stop the hero headline has */
  period?: boolean;
  subtitle?: string;
  titleSize?: number;
};

export function ogCard({ eyebrow, title, period, subtitle, titleSize = 68 }: OgCardProps) {
  const host = new URL(site.url).host;
  const words = title.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: brand.background,
          color: brand.foreground,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Geist Mono", fontSize: 26 }}>
          <div style={{ display: "flex" }}>
            {site.name.toLowerCase()}
            <span style={{ color: brand.accent }}>/</span>
          </div>
          <div style={{ display: "flex", color: brand.muted, fontSize: 20, letterSpacing: 3 }}>
            {site.location.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && (
            <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 22, letterSpacing: 6, color: brand.accent }}>
              {eyebrow.toUpperCase()}
            </div>
          )}
          {/* one flex item per word, so the accent full stop stays attached to the
              last word instead of wrapping onto a line of its own */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: Math.round(titleSize * 0.22),
              maxWidth: 1000,
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            {words.map((word, i) => (
              <span key={i} style={{ display: "flex" }}>
                {word}
                {period && i === words.length - 1 && <span style={{ color: brand.accent }}>.</span>}
              </span>
            ))}
          </div>
          {subtitle && (
            <div style={{ display: "flex", maxWidth: 900, fontSize: 30, lineHeight: 1.4, color: brand.muted }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1.5px solid ${brand.line}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 500 }}>{site.fullName}</div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 22, color: brand.accent }}>{host}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sansMedium, weight: 500, style: "normal" },
        { name: "Geist", data: sansSemiBold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
