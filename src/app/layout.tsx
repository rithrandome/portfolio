import type { Metadata } from "next";
// Geist ships its font files inside the npm package, so they're self-hosted:
// no request to Google at build time or when someone visits.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/motion-provider";
import { Nav } from "@/components/nav";
import { site } from "@/content";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is a server-side default; the inline script corrects it before
    // first paint, and suppressHydrationWarning tells React that's expected.
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <MotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
