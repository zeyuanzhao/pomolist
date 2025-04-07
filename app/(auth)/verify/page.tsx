"use server";

import { Link } from "@heroui/link";

const VerifyPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <p>Please check your email for a link to verify your account.</p>
      <Link href="/login">Log In</Link>
    </div>
  );
};

export default VerifyPage;
