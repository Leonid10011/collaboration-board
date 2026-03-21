"use client";
import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useEffect, useState } from "react";
import DebugButton from "./DebugButton";
import {
  insertProject,
  insertTask,
  listProjects,
  listTasks,
} from "@/repository/repository";

type Project = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

export default function DebugPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("Default Project");
  const [taskTitle, setTaskTitle] = useState("Default Task");
  const [initialProjects, setInitialProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const run = async () => {
      const supabase = createSupabaseBrowserClient();

      const { data: session } = await supabase.auth.getSession();
      console.log("SessioN: ", session);

      const { data, error } = await supabase.auth.getUser();

      console.log({ data, error });
      setUserId(data.user?.id ?? null);

      const tmpProjects = await listProjects();

      setInitialProjects(tmpProjects);
      setSelectedProjectId(tmpProjects[0]?.id ?? null);
      console.log("selectedProjectId: ", tmpProjects[0]?.id ?? null);
    };
    run();
  }, []);

  const handleListTasks = async () => {
    const tasks = await listTasks();
    console.log("Tasks:", tasks);
  };

  const handleInsertTask = async () => {
    const task = await insertTask(taskTitle, userId!, selectedProjectId);
    console.log("Inserted task:", task);
  };

  const handleInsertProject = async () => {
    const project = await insertProject(projectTitle, userId!);
    console.log("Inserted project:", project);
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border p-2">
        Current User: {userId ?? "not logged in"}
      </div>
      <div className="flex flex-row gap-2 ">
        <span>Initial Projects:</span>
        {initialProjects.map((project) => (
          <span
            key={project.id}
            className={`border p-1 rounded hover:cursor-pointer ${project.id === selectedProjectId ? "bg-blue-200" : ""}`}
            onClick={() => handleProjectClick(project.id)}
          >
            {project.title}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <DebugButton title="List Tasks" onClick={handleListTasks} />
      </div>
      <div className="flex flex-col gap-2">
        <input
          className="border-1 p-1 rounded"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <DebugButton title="Insert Task" onClick={handleInsertTask} />
      </div>
      <div className="flex flex-col gap-2">
        <input
          className="border-1 p-1 rounded"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="Project Title"
        />
        <DebugButton title="Insert Project" onClick={handleInsertProject} />
      </div>
    </div>
  );
}
