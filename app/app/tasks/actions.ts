"use server";

import {
  AddTaskForm,
  EditTaskForm,
  addTaskFormSchema,
  editTaskFormSchema,
} from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export const addTask = async ({
  name,
  description,
  duration,
  dueDate,
}: AddTaskForm) => {
  const supabase = await createClient();

  const data = addTaskFormSchema.safeParse({
    name,
    description,
    duration,
    dueDate,
  });

  if (!data.success) {
    return {
      error: data.error.flatten().fieldErrors,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not found" };

  const { error } = await supabase.from("tasks").insert({
    user_id: user.id,
    name: data.data.name,
    description: data.data.description,
    duration: data.data.duration ? `${data.data.duration} seconds` : undefined,
    due_date: data.data.dueDate || undefined,
  });

  if (error) {
    return {
      error: error.message,
    };
  }
};

export const editTask = async (
  taskId: number,
  { name, description, duration, dueDate, completed, pomodoroId }: EditTaskForm
) => {
  const supabase = await createClient();

  const data = editTaskFormSchema.safeParse({
    name,
    description,
    duration,
    dueDate,
    completed,
    pomodoroId,
  });

  if (!data.success) {
    return {
      error: data.error.flatten().fieldErrors,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };
  const { error } = await supabase
    .from("tasks")
    .update({
      name: data.data.name,
      description: data.data.description,
      duration: data.data.duration
        ? `${data.data.duration} seconds`
        : undefined,
      due_date: data.data.dueDate || undefined,
      completed: data.data.completed,
      pomodoro_id: data.data.pomodoroId || undefined,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);
  if (error) {
    return {
      error: error.message,
    };
  }
};

export const deleteTask = async (taskId: number) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not found" };

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return {
      error: error.message,
    };
  }
};
