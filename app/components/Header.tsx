"use client";  // render from the client primarily

import { FaGithub } from "react-icons/fa";  // github icon
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image"; // to wrap image to provide image optimisation
import { JSX } from "react";






export const Header = (): JSX.Element => {
  return (
    <header className="w-full border-b bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="../public/window.svg" // replace with your logo path
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold">TS-Sender</span>
        </div>
        {/* Right: GitHub + Providers */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black"
          >
            <FaGithub size={28} />
          </a>
          {/* Wallet/Auth provider (you can replace with connect button) */}
          <ConnectButton/>
        </div>
      </div>
    </header>
  );
}
