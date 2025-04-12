import { DragItem, ItemTypes, TaskInfo } from "@/interfaces";
import { timeSimple } from "@/utils/timeSeconds";
import {
  Button,
  Checkbox,
  Form,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { IoPencil, IoCloseOutline } from "react-icons/io5";
import { EditForm } from "./EditForm";
import { useTaskStore } from "@/utils/stores/useTaskStore";
import { useDrag, useDragDropManager } from "react-dnd";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";
import { showError } from "@/utils/showError";

export const TaskRow = ({
  task,
  inPomodoro = false,
}: {
  task: TaskInfo;
  inPomodoro?: boolean;
}) => {
  const { editTask, removeTaskFromPomodoro } = useTaskStore();
  const { pomodoros } = usePomodoroStore();
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  let dndAvailable = false;
  try {
    useDragDropManager();
    dndAvailable = true;
  } catch (e) {
    dndAvailable = false;
  }

  const toggleCompleted = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await editTask(task.id, {
        completed: !task.completed,
      });
    } catch (error) {
      showError(error, "Error", "Failed to update task status");
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await removeTaskFromPomodoro(task.id);
    if (res?.error) {
      showError(res.error, "Error", "Failed to remove task from pomodoro");
    }
  };

  const getPomodoroName = () => {
    if (!task.pomodoroId || !pomodoros) return null;
    const pomodoro = pomodoros.get(task.pomodoroId);
    return pomodoro ? pomodoro.name : null;
  };

  if (dndAvailable && !inPomodoro) {
    const [{ isDragging: dragging }, drag] = useDrag(
      () => ({
        type: ItemTypes.TASK,
        item: { id: task.id, type: ItemTypes.TASK } as DragItem,
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [task.id]
    );

    useEffect(() => {
      setIsDragging(dragging);
    }, [dragging]);

    drag(ref);
  }

  return (
    <div
      ref={ref}
      className={`border-b-1 cursor-pointer hover:bg-hover/10 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={toggleCompleted}
    >
      <div
        key={task.id}
        className="flex flex-row items-center p-2 rounded-lg justify-between"
      >
        <div className="flex flex-row items-center">
          <Checkbox
            isSelected={task.completed}
            onValueChange={() => {}}
            onClick={toggleCompleted}
          />
          <div className="flex flex-col">
            <p className={`${hover || task.completed ? "line-through" : ""}`}>
              {task.name}
            </p>
            {!inPomodoro && task.pomodoroId && (
              <div className="mt-1 text-xs text-gray-500">
                In pomodoro: {getPomodoroName()}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          {inPomodoro && (
            <button
              className={
                "hover:bg-hover/60 p-0.5 rounded-lg " +
                (hover ? "visible" : "invisible")
              }
              onClick={handleRemove}
              onMouseEnter={(e) => {
                e.stopPropagation();
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
              }}
            >
              <IoCloseOutline size="18px" />
            </button>
          )}
          <Popover
            showArrow
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
            }}
          >
            <PopoverTrigger>
              <button
                className={
                  "hover:bg-hover/60 p-0.5 rounded-lg " +
                  (hover ? "visible" : "invisible")
                }
              >
                <IoPencil size="18px" />
              </button>
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
