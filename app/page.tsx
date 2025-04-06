import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-4xl">
      <h1>Welcome to Pomolist!</h1>
      <Button href="/login" as={Link}>
        Log In
      </Button>
      <Button href="/signup" as={Link}>
        Sign Up
      </Button>
    </div>
  );
}
