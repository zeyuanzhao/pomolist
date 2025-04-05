"use client";

import { PomodoroInfo } from "@/interfaces";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { number } from "zod";

export const PomodoroDropdown = ({
  pomodoros,
  currentPomodoro,
  setCurrentPomodoro,
  triggerClassName,
}: {
  pomodoros?: Map<number, PomodoroInfo> | null;
  currentPomodoro?: number | null;
  setCurrentPomodoro: (pomo: number) => void;
  triggerClassName?: string;
}) => {
  return (
    <Dropdown>
      <DropdownTrigger className={triggerClassName}>
        <Button>
          {currentPomodoro
            ? pomodoros?.get(currentPomodoro)?.name
            : "Select Pomodoro"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        items={pomodoros || []}
        onAction={(key) => setCurrentPomodoro(Number(key))}
      >
        {([id, pomo]) => <DropdownItem key={id}>{pomo.name}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};
