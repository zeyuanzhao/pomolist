"use client";

import { TaskInfo, taskSchema } from "@/interfaces";
import { arrayToMap } from "@/utils/arrayToMap";
import { useTaskStore } from "@/utils/stores/useTaskStore";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const SetTaskStore = ({
  initialTasks,
}: {
  initialTasks: TaskInfo[];
}) => {
  const supabase = createClient();
  const {
    setTasks,
    setTaskLocal,
    removeTaskLocal,
    addTask,
    deleteTask,
    editTask,
    tasks,
  } = useTaskStore();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    setTasks(arrayToMap(initialTasks, "id"));
  }, []);

  useEffect(() => {
    if (channel) {
      supabase.removeChannel(channel);
    }
    setChannel(
      supabase
        .channel("tasks")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "tasks",
          },
          (payload) => {
            setTaskLocal(payload.new.id, taskSchema.parse(payload.new));
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "tasks",
          },
          (payload) => {
            setTaskLocal(payload.new.id, taskSchema.parse(payload.new));
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "tasks",
          },
          (payload) => {
            removeTaskLocal(payload.old.id);
          }
        )
        .subscribe()
    );

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return null;
};
