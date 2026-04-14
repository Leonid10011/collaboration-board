import { useProject } from "@/context/ProjectContext";
import InfoBlock from "../../../components/ui/composed/InfoBlock";
import ProjectList from "../../projects/components/ProjectList";
import { useEffect, useMemo, useState } from "react";
import CreateModalOpen from "../../projects/components/CreateProjectModal";
import { SurfaceRow } from "../../../components/ui/surface/SurfaceItem";
import { Plus, View } from "lucide-react";
import { Project } from "@/features/projects/types";
import { listProjects } from "@/features/projects/queries/get-projects";
import { Membership } from "@/features/memberships/types";
import { getMembershipsByUserId } from "@/features/memberships/get-memberships-by-user-id";
import { showError } from "@/lib/toast";

type SidebarProps = {
  userId: string;
};

export default function Sidebar({ userId }: SidebarProps) {
  //const { userProjects } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [userMemberships, setUserMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const results = await listProjects();
      setProjects(results);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchMembershipsbyUserId = async () => {
      try {
        const result = await getMembershipsByUserId(userId);
        setUserMemberships(result);
      } catch (error) {
        showError("Error fetching memberships by user id.");
      }
    };

    fetchMembershipsbyUserId();
  }, [userId]);

  const userProjects = useMemo(() => {
    if (!userId) return [];

    const tmp = projects.filter((project) =>
      userMemberships.some((membership) => membership.projectId === project.id),
    );

    return tmp;
  }, [projects, userId, userMemberships]);

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
