import { useProject } from "@/context/ProjectContext";
import InfoBlock from "./ui/InfoBlock";
import ProjectList from "./sidebar/ProjectList";
import { useState } from "react";
import CreateModalOpen from "./sidebar/CreateProjectModal";
import { SurfaceRow } from "./ui/surface/SurfaceItem";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const { userProjects } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const handleCreateProjectClick = () => {
    handleModalOpen(true);
  };

  return (
    <div className="flex flex-col px-2 py-4 min-w-[200px] gap-4 border-r-2 border-solid bg-main-2">
      <InfoBlock
        title="Actions"
        content={
          <SurfaceRow className="text-sm" onClick={handleCreateProjectClick}>
            <Plus size={16} />
            <span>Create Project</span>
          </SurfaceRow>
        }
      />
      <InfoBlock
        title="Projects"
        content={<ProjectList projects={userProjects} />}
      />
      {isModalOpen && (
        <CreateModalOpen onClose={() => handleModalOpen(false)} />
      )}
    </div>
  );
}
