"use client";
import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useEffect, useState } from "react";
import DebugButton from "./DebugButton";
import { insertProject, listTasks } from "@/repository/repository";

export default function DebugPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    const run = async () => {
      const supabase = createSupabaseBrowserClient();

      const { data: session } = await supabase.auth.getSession();
      console.log("SessioN: ", session);

      const { data, error } = await supabase.auth.getUser();

      console.log({ data, error });
      setUserId(data.user?.id ?? null);
    };
    run();
  }, []);

  const handleListTasks = async () => {
    const tasks = await listTasks();
    console.log("Tasks:", tasks);
  };

  const handleInsertProject = async () => {
    const porject = await insertProject(projectTitle, userId!);
    console.log("Inserted project:", porject);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border p-2">
        Current User: {userId ?? "not logged in"}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <DebugButton title="List Tasks" onClick={handleListTasks} />
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
