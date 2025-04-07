import { deleteTask, editTask } from "@/app/app/tasks/actions";
import { TaskInfo } from "@/interfaces";
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
  parseAbsolute,
  parseDate,
  parseDateTime,
  parseTime,
  parseZonedDateTime,
  toCalendarDate,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { IoAdd, IoTrashOutline } from "react-icons/io5";

export const EditForm = ({ task }: { task: TaskInfo }) => {
  const [form, setForm] = useState({
    name: task.name || "",
    description: task.description || "",
    duration: timeStringToSeconds(task.duration) || 1500,
    dueDate: task.dueDate
      ? toCalendarDate(
          parseAbsolute(task.dueDate, getLocalTimeZone())
        ).toString()
      : (undefined as string | undefined),
  });

  const [errors, setErrors] = useState({});
  return (
    <Form
      className="flex-1 flex flex-col"
      action={async (formData) => {
        if (!form.name) {
          return;
        }
        const res = await editTask(task.id, form);
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
        placeholder="Edit task name"
        name="name"
        value={form.name}
        classNames={{}}
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
          granularity="second"
          aria-label="Duration"
          name="duration"
        />
      </Tooltip>
      <Tooltip content="Due Date">
        <DatePicker
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
      <div className="w-full flex flex-row justify-between items-center">
        <Button
          className="bg-bgs hover:bg-hover hover:brightness-[85%]"
          type="submit"
          onSubmit={(e) => e.preventDefault()}
        >
          Edit
        </Button>
        <Button
          className="bg-bgs hover:bg-hover hover:brightness-[85%]"
          type="button"
          isIconOnly
          onPress={() => deleteTask(task.id)}
        >
          <IoTrashOutline />
        </Button>
      </div>
    </Form>
  );
};
