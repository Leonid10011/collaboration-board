import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Collaboration Board",
  description: "A Collaboration Board for teams to work together on projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
