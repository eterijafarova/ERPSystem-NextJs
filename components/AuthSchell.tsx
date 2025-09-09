import Image from "next/image";
import { ReactNode } from "react";

export default function AuthShell({
  children,
  image,
  title,
  subtitle,
  topRight,
}: {
  children: ReactNode;
  image: string;
  title: string;
  subtitle?: string;
  topRight?: ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col px-6 md:px-10 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-red-500" />
            <div className="text-xs text-gray-500">
              UltraDoctor
              <br />
              ERP System
            </div>
          </div>
          {topRight}
        </div>
        <div className="mx-auto w-full max-w-md pt-12">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image src={image} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}
