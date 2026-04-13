import { useProject } from "@/context/ProjectContext";
import InfoBlock from "../../../components/ui/composed/InfoBlock";
import ProjectList from "../../projects/components/ProjectList";
import { useState } from "react";
import CreateModalOpen from "../../projects/components/CreateProjectModal";
import { SurfaceRow } from "../../../components/ui/surface/SurfaceItem";
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
    <div className="flex flex-col px-page-inline py-4 w-sidebar gap-4 bg-main-2">
      <InfoBlock title="Actions">
        <SurfaceRow className="text-sm" onClick={handleCreateProjectClick}>
          <Plus size={16} />
          <span>Create Project</span>
        </SurfaceRow>
      </InfoBlock>
      <InfoBlock title="Projects">
        <ProjectList projects={userProjects} />
      </InfoBlock>
      {isModalOpen && (
        <CreateModalOpen onClose={() => handleModalOpen(false)} />
      )}
    </div>
  );
}
