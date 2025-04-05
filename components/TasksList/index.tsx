"use client";

import { TaskInfo } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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
            setTasks((prevTasks) => [...prevTasks, payload.new as TaskInfo]);
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
        setTasks(data as TaskInfo[]);
      }
    };
    fetchTasks();
  }, [pomodoroId]);

  return (
    <div>
      {tasks?.map((task) => (
        <div key={task.id} className="flex flex-row items-center">
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );
};
