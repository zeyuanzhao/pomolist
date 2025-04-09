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
  const { setTasks, addTask, deleteTask, editTask, tasks } = useTaskStore();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(arrayToMap(initialTasks, "id"));
    };

    fetchTasks();
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
            const task = taskSchema.parse(payload.new);
            setTasks(new Map(tasks).set(task.id, task));
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
            const task = taskSchema.parse(payload.new);
            setTasks(new Map(tasks).set(task.id, task));
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
            const task = taskSchema.parse(payload.old);
            const newTasks = new Map(tasks);
            newTasks.delete(task.id);
            setTasks(newTasks);
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
