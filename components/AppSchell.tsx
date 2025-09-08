import { ReactNode } from "react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-red-500" />
          <div className="text-xs text-gray-500 leading-4">
            UltraDoctor
            <br />
            ERP System
          </div>
        </div>
        <nav className="space-y-2 text-sm">
          <Link className="block rounded px-2 py-1 hover:bg-gray-100" href="/">
            Dashboard
          </Link>
          <Link
            className="block rounded px-2 py-1 hover:bg-gray-100"
            href="/staff"
          >
            Staff
          </Link>
          <Link
            className="block rounded px-2 py-1 hover:bg-gray-100"
            href="/circular"
          >
            Circular
          </Link>
        </nav>
      </aside>
      <main>
        <header className="flex items-center justify-end border-b px-6 h-14">
          <ProfileMenu />
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
