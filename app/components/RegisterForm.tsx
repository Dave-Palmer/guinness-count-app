"use client";
import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { registerAccount } from "../lib/actions";

const initialState = {
  success: false,
  message: "",
};

const RegisterForm = () => {
  const [formState, dispatch] = useFormState(registerAccount, initialState);
  const { pending } = useFormStatus();
  return (
    <div>
      {" "}
      {!formState?.success && (
        <>
          <h2 className="text-2xl guinness-gold mt-8">Create Account</h2>
          <div className="w-96">
            <form className="flex flex-col items-center" action={dispatch}>
              {!formState?.success && formState?.message && (
                <p className="text-lg text-red-500">{formState?.message}</p>
              )}
              <Input
                isRequired
                id="email"
                name="email"
                size="lg"
                radius="sm"
                label="Email"
                className="m-2"
                type="email"
              />
              <Input
                isRequired
                id="username"
                name="username"
                size="lg"
                radius="sm"
                label="Username"
                className="m-2"
              />
              <Input
                isRequired
                id="firstname"
                name="firstname"
                size="lg"
                radius="sm"
                label="First Name"
                className="m-2"
              />
              <Input
                isRequired
                id="lastname"
                name="lastname"
                size="lg"
                radius="sm"
                label="Last Name"
                className="m-2"
              />
              <Input
                isRequired
                id="password"
                name="password"
                size="lg"
                radius="sm"
                type="password"
                label="Password"
                className="m-2"
              />
              <Input
                isRequired
                id="confirmpassword"
                name="confirmpassword"
                size="lg"
                radius="sm"
                type="password"
                label="Confirm password"
                className="m-2"
              />
              <Button
                isDisabled={pending}
                size="lg"
                radius="sm"
                type="submit"
                className="m-4 text-center bg-guinness-gold text-white">
                Create
              </Button>
              <Button
                as={Link}
                size="sm"
                radius="sm"
                href="/signin"
                className="mb-2 bg-guinness-gold text-white">
                Back to sign in
              </Button>
            </form>
          </div>
        </>
      )}{" "}
      {formState?.success && (
        <div className="w-96 flex flex-col items-center">
          <h2 className="text-2xl guinness-gold mt-8">
            Successfully created account
          </h2>
          <p className="text-2xl guinness-gold mt-8">{formState.message}</p>
          <Button
            as={Link}
            size="lg"
            radius="sm"
            href="/signin"
            className="m-2 bg-guinness-gold text-white mb-5">
            Back to sign in
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
