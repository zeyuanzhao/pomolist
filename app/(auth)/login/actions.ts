"use server";

import { loginFormSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const supabase = await createClient();

  const data = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!data.success) {
    return {
      error: data.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data.data);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/app");
};
