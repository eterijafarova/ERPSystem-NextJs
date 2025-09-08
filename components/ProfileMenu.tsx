// components/ProfileMenu.tsx
"use client";
import { useState } from "react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img src="/avatar.png" alt="Profile" className="w-8 h-8 rounded-full" />
        <span className="hidden md:block text-sm">Otor John</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </a>
          <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
            Settings
          </a>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
