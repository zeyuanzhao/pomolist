import { TaskInfo } from "@/interfaces";
import { timeSimple } from "@/utils/timeSeconds";
import { Checkbox, Button } from "@heroui/react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useTaskStore } from "@/utils/stores/useTaskStore";

export const RemovableTaskRow = ({ task }: { task: TaskInfo }) => {
  const { editTask, removeTaskFromPomodoro } = useTaskStore();
  const [hover, setHover] = useState(false);

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

  return (
    <div
      className="border-b-1 cursor-pointer hover:bg-hover/10"
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
        <div className="flex flex-row">
          <Checkbox
            isSelected={task.completed}
            onValueChange={() => {}}
            onClick={toggleCompleted}
          />
          <p className={`${hover || task.completed ? "line-through" : ""}`}>
            {task.name}
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className={hover ? "visible" : "invisible"}
            onClick={handleRemove}
          >
            <IoCloseOutline size="18px" />
          </Button>
          <p>{timeSimple(task.duration)}</p>
        </div>
      </div>
    </div>
  );
};
