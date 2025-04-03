"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from "@heroui/react";
import { IoChevronDown } from "react-icons/io5";

export const AccountDropdown = ({ username }: { username?: string }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hover:bg-hover rounded-lg p-1">
        <div className="flex flex-row items-center gap-x-2 cursor-pointer justify-between">
          <div className="flex flex-row items-center gap-x-2">
            <Avatar name={username} />
            <p className="text-ellipsis overflow-hidden max-w-[8.5rem]">
              {username || "Logged Out"}
            </p>
          </div>
          <IoChevronDown className="mr-1" size={"1.25em"} />
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="account" href="/app/account">
          Account
        </DropdownItem>
        <DropdownItem key="logout" href="/logout">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
