"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Button
          isIconOnly
          className="rounded-lg bg-transparent border-0"
          variant="ghost"
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? (
            <IoSunnyOutline size={"1.75em"} />
          ) : (
            <IoMoonOutline size={"1.75em"} />
          )}
        </Button>
      )}
    </>
  );
};
