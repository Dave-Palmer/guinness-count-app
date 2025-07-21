export const dynamic = "force-dynamic";
import React from "react";
import Profile from "@/app/components/Profile";
import { getUserProfileInfo } from "@/app/lib/data";
import { updateUserAccount, removeUserAccount } from "@/app/lib/actions";

const page = async () => {
  const profile = await getUserProfileInfo();

  return (
    <>
      <Profile
        userProfile={profile}
        handleUpdateUser={updateUserAccount}
        removeUserAccount={removeUserAccount}
      />
    </>
  );
};

export default page;
