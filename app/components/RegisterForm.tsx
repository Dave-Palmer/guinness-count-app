"use client";
import React from "react";
import { Input, Button, Link, Spinner } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { registerAccount } from "../lib/actions";

const initialState = {
  success: false,
  message: "",
};

function CreateAccountButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isDisabled={pending}
      size="lg"
      radius="sm"
      type="submit"
      className="m-4 text-center bg-guinness-gold text-white">
      {pending ? <Spinner size="sm" color="default" /> : "Create"}
    </Button>
  );
}

const RegisterForm = () => {
  const [formState, dispatch] = useFormState(registerAccount, initialState);
  return (
    <div>
      {" "}
      {!formState?.success && (
        <>
          <h2 className="text-2xl guinness-gold mt-8">Create Account</h2>
          <div className="w-96">
            <form className="flex flex-col items-center" action={dispatch}>
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
                minLength={6}
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
              {!formState?.success && formState?.message && (
                <p className="text-lg text-red-500">{formState?.message}</p>
              )}
              <CreateAccountButton />
              <Button
                as={Link}
                size="md"
                radius="sm"
                href="/signin"
                className="mb-5 bg-guinness-gold text-white">
                Back to sign in
              </Button>
            </form>
          </div>
        </>
      )}{" "}
      {formState?.success && (
        <div className="w-96 flex flex-col items-center">
          <h2 className="text-2xl guinness-gold mt-8">
            Successfully created account!
          </h2>
          <p className="text-2xl guinness-gold mt-8 underline">Username:</p>
          <p className="text-4xl guinness-gold m-2">{formState.message}</p>
          <Button
            as={Link}
            size="lg"
            radius="sm"
            href={`/signin?username=${formState.message}`}
            className=" bg-guinness-gold text-white mb-2">
            Back to sign in
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
