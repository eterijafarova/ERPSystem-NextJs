import Link from "next/link";
import { Home, Users, FileText, Bell, Settings } from "lucide-react";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/circular", label: "Circulars", icon: FileText },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
      <div className="p-6 text-xl font-bold text-gray-800">
        UI/UX Otor ERP System
      </div>
      <nav className="mt-6">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
