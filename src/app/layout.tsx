"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { SessionProvider, useSession, signOut } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const Navbar = () => {
    const { data: session } = useSession();
    const [today, setToday] = useState("");

    useEffect(() => {
      const date = new Date();
      setToday(
        date.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }, []);

    return (
      <header className="bg-gradient-to-r from-white to-blue-700 p-6 flex justify-end items-center shadow-lg">
        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              <span className="text-white text-lg font-medium">
                Welcome, {session.user.name} - {today}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-500 transition-colors text-white px-4 py-2 rounded-lg font-semibold shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signup"
              className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              Sign Up
            </Link>
          )}
        </div>
      </header>
    );
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col m-0 p-0">
        <SessionProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
