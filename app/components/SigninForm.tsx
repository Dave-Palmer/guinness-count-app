"use client";

import React from "react";
import { Input, Button, Link, Spinner } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";

const SigninForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <div className="w-96">
      <h2 className="text-2xl guinness-gold mt-8 text-center">Sign In</h2>
      <form className="flex flex-col items-center" action={dispatch}>
        <Input
          required
          radius="sm"
          id="username"
          name="username"
          size="lg"
          label="Username"
          className="m-2"
        />
        <Input
          required
          radius="sm"
          id="password"
          name="password"
          size="lg"
          type="password"
          label="Password"
          className="m-2"
        />
        <SignInButton />
        {errorMessage && (
          <>
            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
        <p className="mt-5 text-lg guinness-gold">Not registered?</p>
        <Button
          as={Link}
          href="/register"
          size="md"
          radius="sm"
          className="mt-4 text-center bg-guinness-gold text-white">
          Register
        </Button>
      </form>
    </div>
  );
};

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isDisabled={pending}
      size="lg"
      type="submit"
      radius="sm"
      className="mt-2 text-center bg-guinness-gold text-white">
      {pending ? <Spinner size="sm" color="default" /> : "Sign In"}
    </Button>
  );
}

export default SigninForm;
