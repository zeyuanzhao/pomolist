"use client";

import { TaskRow } from "./TaskRow";
import { useTaskStore } from "@/utils/stores/useTaskStore";

export const TasksList = ({ pomodoroId }: { pomodoroId?: number | null }) => {
  const { tasks } = useTaskStore();
  return (
    <div className="w-full h-full flex flex-col">
      {tasks &&
        Array.from(tasks).map(([taskId, task]) => {
          if (task.pomodoroId !== pomodoroId) {
            return null;
          }
          return <TaskRow task={task} key={taskId} />;
        })}
    </div>
  );
};
