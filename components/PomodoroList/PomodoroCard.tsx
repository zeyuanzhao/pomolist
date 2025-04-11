"use client";

import {
  AddPomodoroForm,
  DragItem,
  ItemTypes,
  PomodoroInfo,
  PomodoroType,
} from "@/interfaces";
import {
  secondsToTimeSimple,
  secondsToTimeString,
  timeSimple,
  timeStringToSeconds,
} from "@/utils/timeSeconds";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { TasksList } from "../TasksList";
import { TimeInput } from "@heroui/date-input";
import { PomodoroDropdown } from "@/app/app/pomodoro/PomodoroDropdown";
import { useEffect, useRef, useState } from "react";
import { PomodoroTypeDropdown } from "./PomodoroTypeDropdown";
import { parseTime } from "@internationalized/date";
import { addToast, Button, Form, ScrollShadow, useToast } from "@heroui/react";
import { IoAdd } from "react-icons/io5";
import { useDrop, useDragDropManager } from "react-dnd";
import { useTaskStore } from "@/utils/stores/useTaskStore";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";

export const PomodoroCard = ({ pomodoro }: { pomodoro?: PomodoroInfo }) => {
  const { editTask } = useTaskStore();
  const { addPomodoro } = usePomodoroStore();
  const [form, setForm] = useState<AddPomodoroForm>({
    name: "",
    type: "focus",
    duration: 1500,
  });
  const [errors, setErrors] = useState({});
  const ref = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  let dndAvailable = false;
  try {
    useDragDropManager();
    dndAvailable = true;
  } catch (e) {
    dndAvailable = false;
  }

  if (dndAvailable && pomodoro) {
    const [{ isOver: dragIsOver }, drop] = useDrop(
      () => ({
        accept: ItemTypes.TASK,
        drop: (item: DragItem) => {
          handleTaskDrop(item.id);
          return undefined;
        },
        collect: (monitor) => ({
          isOver: monitor.isOver() && monitor.canDrop(),
        }),
      }),
      [pomodoro]
    );

    useEffect(() => {
      setIsOver(dragIsOver);
    }, [dragIsOver]);

    drop(ref);
  }

  const handleTaskDrop = async (taskId: number) => {
    if (!pomodoro) return;

    try {
      const result = await editTask(taskId, {
        pomodoroId: pomodoro.id,
      });

      if (result?.error) {
        addToast({
          title: "Error",
          description: "Failed to assign task to pomodoro",
          color: "danger",
        });
      } else {
        addToast({
          title: "Success",
          description: "Task assigned to pomodoro",
          color: "success",
        });
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      addToast({
        title: "Error",
        description: "An unexpected error occurred",
        color: "danger",
      });
    }
  };

  return (
    <Form
      className="contents"
      action={async (formData) => {
        if (!form.name) {
          return;
        }
        const res = await addPomodoro(form);
        if (res?.error) {
          setErrors(res.error);
          return;
        }
      }}
      validationErrors={errors}
    >
      <Card
        className={`min-h-40 ${isOver ? "border-2 border-primary" : ""}`}
        ref={ref}
      >
        <CardHeader>
          <div className="flex flex-row flex-1 justify-between items-center gap-2">
            <div className="flex-1 flex flex-row justify-start">
              {pomodoro ? (
                <h3 className="text-2xl font-bold">{pomodoro.name}</h3>
              ) : (
                <Input
                  isRequired
                  errorMessage=""
                  className="flex-1"
                  placeholder="Name"
                  isInvalid={false}
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              )}
            </div>
            <div className="flex-1 flex flex-row justify-center">
              {pomodoro ? (
                <p>
                  {pomodoro.type === "focus"
                    ? "Focus"
                    : pomodoro.type === "shortBreak"
                    ? "Break"
                    : "Long Break"}
                </p>
              ) : (
                <PomodoroTypeDropdown
                  type={form.type}
                  setType={(value: PomodoroType) => {
                    setForm({ ...form, type: value });
                  }}
                />
              )}
            </div>
            <div className="flex-1 flex flex-row justify-end">
              {pomodoro ? (
                <p>{timeSimple(pomodoro.duration)}</p>
              ) : (
                <TimeInput
                  isInvalid={false}
                  value={parseTime(secondsToTimeString(form.duration || 0))}
                  onChange={(time) => {
                    if (time) {
                      const timeString = time.toString();
                      setForm({
                        ...form,
                        duration: timeStringToSeconds(timeString),
                      });
                    }
                  }}
                  hourCycle={24}
                  className="w-min"
                  granularity="second"
                  aria-label="Duration"
                  name="duration"
                />
              )}
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="max-h-64 overflow-hidden">
          {pomodoro ? (
            <ScrollShadow className="h-full">
              <TasksList pomodoroId={pomodoro.id} />
            </ScrollShadow>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Button isIconOnly type="submit">
                <IoAdd />
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </Form>
  );
};
