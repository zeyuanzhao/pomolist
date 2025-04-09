"use server";

import { PomodoroList } from "@/components/PomodoroList";
import { TasksList } from "@/components/TasksList";
import { UserError } from "@/components/UserError";
import { taskSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

const TodayPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <UserError />;
  }

  let { data: initialTasks } = await supabase
    ?.from("tasks")
    .select("*")
    .filter("due_date", "eq", new Date().toISOString().split("T")[0]);

  if (initialTasks) {
    initialTasks = initialTasks?.map((task) => taskSchema.parse(task));
  }

  return (
    <div className="flex-1 flex flex-row justify-center">
      <div className="flex-1 max-w-4xl pt-16 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold mb-6">Today</h1>
        </div>
        <div className="flex-1 flex flex-row gap-x-2">
          <div className="flex-1">
            <TasksList initialTasks={initialTasks} />
          </div>
          <div className="flex-1">
            <PomodoroList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayPage;
