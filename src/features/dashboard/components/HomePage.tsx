"use client";

import { SessionUser } from "@/features/auth/types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskBoard from "./TaskBoard";
import { ProjectMember, ProjectRole } from "@/features/memberships/types";
import { useEffect, useState } from "react";
import { useSelectedProject } from "../context/SelectedProjectContext";
import { getMembershipsByProjectId } from "@/features/memberships/get-members-by-project-id";
import { showError } from "@/lib/toast";
import { getMemberRoleOfProject } from "@/features/memberships/get-member-role-of-project";

interface HomePageProps {
  viewer: SessionUser;
}

export default function HomePage({ viewer }: HomePageProps) {
  // project related states
  const [userRole, setUserRole] = useState<ProjectRole | null>(null);
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);

  const { selectedProjectId, selectedProject } = useSelectedProject();

  useEffect(() => {
    if (!selectedProjectId) return;

    //set project members
    const fetchProjectMembers = async () => {
      console.log("Fetch");
      try {
        const result = await getMembershipsByProjectId(selectedProjectId);
        setProjectMembers([...result]);
      } catch (error) {
        showError("Error loading project members.");
      }
    };

    //set user role
    const fetchUserRole = async () => {
      try {
        const result = await getMemberRoleOfProject(
          selectedProjectId,
          viewer.id,
        );
        setUserRole(result);
      } catch (error) {
        showError("Error loading user role for project.");
      }
    };

    fetchUserRole();
    fetchProjectMembers();
  }, [selectedProjectId, viewer.id]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        userRole={userRole}
        projectMembers={projectMembers}
        selectedProjectTitle={selectedProject ? selectedProject.title : null}
      />
      <div className="flex flex-row flex-1">
        <Sidebar userId={viewer.id} userRole={userRole} />
        <TaskBoard userRole={userRole} projectMembers={projectMembers} />
      </div>
    </div>
  );
}
