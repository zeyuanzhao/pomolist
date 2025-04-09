"use client";

import { AddPomodoroForm, PomodoroInfo, PomodoroType } from "@/interfaces";
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
import { useState } from "react";
import { PomodoroTypeDropdown } from "./PomodoroTypeDropdown";
import { parseTime } from "@internationalized/date";
import { Button, Form, useToast } from "@heroui/react";
import { IoAdd } from "react-icons/io5";
import { addPomodoro } from "@/app/app/pomodoro/actions";

export const PomodoroCard = ({ pomodoro }: { pomodoro?: PomodoroInfo }) => {
  const [form, setForm] = useState<AddPomodoroForm>({
    name: "",
    type: "focus",
    duration: 1500,
  });

  const [errors, setErrors] = useState({});

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
      <Card className="min-h-40 max-h-60">
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
                  {form.type === "focus"
                    ? "Focus"
                    : form.type === "shortBreak"
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
        <CardBody>
          {pomodoro ? (
            <TasksList pomodoroId={pomodoro.id} />
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
