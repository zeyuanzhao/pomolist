"use server";

import { AddPomodoroForm, addPomodoroFormSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";

export const addPomodoro = async ({
  name,
  type,
  duration,
}: AddPomodoroForm) => {
  const supabase = await createClient();

  const data = addPomodoroFormSchema.safeParse({
    name,
    type,
    duration,
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

  const { error } = await supabase.from("pomodoros").insert({
    user_id: user.id,
    name: data.data.name,
    type: data.data.type,
    duration: data.data.duration ? `${data.data.duration} seconds` : undefined,
  });

  if (error) {
    return {
      error: error.message,
    };
  }
};
