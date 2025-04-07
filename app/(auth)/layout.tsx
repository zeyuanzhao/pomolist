"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = (await headers()).get("x-next-pathname");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && !pathname?.includes("logout")) {
    redirect("/app");
  }

  return (
    <div className="flex flex-col w-screen h-screen text-s">{children}</div>
  );
};

export default AppLayout;
