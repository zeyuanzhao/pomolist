import { AccountDropdown } from "./AccountDropdown";

export const SideBar = () => {
  return (
    <div className="border flex flex-col w-64 bg-bg">
      <div>
        <AccountDropdown username={null} />
      </div>
    </div>
  );
};
