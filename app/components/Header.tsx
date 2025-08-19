"use client";

import { FaGithub } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Center: Nav links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-14 left-0 w-full bg-white border-b md:border-none md:static md:w-auto md:block`}
        >
        </nav>

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
