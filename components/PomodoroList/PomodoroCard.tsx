import { PomodoroInfo } from "@/interfaces";
import { secondsToTimeSimple, timeSimple } from "@/utils/timeSeconds";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/react";
import { TasksList } from "../TasksList";

export const PomodoroCard = ({ pomodoro }: { pomodoro: PomodoroInfo }) => {
  return (
    <Card className="min-h-40 max-h-60">
      <CardHeader>
        <div className="flex flex-row flex-1 justify-between items-center">
          <div className="flex-1 flex flex-row justify-start">
            <h3 className="text-2xl font-bold">{pomodoro.name}</h3>
          </div>
          <div className="flex-1 flex flex-row justify-center">
            <p>{pomodoro.type}</p>
          </div>
          <div className="flex-1 flex flex-row justify-end">
            <p>{timeSimple(pomodoro.duration)}</p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <TasksList pomodoroId={pomodoro.id} />
      </CardBody>
    </Card>
  );
};
