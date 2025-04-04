"use server";

import { SideBar } from "@/components/SideBar";
import { TaskAdder } from "@/components/TaskAdder";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = (await headers()).get("x-next-pathname");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row w-screen h-screen text-ts">
      <SideBar />
      {children}
      <div className="absolute bottom-0 w-full pl-64 flex flex-row mb-6">
        <div className="flex-1 px-32 flex flex-row">
          <TaskAdder />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
