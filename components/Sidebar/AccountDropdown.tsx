"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from "@heroui/react";
import { FaChevronDown } from "react-icons/fa";

export const AccountDropdown = ({ username }: { username: string | null }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hover:bg-hover rounded-lg p-1">
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <Avatar />
          <p>{username || "Not Logged In"}</p>
          <Spacer x={6} />
          <FaChevronDown />
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="account">Account</DropdownItem>
        <DropdownItem key="logout">Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
