"use client";

import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";
import { PomodoroCard } from "./PomodoroCard";

export const PomodoroList = () => {
  const { pomodoros, activeId } = usePomodoroStore();

  return (
    <div className="flex-1 flex flex-col gap-y-4">
      {pomodoros &&
        Array.from(pomodoros).map(([id, pomodoro]) => {
          return <PomodoroCard key={id} pomodoro={pomodoro} />;
        })}
      <PomodoroCard />
    </div>
  );
};
