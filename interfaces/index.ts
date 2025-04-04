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
}));

export type TaskInfo = z.infer<typeof taskSchema>;

export interface PomodoroInfo {
  id: string;
  name: string;
  duration: number;
  tasks: TaskInfo[];
}

// export interface TaskInfo {
//   id: number;
//   userId: string;
//   name: string;
//   description?: string;
//   completed: boolean;
//   duration: number;
//   dueDate?: string;
//   createdDate?: string;
//   modifiedDate?: string;
//   pomodoroId?: string;
// }

export interface Dimensions {
  width: number;
  height: number;
}
