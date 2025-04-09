"use server";

import { TasksList } from "@/components/TasksList";
import { UserError } from "@/components/UserError";
import { TaskInfo, taskSchema } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";

const TasksPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <UserError />;
  }

  return (
    <div className="flex-1 flex flex-row justify-center">
      <div className="flex-1 max-w-4xl pt-16 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
        </div>
        <div>
          <TasksList />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
