"use server";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Test</h1>
      {children}
    </div>
  );
}
