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
  const { setPomodoros, setActiveId, remainingTime, isRunning } =
    usePomodoroStore();

  useEffect(() => {
    const fetchPomodoros = async () => {
      setPomodoros(arrayToMap(pomodoros, "id"));
      setActiveId(pomodoros[0]?.id || null);
    };

    fetchPomodoros();
  }, []);

  // loop audio if remainingTime is 0 and isRunning is true
  useEffect(() => {
    if (remainingTime === 0 && isRunning) {
      const audio = new Audio("/audio/ringtone.mp3");
      audio.loop = true;
      audio.play();
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [remainingTime, isRunning]);

  return null;
};
