"use client";

import { addTask } from "@/app/app/tasks/actions";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

export const TaskAdder = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  return (
    <Form
      className="flex-1 rounded-full border flex flex-row items-center bg-bgs"
      action={async (formData) => {
        if (!form.name) {
          return;
        }
        const res = await addTask(formData);
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
        radius="full"
        classNames={{
          inputWrapper:
            "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent",
        }}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
