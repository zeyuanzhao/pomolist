import { NavLink } from "../NavLink";
import { AccountDropdown } from "./AccountDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const SideBar = () => {
  return (
    <div className="border-r flex flex-col w-64 bg-bg p-4 justify-between">
      <div>
        <div className="flex flex-col mb-8">
          <h1 className="p-1 mb-2 text-3xl font-bold">Pomolist</h1>
          <AccountDropdown username={null} />
        </div>
        <div className="w-full">
          <div className="w-full mb-8">
            <NavLink url="/app/pomodoro">Pomodoro</NavLink>
            <NavLink url="/app/today">Today</NavLink>
            <NavLink url="/app/tasks">Tasks</NavLink>
            <NavLink url="/app/statistics">Statistics</NavLink>
          </div>
          <div className="w-full pl-2">
            <h2 className="text-sm font-semibold">Baskets</h2>
            <div className="">
              <NavLink url="/app/basket/1">Basket 1</NavLink>
              <NavLink url="/app/basket/2">Basket 2</NavLink>
              <NavLink url="/app/basket/3">Basket 3</NavLink>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
