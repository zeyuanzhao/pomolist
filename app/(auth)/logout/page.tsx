"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    fetch("/auth/logout", {
      method: "POST",
    }).then(() => router.push("/login"));
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <p>Logging Out...</p>
    </div>
  );
};

export default LogoutPage;
