import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { listProjects } from "@/features/projects/queries/get-projects-server";
import { ProjectProvider } from "@/features/projects/context/ProjectContext";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Collaboration Board",
  description: "A Collaboration Board for teams to work together on projects.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await listProjects();

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <ProjectProvider initialProjects={projects}>
          <Providers>{children};</Providers>
        </ProjectProvider>
      </body>
    </html>
  );
}
