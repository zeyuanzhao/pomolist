"use client";

import { TaskInfo, taskSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { TaskRow } from "./TaskRow";
import { useTaskStore } from "@/utils/stores/useTaskStore";

export const TasksList = ({ pomodoroId }: { pomodoroId?: number | null }) => {
  const { tasks } = useTaskStore();
  return (
    <div className="w-full h-full flex flex-col">
      {tasks &&
        Array.from(tasks).map(([taskId, task]) => (
          <TaskRow task={task} key={taskId} />
        ))}
    </div>
  );
};
