import { PomodoroType } from "@/interfaces";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

export const PomodoroTypeDropdown = ({
  type,
  setType,
  triggerClassName,
}: {
  type: PomodoroType;
  setType: (type: PomodoroType) => void;
  triggerClassName?: string;
}) => {
  return (
    <Dropdown>
      <DropdownTrigger className={triggerClassName}>
        <Button>
          {type === "focus"
            ? "Focus"
            : type === "shortBreak"
            ? "Break"
            : "Long Break"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={(key) => setType(key as PomodoroType)}>
        <DropdownItem key="focus" value="focus">
          Focus
        </DropdownItem>
        <DropdownItem key="shortBreak" value="shortBreak">
          Break
        </DropdownItem>
        <DropdownItem key="longBreak" value="longBreak">
          Long Break
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
