"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

export const AccountDropdown = ({ username }: { username: string | null }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hover:bg-hover">
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <Avatar />
          <p>{username || "Not Logged In"}</p>
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="account">Account</DropdownItem>
        <DropdownItem key="logout">Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
