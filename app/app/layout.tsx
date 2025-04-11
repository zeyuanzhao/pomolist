"use server";

import { SideBar } from "@/components/SideBar";
import { TaskAdder } from "@/components/TaskAdder";
import { pomodoroSchema, taskSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SetPomodoroStore } from "./SetPomodoroStore";
import { SetTaskStore } from "./SetTaskStore";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = (await headers()).get("x-next-pathname");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let { data: pomodoros, error: errorPomodoros } = await supabase
    .from("pomodoros")
    .select("*")
    .eq("user_id", user.id);

  if (errorPomodoros) {
    console.error("Error fetching pomodoros:", errorPomodoros);
    return;
  }

  if (pomodoros) {
    pomodoros = pomodoros?.map((pomodoro) => pomodoroSchema.parse(pomodoro));
  }

  let { data: tasks, error: errorTasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);

  if (errorTasks) {
    console.error("Error fetching tasks:", errorTasks);
    return;
  }

  if (tasks) {
    tasks = tasks?.map((task) => taskSchema.parse(task));
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
      {pomodoros && <SetPomodoroStore initialPomodoros={pomodoros} />}
      {tasks && <SetTaskStore initialTasks={tasks} />}
    </div>
  );
};

export default AppLayout;
