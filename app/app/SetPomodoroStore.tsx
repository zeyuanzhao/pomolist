"use client";

import { PomodoroInfo } from "@/interfaces";
import { arrayToMap } from "@/utils/arrayToMap";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";
import { useEffect } from "react";

export const SetPomodoroStore = ({
  pomodoros,
}: {
  pomodoros: PomodoroInfo[];
}) => {
  const { setPomodoros, setActiveId } = usePomodoroStore();

  useEffect(() => {
    const fetchPomodoros = async () => {
      setPomodoros(arrayToMap(pomodoros, "id"));
      setActiveId(pomodoros[0]?.id || null);
    };

    fetchPomodoros();
  }, []);

  return null;
};
