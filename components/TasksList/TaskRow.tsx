import { TaskInfo } from "@/interfaces";
import { Checkbox } from "@heroui/react";
import { useState } from "react";

export const TaskRow = ({ task }: { task: TaskInfo }) => {
  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="border-b-1 cursor-pointer"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => setChecked((prev) => !prev)}
    >
      <div
        key={task.id}
        className="flex flex-row items-center py-2 hover:bg-hover/25 rounded-lg"
      >
        <Checkbox isSelected={checked} onValueChange={setChecked} />
        <p className={`${hover || checked ? "line-through" : ""}`}>
          {task.name}
        </p>
      </div>
    </div>
  );
};
