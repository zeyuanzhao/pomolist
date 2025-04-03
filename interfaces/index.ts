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

export interface PomodoroInfo {
  id: string;
  title: string;
  duration: number;
  tasks: TaskInfo[];
}

export interface TaskInfo {
  id: string;
  title: string;
  completed: boolean;
  pomodoroId: string;
}
