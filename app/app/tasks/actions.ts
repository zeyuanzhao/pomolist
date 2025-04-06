"use server";

import { TaskForm, taskFormSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export const addTask = async ({
  name,
  description,
  duration,
  dueDate,
}: TaskForm) => {
  const supabase = await createClient();

  const data = taskFormSchema.safeParse({
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
