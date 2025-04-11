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
import { useDrag } from "react-dnd";
import { usePomodoroStore } from "@/utils/stores/usePomodoroStore";

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

  const toggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    editTask(task.id, {
      completed: !task.completed,
    });
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await removeTaskFromPomodoro(task.id);
    } catch (error) {
      console.error("Error removing task from pomodoro:", error);
    }
  };

  const getPomodoroName = () => {
    if (!task.pomodoroId || !pomodoros) return null;
    const pomodoro = pomodoros.get(task.pomodoroId);
    return pomodoro ? pomodoro.name : null;
  };

  // Set up drag functionality if not inside a pomodoro
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { id: task.id, type: ItemTypes.TASK } as DragItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: !inPomodoro, // Prevent dragging if already in a pomodoro
    }),
    [task.id, inPomodoro]
  );

  // Connect the drag ref to our component if not in a pomodoro
  if (!inPomodoro) {
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
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className={hover ? "visible" : "invisible"}
              onClick={handleRemove}
            >
              <IoCloseOutline size="18px" />
            </Button>
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
