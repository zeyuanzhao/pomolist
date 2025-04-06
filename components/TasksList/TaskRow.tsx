import { TaskInfo } from "@/interfaces";
import { timeSimple } from "@/utils/timeSeconds";
import { Button, Checkbox } from "@heroui/react";
import { useState } from "react";
import { IoPencil } from "react-icons/io5";

export const TaskRow = ({ task }: { task: TaskInfo }) => {
  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="border-b-1 cursor-pointer hover:bg-hover/10"
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
        className="flex flex-row items-center py-2 rounded-lg justify-between px-2"
      >
        <div className="flex flex-row">
          <Checkbox isSelected={checked} onValueChange={setChecked} />
          <p className={`${hover || checked ? "line-through" : ""}`}>
            {task.name}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          {hover && (
            <div
              className="hover:bg-hover/50 p-0.5 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <IoPencil size="20px" />
            </div>
          )}
          <p>{timeSimple(task.duration)}</p>
        </div>
      </div>
    </div>
  );
};
