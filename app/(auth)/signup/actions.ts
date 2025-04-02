"use server";

import { loginSchema, signupSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const data = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!data.success) {
    return {
      error: data.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signUp(data.data);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
