"use client";

import React, { useState } from "react";
import { Input, Button, Link, Spinner } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";
import { demoSignInCreds } from "../lib/actions";

const SigninForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function fetchDemoCredentials() {
    const credentials = await demoSignInCreds();
    if (credentials.username && credentials.password) {
      setUsername(credentials.username);
      setPassword(credentials.password);
    }
  }
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignInButton />
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
        <div className="flex justify-center m-3">
          <Button
            size="lg"
            radius="sm"
            className="text-center bg-guinness-gold text-white"
            onPress={() => fetchDemoCredentials()}>
            Demo Credentials
          </Button>
        </div>
        <p className="mt-5 text-lg guinness-gold">Not registered?</p>
        <Button
          as={Link}
          href="/register"
          size="md"
          radius="sm"
          className="m-4 text-center bg-guinness-gold text-white">
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
