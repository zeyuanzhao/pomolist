"use client";

import { TaskInfo, taskSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TaskRow } from "./TaskRow";

export const TasksList = ({
  initialTasks,
  pomodoroId,
}: {
  initialTasks?: TaskInfo[] | null;
  pomodoroId?: number | null;
}) => {
  const supabase = createClient();
  const [tasks, setTasks] = useState<TaskInfo[]>(initialTasks || []);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [mounted, setMounted] = useState(false);

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
            filter: pomodoroId ? `pomodoro_id=eq.${pomodoroId}` : undefined,
          },
          (payload) => {
            setTasks((prevTasks) => [
              ...prevTasks,
              taskSchema.parse(payload.new),
            ]);
          }
        )
        .subscribe()
    );

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [pomodoroId]);

  useEffect(() => {
    if (mounted && tasks) setMounted(true);
    const fetchTasks = async () => {
      const query = supabase.from("tasks").select("*");

      if (pomodoroId) {
        query.eq("pomodoro_id", pomodoroId);
      }
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data.map((task) => taskSchema.parse(task)));
      }
    };
    fetchTasks();
  }, [pomodoroId]);

  return (
    <div className="w-full h-full flex flex-col">
      {tasks?.map((task) => (
        <TaskRow task={task} key={task.id} />
      ))}
    </div>
  );
};
