import { taskSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

export const addTask = async (formData: FormData) => {
  const supabase = await createClient();

  const data = taskSchema.safeParse({
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

  const { error } = await supabase.from("tasks").insert({
    name: data.data.name,
    description: data.data.description,
    duration: data.data.duration,
    due_date: data.data.dueDate,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

};
