import { useState } from "react";
import InfoBlock from "../ui/InfoBlock";

export default function ProjectInfo() {
  //Will be replaced
  const [projectTitle, setProjectTitle] = useState<string>("Account Dashboard"); // example
  const [role, setRole] = useState<string>("Admin"); // will be propagated

  return (
    <InfoBlock
      title="Project Info"
      content={
        <div className="flex flex-row gap-4">
          <span className="text-green-600">{role}</span>
          <span className="text-meta">{projectTitle}</span>
        </div>
      }
    />
  );
}
