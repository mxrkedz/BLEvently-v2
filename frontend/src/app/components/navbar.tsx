"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Divider,
  Button,
} from "@nextui-org/react";
import { FaRegCompass } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";

export default function NavBar() {
  const pathname = window.location.pathname;
  const isActive = (path: string) => pathname === path;
  return (
    <Navbar isBordered className="flex">
      <NavbarBrand>
        <Link className="font-bold text-3xl text-skin-base" href="/">
          BLEvently
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem isActive={isActive("/")}>
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={isActive("/") ? "" : "text-gray-400"}
          >
            <IoHomeOutline size={19} className="mr-1" /> Home
          </Link>
        </NavbarItem>
         <Divider className="h-full border-gray-300" orientation="vertical" />
        <NavbarItem isActive={isActive("/events")}>
          <Link
            color="foreground"
            href="/events"
            aria-current={isActive("/events") ? "page" : undefined}
            className={isActive("/events") ? "" : "text-gray-400"}
          >
            <LuTicket size={19} className="mr-1" /> Events
          </Link>
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem isActive={isActive("/explore")}>
          <Link
            color="foreground"
            href="/explore"
            aria-current={isActive("/explore") ? "page" : undefined}
            className={isActive("/explore") ? "" : "text-gray-400"}
          >
            <FaRegCompass size={19} className="mr-1" /> Explore
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/register"
            className="bg-primary text-primary border border-primary rounded py-2 px-4 transition-colors duration-200 hover:bg-primary hover:text-white"
          >
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
