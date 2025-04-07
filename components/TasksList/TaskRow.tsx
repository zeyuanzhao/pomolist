import { TaskInfo } from "@/interfaces";
import { timeSimple } from "@/utils/timeSeconds";
import {
  Button,
  Checkbox,
  Form,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { EditForm } from "./EditForm";

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
          <Popover
            showArrow
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <PopoverTrigger>
              <div
                className={
                  "hover:bg-hover/60 p-0.5 rounded-lg " +
                  (hover ? "visible" : "invisible")
                }
              >
                <IoPencil size="18px" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {(titleProps) => (
                <div className="p-2">
                  <p {...titleProps} className="text-small font-bold mb-2">
                    Edit Task
                  </p>
                  <EditForm task={task} />
                </div>
              )}
            </PopoverContent>
          </Popover>

          <p>{timeSimple(task.duration)}</p>
        </div>
      </div>
    </div>
  );
};
