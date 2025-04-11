import { addTask, deleteTask, editTask } from "@/app/app/tasks/actions";
import { TaskStore } from "@/interfaces";
import { create } from "zustand";

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: null,
  setTasks: (data) => set({ tasks: data }),
  addTask: (task) => {
    return addTask(task);
  },
  editTask: (taskId, task) => {
    return editTask(taskId, task);
  },
  deleteTask: (taskId) => {
    return deleteTask(taskId);
  },
  removeTaskFromPomodoro: (taskId) => {
    return editTask(taskId, { pomodoroId: null });
  },
}));
