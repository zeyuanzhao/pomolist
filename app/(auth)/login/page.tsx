"use client";

import { addToast, Button, Form, Input, Link } from "@heroui/react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { login } from "./actions";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center border-4">
      <Form
        autoCapitalize="off"
        autoComplete="off"
        className="w-1/4 border rounded-lg p-8 pt-4 shadow-md"
        action={async (formData) => {
          const res = await login(formData);
          if (res.error) {
            addToast({
              title: "Error",
              description: res.error.toString(),
              timeout: 10000,
              shouldShowTimeoutProgress: true,
              color: "danger",
            });
          }
        }}
      >
        <Link href="/" className="text-p mb-2">
          <IoIosArrowBack className="-ml-1" />
          Back
        </Link>
        <h1 className="text-4xl mb-3 font-semibold">Log In</h1>
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onValueChange={(value) => {
            setForm((prev) => ({ ...prev, email: value }));
          }}
        />
        <Input
          isRequired
          classNames={{ inputWrapper: "mt-4" }}
          // errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={form.password}
          onValueChange={(value) => {
            setForm((prev) => ({ ...prev, password: value }));
          }}
        />
        <div className="flex flex-row justify-between items-center mt-4 w-full">
          <Button className="bg-p text-white" type="submit">
            Log In
          </Button>
          <Button as={Link} className="" href="/signup" variant="light">
            Create Account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
