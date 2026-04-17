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
import { Task, TasksState } from "@/features/tasks/types";
import { ProjectsState } from "@/features/projects/types";

interface HomePageProps {
  viewer: SessionUser;
  projectId: string;
  tasksState: TasksState;
  initialTasks: Task[];
}

export default function HomePage({
  viewer,
  projectId,
  tasksState,
  initialTasks,
}: HomePageProps) {
  // project related states
  const [userRole, setUserRole] = useState<ProjectRole | null>(null);
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);

  const { selectedProject } = useSelectedProject();

  useEffect(() => {
    if (!projectId) return;

    //set project members
    const fetchProjectMembers = async () => {
      console.log("Fetch");
      try {
        const result = await getMembershipsByProjectId(projectId);
        setProjectMembers([...result]);
      } catch (error) {
        showError("Error loading project members.");
      }
    };

    //set user role
    const fetchUserRole = async () => {
      try {
        const result = await getMemberRoleOfProject(projectId, viewer.id);
        setUserRole(result);
      } catch (error) {
        showError("Error loading user role for project.");
      }
    };

    fetchUserRole();
    fetchProjectMembers();
  }, [projectId, viewer.id]);

  return (
    <div className="flex min-h-screen flex-col flex-1">
      <Header
        userRole={userRole}
        projectMembers={projectMembers}
        selectedProjectTitle={selectedProject ? selectedProject.title : null}
      />
      <div className="flex flex-row flex-1">
        <TaskBoard
          userRole={userRole}
          projectMembers={projectMembers}
          tasksState={tasksState}
          initialTasks={initialTasks}
        />
      </div>
    </div>
  );
}
