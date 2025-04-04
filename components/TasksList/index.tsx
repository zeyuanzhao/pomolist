import { TaskInfo } from "@/interfaces";

export const TasksList = ({ initialTasks }: { initialTasks?: TaskInfo[] }) => {
  return (
    <div>
      {initialTasks?.map((task) => (
        <div key={task.id} className="flex flex-row items-center">
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );
};
