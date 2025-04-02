import { NavLink } from "../NavLink";
import { AccountDropdown } from "./AccountDropdown";

export const SideBar = () => {
  return (
    <div className="border-r flex flex-col w-64 bg-bg p-4">
      <div className="flex flex-col mb-8">
        <h1 className="p-1 mb-2 text-3xl font-bold">Pomolist</h1>
        <AccountDropdown username={null} />
      </div>
      <div className="w-full">
        <div className="w-full mb-8">
          <NavLink>Pomodoro</NavLink>
          <NavLink>Today</NavLink>
          <NavLink>Tasks</NavLink>
          <NavLink>Statistics</NavLink>
        </div>
        <div className="w-full pl-2">
          <h2 className="text-sm font-semibold">Baskets</h2>
          <div className="">
            <NavLink>Basket 1</NavLink>
            <NavLink>Basket 2</NavLink>
            <NavLink>Basket 3</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
