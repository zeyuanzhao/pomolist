import { addTask, deleteTask, editTask } from "@/app/app/tasks/actions";
import { TaskStore } from "@/interfaces";
import { data } from "framer-motion/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
}));
