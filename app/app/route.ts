"use server";

import { redirect } from "next/navigation";

export const GET = async (request: Request) => {
  redirect("/app/pomodoro");
};
