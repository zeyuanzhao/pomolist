"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    fetch("/auth/logout", {
      method: "POST",
    }).then(() => redirect("/login"));
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <p>Logging Out...</p>
    </div>
  );
};

export default LogoutPage;
