"use client";

import { pomodoros } from "@/constants/testData";
import { PomodoroInfo, pomodoroSchema } from "@/interfaces";
import { arrayToMap } from "@/utils/arrayToMap";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const SetPomodoroStore = ({
  initialPomodoros,
}: {
  initialPomodoros: PomodoroInfo[];
}) => {
  const supabase = createClient();
  const {
    setPomodoros,
    setActiveId,
    setPomodoroLocal,
    removePomodoroLocal,
    remainingTime,
    isRunning,
    pomodoros,
  } = usePomodoroStore();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const fetchPomodoros = async () => {
      setPomodoros(arrayToMap(initialPomodoros, "id"));
      setActiveId(initialPomodoros[0]?.id || null);
    };

    fetchPomodoros();
  }, []);

  useEffect(() => {
    if (channel) {
      supabase.removeChannel(channel);
    }
    const pomodoroChannel = supabase
      .channel("pomodoros")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pomodoros",
        },
        (payload) => {
          setPomodoroLocal(payload.new.id, pomodoroSchema.parse(payload.new));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "pomodoros",
        },
        (payload) => {
          setPomodoroLocal(payload.new.id, pomodoroSchema.parse(payload.new));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "pomodoros",
        },
        (payload) => {
          removePomodoroLocal(payload.old.id);
        }
      )
      .subscribe();
    setChannel(pomodoroChannel);

    return () => {
      if (pomodoroChannel) {
        supabase.removeChannel(pomodoroChannel);
      }
    };
  }, []);

  // Loop audio if remainingTime is 0 and isRunning is true
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
