import { PomodoroInfo } from "@/interfaces";

export const PomodoroCard = ({ pomodoro }: { pomodoro: PomodoroInfo }) => {
  return <div>{pomodoro.name}</div>;
};
