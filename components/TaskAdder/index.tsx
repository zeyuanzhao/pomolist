"use client";

import { Button, Form, Input } from "@heroui/react";
import { IoAdd } from "react-icons/io5";

export const TaskAdder = () => {
  return (
    <Form className="flex-1 rounded-full border flex flex-row items-center bg-bgs">
      <Input
        className="flex-1"
        placeholder="Add a new task"
        radius="full"
        classNames={{
          inputWrapper:
            "bg-transparent shadow-none hover:bg-transparent focus-within:bg-transparent",
        }}
      />
      <Button
        isIconOnly
        className="rounded-full brightness-[93%] bg-bgs hover:bg-hover hover:brightness-[85%]"
      >
        <IoAdd />
      </Button>
    </Form>
  );
};
