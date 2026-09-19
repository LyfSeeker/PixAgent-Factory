import type { Metadata } from "next";
import "./globals.css";
import "./retro.css";
import "./tasks.css";
import "./pixel-ui.css";
import "./palette.css";

export const metadata: Metadata = {
  title: "PixAgent Faactory | AI Software Studio",
  description: "A visual control center for AI software agents.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
