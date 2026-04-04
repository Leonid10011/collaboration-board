import React from "react";

type InfoBlock = {
  title: string;
  children: React.ReactNode;
};

/** This is a reusable component to show information.
 *   It shows a title followed by corresponding information inside a react component
 */

export default function InfoBlock({ title, children }: InfoBlock) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold">{title}</p>
      {children}
    </div>
  );
}
