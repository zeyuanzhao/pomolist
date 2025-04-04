"use server";

import { taskFormSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export const addTask = async (formData: FormData) => {
  const supabase = await createClient();

  const data = taskFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    dueDate: formData.get("dueDate"),
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
    duration: `${data.data.duration ?? 300} seconds`,
    due_date: data.data.dueDate,
  });

  if (error) {
    return {
      error: error.message,
    };
  }
};
