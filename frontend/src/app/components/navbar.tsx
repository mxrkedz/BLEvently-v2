"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Divider,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { AtSign } from "lucide-react";
import { FaRegCompass } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const [pathname, setPathname] = useState("");
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <Navbar isBordered className="flex">
      <NavbarBrand>
        <Link className="font-bold text-3xl text-skin-inverted" href="/">
          BLEvently
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="flex h-5 items-center space-x-2 text-small"
        justify="center"
      >
        <NavbarItem isActive={isActive("/")}>
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={isActive("/") ? "text-white" : "text-gray-400"}
          >
            <IoHomeOutline size={19} className="mr-1" /> Home
          </Link>
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem isActive={isActive("/events")}>
          <Link
            href="/events"
            aria-current={isActive("/events") ? "page" : undefined}
            className={isActive("/events") ? "text-white" : "text-gray-400"}
          >
            <LuTicket size={19} className="mr-1" /> Events
          </Link>
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem isActive={isActive("/explore")}>
          <Link
            href="/explore"
            aria-current={isActive("/explore") ? "page" : undefined}
            className={isActive("/explore") ? "text-white" : "text-gray-400"}
          >
            <FaRegCompass size={19} className="mr-1" /> Explore
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {loading ? (
          <AtSign className="h-5 w-5 text-muted-foreground animate-spin " />
        ) : (
          <>
            {!session ? (
              <>
                <NavbarItem className="hidden lg:flex">
                  <Link href="/login" className="font-bold text-skin-inverted ">
                    Login
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/register"
                    className="whitespace-nowrap rounded-lg bg-skin-button-base px-4 py-2 font-medium text-skin-base shadow-xl transition-colors hover:bg-skin-button-base-hover"
                  >
                    Register
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <NavbarItem className="flex items-center">
                <Dropdown>
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        draggable: false,
                        onContextMenu: (e) => e.preventDefault(),
                        src: session?.user?.image ?? undefined,
                      }}
                      description={session?.user?.email ?? "Unknown User"}
                      name={session?.user?.name ?? "Unknown User"}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    {/* <DropdownItem key="profile" href="/profile">Profile</DropdownItem> */}
                    <DropdownItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                      onClick={() => signOut()}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
