"use client";
import Image from "next/image";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import logo from "../images/homer.png";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { IoEye, IoEyeOff } from "react-icons/io5";

const RegisterForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <form className="max-w-3xl bg-gray-800/50  p-6 rounded-3xl border border-gray-500/90">
        <div className="flex items-center justify-center mb-5">
          <Image src={logo} alt="logo" width={80} height={80} />
        </div>
        <div className="space-y-2 mt-5">
          <Input
            isRequired
            type="text"
            label="Username"
            id="username"
            placeholder="Enter Username"
            variant="underlined"
            isClearable
          />
        </div>
        <div className="space-y-2 mt-5">
          <Input
            isRequired
            type="email"
            label="Email"
            id="email"
            placeholder="you@email.com"
            variant="underlined"
            isClearable
            startContent={
              <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div className="space-y-2 mt-5">
          <Input
            isRequired
            label="Password"
            id="password"
            placeholder="Enter Password"
            variant="underlined"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
        </div>
        <div className="space-y-2 mt-5">
          <Input
            isRequired
            label="Confirm Password"
            id="confirmPassword"
            placeholder="Re-Enter Password"
            variant="underlined"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
        </div>

        <div className="mt-5">
          <Button
            type="submit"
            className="w-full bg-skin-button-base hover:bg-skin-button-base-hover transition ease-in duration-200 text-white font-bold rounded-lg px-4 py-2"
          >
            Register
          </Button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-400 md:w-2/5"></span>
          <p className="text-xs text-gray-400 uppercase dark:text-gray-400 ">
            or
          </p>
          <span className="w-1/5 border-b dark:border-gray-400 md:w-2/5"></span>
        </div>
        <div className="flex justify-center w-full items-center mt-5">
          <Button
            type="button"
            className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200  text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
          >
            <BsGoogle />
            <span className="ml-2">Sign in with Google</span>
          </Button>
        </div>
        <div className="flex items-center justify-center mt-5 text-xs font-display font-semibold text-gray-400 ">
          Already have an account?
          <Link
            className="text-xs font-display font-semibold text-blue-500 hover:text-blue-600 cursor-pointer ml-1"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
