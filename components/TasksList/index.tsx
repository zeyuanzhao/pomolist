"use client";

import { TaskInfo } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const TasksList = ({ initialTasks }: { initialTasks?: TaskInfo[] }) => {
  const supabase = createClient();
  const [tasks, setTasks] = useState<TaskInfo[]>(initialTasks || []);

  useEffect(() => {
    const channel = supabase
      .channel("tasks")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          setTasks((prevTasks) => [...prevTasks, payload.new as TaskInfo]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
