"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { TaskDB, TasksState } from "../types";
import { mapTaskDBToTask } from "../mapper";

type Props = {
  projectId: string;
  setTasks: React.Dispatch<React.SetStateAction<TasksState>>;
};

export default function useRealTimeSync({ projectId, setTasks }: Props) {
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const channel = supabase
      .channel(`tasks-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          setTasks((prev) => {
            if (payload.eventType === "UPDATE") {
              const updateTask = mapTaskDBToTask(payload.new as TaskDB);

              if (!prev.byId[updateTask.id]) {
                return prev;
              }

              return {
                ...prev,
                byId: {
                  ...prev.byId,
                  [updateTask.id]: updateTask,
                },
              };
            }
            if (payload.eventType === "INSERT") {
              const insertedTask = mapTaskDBToTask(payload.new as TaskDB);

              if (prev.byId[insertedTask.id]) return prev;

              return {
                ...prev,
                byId: {
                  ...prev.byId,
                  [insertedTask.id]: insertedTask,
                },
                allIds: [...prev.allIds, insertedTask.id],
              };
            }
            if (payload.eventType === "DELETE") {
              const deletedId = payload.old.id as string;

              if (!prev.byId[deletedId]) return prev;

              const { [deletedId]: _, ...rest } = prev.byId;

              return {
                byId: rest,
                allIds: prev.allIds.filter((id) => id !== deletedId),
              };
            }
            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, setTasks]);
}
