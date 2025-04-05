import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const signupFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .superRefine(({ passwordConfirm: confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const taskFormSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().nullish(),
  duration: z
    .number()
    .min(30, "Duration must be at least 30 seconds")
    .nullish(),
  dueDate: z.string().datetime({ offset: true }).nullish(),
});

export const taskDbSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  completed: z.boolean(),
  duration: z.string(),
  due_date: z.string().datetime({ offset: true }).nullish(),
  created_date: z.string().datetime({ offset: true }).nullish(),
  modified_date: z.string().datetime({ offset: true }).nullish(),
  pomodoro_id: z.number().nullish(),
});

export const taskSchema = taskDbSchema.transform((task) => ({
  id: task.id,
  userId: task.user_id,
  name: task.name,
  description: task.description,
  completed: task.completed,
  duration: task.duration,
  dueDate: task.due_date,
  createdDate: task.created_date,
  modifiedDate: task.modified_date,
  pomodoroId: task.pomodoro_id,
}));

export type TaskInfo = z.infer<typeof taskSchema>;

export const pomodoroDbSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  order_index: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  completed: z.boolean(),
  type: z.string(),
  duration: z.string(),
  rating: z.number(),
  created_date: z.string().datetime({ offset: true }).nullish(),
  modified_date: z.string().datetime({ offset: true }).nullish(),
});

export const pomodoroSchema = pomodoroDbSchema.transform((pomodoro) => ({
  id: pomodoro.id,
  userId: pomodoro.user_id,
  orderIndex: pomodoro.order_index,
  name: pomodoro.name,
  description: pomodoro.description,
  completed: pomodoro.completed,
  type: pomodoro.type,
  duration: pomodoro.duration,
  rating: pomodoro.rating,
  createdDate: pomodoro.created_date,
  modifiedDate: pomodoro.modified_date,
}));

export type PomodoroInfo = z.infer<typeof pomodoroSchema>;

export interface Dimensions {
  width: number;
  height: number;
}

export type PomodoroType = "focus" | "shortBreak" | "longBreak";

export type PomodoroListSlice = {
  pomodoros: Map<string, PomodoroInfo> | null;
  setPomodoros: (data: Map<string, PomodoroInfo>) => void;
};

export type ActivePomodoroSlice = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  isRunning: boolean;
  intervalId: NodeJS.Timeout | null;
  setIntervalId: (id: NodeJS.Timeout | null) => void;
  remainingTime: number | null;
  setRemainingTime: (remainingTime: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  complete: () => void;
};

export type PomodoroStore = PomodoroListSlice & ActivePomodoroSlice;
