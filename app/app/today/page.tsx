"use client";

import { PomodoroList } from "@/components/PomodoroList";
import { TasksList } from "@/components/TasksList";
import { UserError } from "@/components/UserError";
import { createClient } from "@/utils/supabase/client";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState } from "react";
import { Switch } from "@heroui/react";
import { DragDropWrapper } from "@/components/DragDropWrapper";
import { getLocalTimeZone, today } from "@internationalized/date";

const TodayPage = () => {
  const [hideAssignedTasks, setHideAssignedTasks] = useState(false);

  return (
    <div className="flex-1 flex flex-row justify-center">
      <div className="flex-1 max-w-4xl pt-16 flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Today</h1>
          <div className="flex flex-row items-center gap-x-2">
            <label htmlFor="hideAssignedTasks" className="text-sm">
              Hide assigned tasks
            </label>
            <Switch
              id="hideAssignedTasks"
              isSelected={hideAssignedTasks}
              onValueChange={setHideAssignedTasks}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row gap-x-8 pt-8">
          <ScrollShadow className="max-w-lg w-full max-h-[calc(100vh-14rem)]">
            <DragDropWrapper>
              <TasksList
                hideAssigned={hideAssignedTasks}
                date={today(getLocalTimeZone()).toString()}
              />
            </DragDropWrapper>
          </ScrollShadow>
          <ScrollShadow className="max-w-lg w-full max-h-[calc(100vh-14rem)] p-6">
            <DragDropWrapper>
              <PomodoroList />
            </DragDropWrapper>
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
};

export default TodayPage;
