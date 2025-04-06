import { TaskInfo } from "@/interfaces";

export const TaskRow = ({ task }: { task: TaskInfo }) => {
  return (
    <div key={task.id} className="flex flex-row items-center">
      <p>{task.name}</p>
    </div>
  );
};
