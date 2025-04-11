import { addTask, deleteTask, editTask } from "@/app/app/tasks/actions";
import { TaskStore } from "@/interfaces";
import { create } from "zustand";

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: null,
  setTasks: (data) => set({ tasks: data }),
  setTaskLocal: (id, task) => {
    set((state) => {
      const tasks = new Map(state.tasks);
      tasks.set(id, task);
      return { tasks };
    });
  },
  removeTaskLocal: (id) => {
    set((state) => {
      const tasks = new Map(state.tasks);
      tasks.delete(id);
      return { tasks };
    });
  },
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
