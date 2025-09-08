import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="w-full rounded-md px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50"
      {...props}
    />
  );
}
