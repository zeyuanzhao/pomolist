"use client";

import { PomodoroInfo } from "@/interfaces";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { LuMaximize2 } from "react-icons/lu";
import { PomodoroDropdown } from "./PomodoroDropdown";
import { useState } from "react";
import { pomodoros as pomodorosTestData } from "@/constants/testData";
import { arrayToMap } from "@/utils/arrayToMap";
import {
  IoArrowBackOutline,
  IoPauseOutline,
  IoPlayOutline,
  IoPlaySkipForwardOutline,
  IoReloadOutline,
  IoReturnUpBackOutline,
} from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";
import { secondsToTime } from "@/utils/secondsToTime";
import { TasksList } from "@/components/TasksList";

const PomodoroPage = () => {
  const {
    pomodoros,
    activeId,
    setActiveId,
    remainingTime,
    isRunning,
    start,
    pause,
    reset,
    complete,
  } = usePomodoroStore();

  return (
    <div className="bg-bgp flex flex-col flex-1 text-tp">
      <div className="h-16 px-4 flex flex-row items-center justify-between">
        <div>
          <PomodoroDropdown
            pomodoros={pomodoros}
            currentPomodoro={activeId}
            setCurrentPomodoro={setActiveId}
            triggerClassName="bg-bgs/20 text-tp"
          />
        </div>
        <div>
          <Button
            isIconOnly
            className="rounded-lg bg-transparent border-0 text-tp hover:bg-hover/25"
          >
            <LuMaximize2 size={"1.5em"} />
          </Button>
        </div>
      </div>
      <div className="h-64 flex flex-col items-center justify-between">
        <p className="text-[180px] leading-none">
          {secondsToTime(remainingTime)}
        </p>
        <div className="w-[400px] h-16 flex flex-row items-center justify-center gap-x-8">
          {!isRunning ? (
            <Button
              isIconOnly
              className="rounded-lg bg-transparent border-0 text-tp hover:bg-hover/25"
              onPress={start}
            >
              <IoPlayOutline size={"1.5em"} />
            </Button>
          ) : (
            <Button
              isIconOnly
              className="rounded-lg bg-transparent border-0 text-tp hover:bg-hover/25"
              onPress={pause}
            >
              <IoPauseOutline size={"1.5em"} />
            </Button>
          )}
          <Button
            isIconOnly
            className="rounded-lg bg-transparent border-0 text-tp hover:bg-hover/25"
            onPress={reset}
          >
            <IoReloadOutline size={"1.5em"} />
          </Button>
          <Button
            isIconOnly
            className="rounded-lg bg-transparent border-0 text-tp hover:bg-hover/25"
            onPress={complete}
          >
            <IoPlaySkipForwardOutline size={"1.5em"} />
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full">
          <TasksList pomodoroId={activeId} />
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage;
