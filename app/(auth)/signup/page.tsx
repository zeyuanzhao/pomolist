"use client";

import { Button, Form, Input, Link } from "@heroui/react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { signup } from "./actions";

const SignupPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Form
        autoCapitalize="off"
        autoComplete="off"
        className="w-1/4 border rounded-lg p-8 pt-4 shadow-md"
        action={async (formData) => {
          await signup(formData);
        }}
      >
        <Link href="/" className="text-p mb-2">
          <IoIosArrowBack className="-ml-1" />
          Back
        </Link>
        <h1 className="text-4xl mb-3 font-semibold">Sign Up</h1>
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
          validate={(value) => {
            if (value.length < 8 && value.length > 0) {
              return "Password must be at least 8 characters long";
            }
          }}
          value={form.password}
          onValueChange={(value) => {
            setForm((prev) => ({ ...prev, password: value }));
          }}
        />
        <Input
          isRequired
          classNames={{ inputWrapper: "mt-4" }}
          // errorMessage="Please enter a valid password"
          label="Confirm Password"
          labelPlacement="outside"
          name="passwordConfirm"
          placeholder="Enter your password again"
          type="password"
          validate={(value) => {
            if (value !== form.password && form.password.length > 0) {
              return "Passwords do not match";
            }
          }}
          value={form.passwordConfirm}
          onValueChange={(value) => {
            setForm((prev) => ({ ...prev, passwordConfirm: value }));
          }}
        />
        <div className="flex flex-row justify-between items-center mt-4 w-full">
          <Button className="bg-p text-white" type="submit">
            Sign Up
          </Button>
          <Button as={Link} className="" href="/login" variant="light">
            Log In Here
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;
