import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

const ProfileIcon = ({ signout }: { signout: () => void }) => {
  return (
    <Dropdown
      placement="bottom-end"
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-guinness-gold", // change arrow background
        content: "py-1 px-1 bg-guinness-gold text-white",
      }}>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          showFallback
          src="https://images.unsplash.com/broken"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
        <DropdownItem
          variant="none"
          className="duration-300 ease-in-out hover:bg-[rgba(255,255,255,0.3)]"
          as={Link}
          href="/dashboard/profile">
          My Profile
        </DropdownItem>
        <DropdownItem
          onClick={() => signout()}
          variant="none"
          className=" transition-background ease-in-out duration-[1s] hover:bg-[rgba(255,255,255,0.3)]"
          key="logout">
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileIcon;
