import { PomodoroInfo } from "@/interfaces";
import { secondsToTimeSimple, timeSimple } from "@/utils/timeSeconds";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/react";
import { TasksList } from "../TasksList";

export const PomodoroCard = ({ pomodoro }: { pomodoro: PomodoroInfo }) => {
  return (
    <Card className="min-h-40">
      <CardHeader>
        <div className="flex flex-row flex-1 justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">{pomodoro.name}</h3>
          </div>
          <div>
            <p>{timeSimple(pomodoro.duration)}</p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <TasksList />
      </CardBody>
    </Card>
  );
};
