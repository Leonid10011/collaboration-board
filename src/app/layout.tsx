import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { ProjectProvider } from "@/context/ProjectContext";

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
    <html lang="en">
      <body>
        <ProjectProvider>
          <UserProvider>{children}</UserProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
