import React from "react";

type InfoBlock = {
  title: string;
  content: React.ReactNode;
};

/** This is a reusable component to show information.
 *   It shows a title followed by corresponding information inside a react component
 */

export default function InfoBlock({ title, content }: InfoBlock) {
  return (
    <div className="flex flex-col gap-2">
      <h3>{title}</h3>
      {content}
    </div>
  );
}
