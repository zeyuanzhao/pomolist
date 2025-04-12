"use client";

import { AddTaskForm } from "@/interfaces";
import { showError } from "@/utils/showError";
import { useTaskStore } from "@/utils/stores/useTaskStore";
import { secondsToTimeString, timeStringToSeconds } from "@/utils/timeSeconds";
import {
  addToast,
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
  const { addTask } = useTaskStore();
  const [form, setForm] = useState<AddTaskForm>({
    name: "",
    description: "",
    duration: 300,
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
          showError(res.error, "Error", "Failed to add task");
          return;
        }

        addToast({
          title: "Success",
          description: "Task added successfully!",
          color: "success",
        });
      }}
      validationErrors={errors}
    >
      <Input
        isRequired
        isInvalid={false}
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
        isInvalid={false}
        className="hidden"
        placeholder="Description"
        name="description"
        value={form.description || ""}
        classNames={{
          inputWrapper:
            "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent",
        }}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Tooltip content="Duration">
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
      </Tooltip>
      <Tooltip content="Due Date">
        <DatePicker
          className="w-min"
          isInvalid={false}
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
