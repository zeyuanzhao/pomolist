"use server";

import { SideBar } from "@/components/SideBar";
import { TaskAdder } from "@/components/TaskAdder";
import { arrayToMap } from "@/utils/arrayToMap";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SetPomodoroStore } from "./SetPomodoroStore";
import { pomodoroSchema } from "@/interfaces";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = (await headers()).get("x-next-pathname");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let { data: pomodoros, error } = await supabase
    .from("pomodoros")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching pomodoros:", error);
    return;
  }

  if (pomodoros) {
    pomodoros = pomodoros?.map((pomodoro) => pomodoroSchema.parse(pomodoro));
  }

  return (
    <div className="flex flex-row w-screen h-screen text-ts">
      <SideBar />
      {children}
      <div className="absolute bottom-0 w-full pl-64 flex flex-row mb-6 invisible">
        <div className="flex-1 mx-32 flex flex-row visible">
          <TaskAdder />
        </div>
      </div>
      {pomodoros && <SetPomodoroStore pomodoros={pomodoros} />}
    </div>
  );
};

export default AppLayout;
