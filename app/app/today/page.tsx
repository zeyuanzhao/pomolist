"use client";

import { PomodoroList } from "@/components/PomodoroList";
import { TasksList } from "@/components/TasksList";
import { UserError } from "@/components/UserError";
import { createClient } from "@/utils/supabase/client";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { Switch } from "@heroui/react";

const TodayPage = () => {
  const [hideAssignedTasks, setHideAssignedTasks] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
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
              <TasksList hideAssigned={hideAssignedTasks} />
            </ScrollShadow>
            <ScrollShadow className="max-w-lg w-full max-h-[calc(100vh-14rem)] p-6">
              <PomodoroList />
            </ScrollShadow>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TodayPage;
