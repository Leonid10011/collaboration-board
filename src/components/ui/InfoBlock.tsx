import { cn } from "@/lib/utils";
import React from "react";

interface InfoBlock extends React.ComponentProps<"div"> {
  title: string;
  children: React.ReactNode;
}

/** This is a reusable component to show information.
 *   It shows a title followed by corresponding information inside a react component
 */

export default function InfoBlock({ className, title, children }: InfoBlock) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-xs font-bold hover:cursor-default">{title}</p>
      {children}
    </div>
  );
}
