"use client";

import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsolute,
  parseDate,
  toCalendarDate,
} from "@internationalized/date";
import { AddPomodoroTask } from "./AddPomodoroTask";
import { TaskRow } from "./TaskRow";
import { useTaskStore } from "@/utils/stores/useTaskStore";

export const TasksList = ({
  pomodoroId,
  hideAssigned = false,
  date,
}: {
  pomodoroId?: number | null;
  hideAssigned?: boolean;
  date?: string;
}) => {
  const { tasks } = useTaskStore();
  const filteredTasks = tasks
    ? Array.from(tasks).filter(([_, task]) => {
        if (pomodoroId && task.pomodoroId !== pomodoroId) return false;
        if (!pomodoroId && hideAssigned && task.pomodoroId) return false;
        if (
          !pomodoroId &&
          date &&
          task.dueDate &&
          parseDate(date).compare(
            toCalendarDate(parseAbsolute(task.dueDate, getLocalTimeZone()))
          ) < 0
        )
          return false;
        return true;
      })
    : [];

  const isEmpty = filteredTasks.length === 0;
  return (
    <div className="w-full h-full flex flex-col">
      {filteredTasks.map(([taskId, task]) => (
        <TaskRow task={task} key={taskId} inPomodoro={!!pomodoroId} />
      ))}

      {isEmpty && pomodoroId ? (
        <p>Drag tasks here to add.</p>
      ) : isEmpty ? (
        <p>No tasks available.</p>
      ) : null}
    </div>
  );
};
