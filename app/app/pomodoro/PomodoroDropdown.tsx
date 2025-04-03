"use client";

import { PomodoroInfo } from "@/interfaces";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

export const PomodoroDropdown = ({
  pomodoros,
  currentPomodoro,
  setCurrentPomodoro,
  triggerClassName,
}: {
  pomodoros: Map<string, PomodoroInfo>;
  currentPomodoro: string;
  setCurrentPomodoro: (pomo: string) => void;
  triggerClassName?: string;
}) => {
  return (
    <Dropdown>
      <DropdownTrigger className={triggerClassName}>
        <Button>{pomodoros.get(currentPomodoro)?.name}</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        items={pomodoros}
        onAction={(key) => setCurrentPomodoro(key as string)}
      >
        {([id, pomo]) => <DropdownItem key={id}>{pomo.name}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};
