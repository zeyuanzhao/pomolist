import { PomodoroStore } from "@/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { timeStringToSeconds } from "../timeSeconds";
import { addPomodoro } from "@/app/app/pomodoro/actions";

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set, get) => ({
      pomodoros: null,
      setPomodoros: (data) => set({ pomodoros: data }),
      setPomodoroLocal: (id, data) => {
        set((state) => {
          const pomodoros = new Map(state.pomodoros);
          pomodoros.set(id, data);
          return { pomodoros };
        });
      },
      removePomodoroLocal: (id) => {
        set((state) => {
          const pomodoros = new Map(state.pomodoros);
          pomodoros.delete(id);
          return { pomodoros };
        });
      },
      addPomodoro: (pomodoro) => {
        return addPomodoro(pomodoro);
      },
      activeId: null,
      setActiveId: (id) => {
        set({ activeId: id });
        const { intervalId, pomodoros } = get();
        if (intervalId) {
          clearInterval(intervalId);
          set({ intervalId: null });
        }
        set({ isRunning: false });
        const pomodoro = id ? pomodoros?.get(id) : null;
        if (!pomodoro) return;
        const duration = timeStringToSeconds(pomodoro.duration);
        set({ remainingTime: duration });
      },
      isRunning: false,
      intervalId: null,
      setIntervalId: (id) => set({ intervalId: id }),
      remainingTime: null,
      setRemainingTime: (remainingTime) => set({ remainingTime }),
      start: () => {
        const { activeId, pomodoros, remainingTime } = get();
        const pomodoro = activeId ? pomodoros?.get(activeId) : null;
        if (!pomodoro) return;
        const duration =
          remainingTime || timeStringToSeconds(pomodoro.duration);
        set({ isRunning: true, remainingTime: duration });
        const intervalId = setInterval(() => {
          set((state) => {
            const newRemainingTime = state.remainingTime
              ? state.remainingTime - 1
              : 0;
            if (newRemainingTime <= 0) {
              clearInterval(state.intervalId!);
              return { remainingTime: 0 };
            }
            return { remainingTime: newRemainingTime };
          });
        }, 1000);
        set({ intervalId });
      },
      pause: () => {
        set({ isRunning: false });
        const { intervalId } = get();
        if (intervalId) {
          clearInterval(intervalId);
          set({ intervalId: null });
        }
      },
      reset: () => {
        set({ isRunning: false });
        const { activeId, pomodoros } = get();
        const pomodoro = activeId ? pomodoros?.get(activeId) : null;
        if (!pomodoro) return;
        const duration = timeStringToSeconds(pomodoro.duration);
        set({ remainingTime: duration });
        const { intervalId } = get();
        if (intervalId) {
          clearInterval(intervalId);
          set({ intervalId: null });
        }
      },
      complete: () => {
        set({ isRunning: false, remainingTime: 0 });
        const { intervalId } = get();
        if (intervalId) {
          clearInterval(intervalId);
          set({ intervalId: null });
        }
      },
    }),
    {
      name: "pomodoro-slices",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeId: state.activeId,
        remainingTime: state.remainingTime,
      }),
    }
  )
);
