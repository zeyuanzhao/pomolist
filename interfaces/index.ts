import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const signupSchema = z
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

export const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().nullish(),
  duration: z
    .number()
    .min(30, "Duration must be at least 30 seconds")
    .nullish(),
  dueDate: z.string().datetime({ offset: true }).nullish(),
});

export interface PomodoroInfo {
  id: string;
  name: string;
  duration: number;
  tasks: TaskInfo[];
}

export interface TaskInfo {
  id: string;
  name: string;
  completed: boolean;
  pomodoroId: string;
}

export interface Dimensions {
  width: number;
  height: number;
}
