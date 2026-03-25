import React from "react";

type InfoBlock = {
  title: string;
  content: React.ReactNode;
};

export default function InfoBlock({ title, content }: InfoBlock) {
  return (
    <div className="flex flex-col gap-2">
      <h3>{title}</h3>
      {content}
    </div>
  );
}
