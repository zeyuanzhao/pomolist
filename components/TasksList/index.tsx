"use client";

import { AddPomodoroTask } from "./AddPomodoroTask";
import { TaskRow } from "./TaskRow";
import { RemovableTaskRow } from "./RemovableTaskRow";
import { useTaskStore } from "@/utils/stores/useTaskStore";

export const TasksList = ({
  pomodoroId,
  hideAssigned = false,
}: {
  pomodoroId?: number | null;
  hideAssigned?: boolean;
}) => {
  const { tasks } = useTaskStore();
  return (
    <div className="w-full h-full flex flex-col">
      {tasks &&
        Array.from(tasks).map(([taskId, task]) => {
          // If we're showing tasks for a specific pomodoro, only show those
          if (pomodoroId && task.pomodoroId !== pomodoroId) {
            return null;
          }

          // If hideAssigned is true, hide tasks that have been assigned to a pomodoro
          if (!pomodoroId && hideAssigned && task.pomodoroId) {
            return null;
          }

          // Use RemovableTaskRow for tasks in a pomodoro, and regular TaskRow for tasks in the main list
          return pomodoroId ? (
            <RemovableTaskRow task={task} key={taskId} />
          ) : (
            <TaskRow task={task} key={taskId} />
          );
        })}
      {pomodoroId && <AddPomodoroTask />}
    </div>
  );
};
