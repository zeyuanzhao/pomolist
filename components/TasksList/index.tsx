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
  return (
    <div className="w-full h-full flex flex-col">
      {tasks &&
        Array.from(tasks).map(([taskId, task]) => {
          if (pomodoroId && task.pomodoroId !== pomodoroId) {
            return null;
          }

          if (!pomodoroId && hideAssigned && task.pomodoroId) {
            return null;
          }

          if (
            !pomodoroId &&
            date &&
            task.dueDate &&
            parseDate(date).compare(
              toCalendarDate(parseAbsolute(task.dueDate, getLocalTimeZone()))
            ) < 0
          ) {
            return null;
          }

          return <TaskRow task={task} key={taskId} inPomodoro={!!pomodoroId} />;
        })}
      {/* {pomodoroId && <AddPomodoroTask />} */}
    </div>
  );
};
