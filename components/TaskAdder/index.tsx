"use client";

import { addTask } from "@/app/app/tasks/actions";
import { secondsToTimeString, timeStringToSeconds } from "@/utils/timeSeconds";
import {
  Button,
  DatePicker,
  Form,
  Input,
  TimeInput,
  Tooltip,
} from "@heroui/react";
import {
  getLocalTimeZone,
  parseDate,
  parseTime,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

export const TaskAdder = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: 1500,
    dueDate: undefined as string | undefined,
  });

  const [errors, setErrors] = useState({});

  return (
    <Form
      className="flex-1 rounded-full border flex flex-row items-center bg-bgs shadow-md overflow-hidden"
      action={async (formData) => {
        if (!form.name) {
          return;
        }
        const res = await addTask(form);
        if (res?.error) {
          setErrors(res.error);
          console.log(res.error);
          return;
        }
      }}
      validationErrors={errors}
    >
      <Input
        isRequired
        errorMessage=""
        className="flex-1"
        placeholder="Add a new task"
        name="name"
        value={form.name}
        classNames={{
          inputWrapper:
            "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent",
        }}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        errorMessage=""
        className="hidden"
        placeholder="Description"
        name="description"
        value={form.description}
        classNames={{
          inputWrapper:
            "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent",
        }}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Tooltip content="Duration">
        <TimeInput
          value={parseTime(secondsToTimeString(form.duration))}
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
      </Tooltip>
      <Tooltip content="Due Date">
        <DatePicker
          className="w-min"
          showMonthAndYearPickers
          isDateUnavailable={(date) =>
            date.compare(today(getLocalTimeZone())) < 0
          }
          value={form.dueDate ? parseDate(form.dueDate) : undefined}
          onChange={(date) => {
            setForm({
              ...form,
              dueDate: date?.toString() || today(getLocalTimeZone()).toString(),
            });
          }}
          aria-label="Due Date"
          name="dueDate"
        />
      </Tooltip>
      <Button
        isIconOnly
        className="rounded-full brightness-[93%] bg-bgs hover:bg-hover hover:brightness-[85%]"
        type="submit"
        onSubmit={(e) => e.preventDefault()}
      >
        <IoAdd />
      </Button>
    </Form>
  );
};
