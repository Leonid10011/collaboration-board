"use client";
import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useEffect, useState } from "react";
import DebugButton from "./DebugButton";
import {
  deleteTask,
  insertProject,
  insertTask,
  listProjects,
  listTasks,
  updateTask,
} from "@/repository/repository";

type Project = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

export default function DebugPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("Default Project");
  const [taskTitle, setTaskTitle] = useState("Default Task");
  const [initialProjects, setInitialProjects] = useState<Project[]>([]);
  const [listedTasks, setListedTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
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
    setListedTasks(tasks);
    console.log("Tasks:", tasks);
  };

  const handleInsertTask = async () => {
    const task = await insertTask(taskTitle, userId!, selectedProjectId);
    if (task) {
      setListedTasks((prev) => [...prev, task]);
      console.log("Inserted task:", task);
    }
    console.log("Inserted task:", task);
  };

  const handleDeleteTask = async (taskId: string) => {
    const task = await deleteTask(taskId);
    setListedTasks((prev) => prev.filter((p) => p.id !== taskId));

    console.log("Deleted task:", task);
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    const updatedTask = await updateTask(taskId, updates);
    if (!updatedTask) {
      console.log("Failed to update task");
      return;
    }
    setListedTasks((prev) =>
      prev.map((t) => (t.id === taskId ? updatedTask : t)),
    );
    console.log("Updated task:", updatedTask);
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    console.log(
      "Clicked task ID:",
      taskId,
      "Selected task ID:",
      selectedTaskId,
    );
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
      <div className="flex flex-col gap-4 my-4">
        <div className="grid grid-cols-5 gap-2 p-2">
          {listedTasks.map((task) => (
            <div
              key={task.id}
              className={`border p-2 rounded bg-gray-100 hover:bg-gray-200 hover:cursor-pointer ${String(task.id) === String(selectedTaskId) ? "bg-blue-200" : ""}`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div>{task.title}</div>
              <br />
              <span>{task.id}</span>
              <br />
              <span className="text-green-600">{task.status}</span>
              <br />
              <span>{task.id === selectedTaskId ? " (SELECTED)" : ""}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <DebugButton
            title="Delete Selected Task"
            onClick={() => selectedTaskId && handleDeleteTask(selectedTaskId)}
          />
          <DebugButton
            title="Update Selected Task"
            onClick={() =>
              selectedTaskId &&
              handleUpdateTask(selectedTaskId, { status: "done" })
            }
          />
        </div>
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
