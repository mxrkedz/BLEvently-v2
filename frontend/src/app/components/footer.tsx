import Link from "next/link";
import React from "react";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-background text-white py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href="/"
              className="font-bold text-3xl text-skin-base hover:text-gray-800 transition-colors"
            >
              BLEvently
            </Link>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href="https://twitter.com/mxrkedz"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <BsTwitterX className="h-6 w-6" />
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 BLEvently, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
