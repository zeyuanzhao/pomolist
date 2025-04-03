import { PomodoroInfo, TaskInfo } from "@/interfaces";

export const tasks: TaskInfo[] = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    pomodoroId: "1",
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
    pomodoroId: "1",
  },
  {
    id: "3",
    title: "Task 3",
    completed: false,
    pomodoroId: "2",
  },
];

export const pomodoros: PomodoroInfo[] = [
  {
    id: "1",
    title: "Pomodoro 1",
    duration: 25,
    tasks: [tasks[0], tasks[1]],
  },
  {
    id: "2",
    title: "Pomodoro 2",
    duration: 30,
    tasks: [tasks[2]],
  },
];
