"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Divider,
  Spacer,
} from "@nextui-org/react";

import ConfirmModal from "./ConfirmModal";
import { UserProfile } from "../lib/definitions";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { UserProfileInput } from "../lib/zod";

type ProfileProps = {
  userProfile: UserProfileInput | null;
  handleUpdateUser: (
    arg0: UserProfileInput
  ) => Promise<{ success: boolean; message: string }>;
  removeUserAccount: (
    userId: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
};

export default function Profile({
  userProfile,
  handleUpdateUser,
  removeUserAccount,
}: ProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<UserProfileInput | null>(userProfile);

  // Keep a reference to the original profile for change detection
  const originalProfile = userProfile;

  // Compare current profile to original to determine if changes exist to enable save button
  const hasChanges = useMemo(() => {
    return JSON.stringify(profile) !== JSON.stringify(originalProfile);
  }, [profile, originalProfile]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    // Revert changes
    setProfile(originalProfile);
    setEditMode(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (!profile) return;

    const res = await handleUpdateUser(profile);
    if (res.success) {
      toast.success(res.message, {
        duration: 3000,
      });
      setEditMode(false);
    } else {
      toast.warning(`Update failed: ${res.message}`, { duration: 3000 });
    }
  };

  const handleRemoveUserAccount = async (userId: string, password: string) => {
    const res = await removeUserAccount(userId, password);
    if (res.success) {
      toast.success(res.message);
      signOut();
      return true;
    }
    toast.warning(res.message);
    return false;
  };

  return (
    <div className="w-96 mx-auto p-4 bg-transparent">
      <Card className="bg-opacity-50">
        <CardHeader className="justify-center">
          <h2 className="text-xl font-semibold text-guinness-gold">Profile</h2>
        </CardHeader>
        <Divider />

        <CardBody className="space-y-4">
          <Input
            isReadOnly={!editMode}
            label="Username"
            value={profile?.username || ""}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <Input
            isReadOnly={!editMode}
            label="First Name"
            value={profile?.firstname || ""}
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
          <Input
            isReadOnly={!editMode}
            label="Last Name"
            value={profile?.lastname || ""}
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
          <Input
            isReadOnly={!editMode}
            label="Email"
            type="email"
            value={profile?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </CardBody>

        {editMode && (
          <>
            <Divider />
            <CardFooter className="flex justify-around space-x-2">
              <Button
                className="bg-guinness-gold text-white w-32"
                isDisabled={!hasChanges}
                onClick={handleSave}>
                Save
              </Button>
              <Button className="w-32" onClick={handleCancel}>
                Cancel
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      <Spacer y={4} />

      {!editMode && (
        <Button
          radius="sm"
          fullWidth
          className="bg-guinness-gold text-white mb-4"
          onClick={handleEdit}>
          Edit
        </Button>
      )}
      <ConfirmModal
        text={"Delete Profile"}
        userId={profile?.id}
        buttonAction={handleRemoveUserAccount}
      />
    </div>
  );
}
