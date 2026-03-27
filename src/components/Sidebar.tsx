import { useProject } from "@/context/ProjectContext";
import InfoBlock from "./ui/InfoBlock";
import ProjectList from "./sidebar/ProjectList";

export default function Sidebar() {
  const { userProjects } = useProject();

  return (
    <div className="flex flex-col px-2 py-4 min-w-[200px] gap-4 border-r-2 border-solid bg-background">
      <InfoBlock
        title="Actions"
        content={
          <button
            className="px-2 py-4 bg-foreground rounded text-start hover:cursor-pointer"
            onClick={() => {
              console.log("Create Button onClick");
            }}
          >
            Create Project
          </button>
        }
      />
      <InfoBlock
        title="Projects"
        content={<ProjectList projects={userProjects} />}
      />
    </div>
  );
}
