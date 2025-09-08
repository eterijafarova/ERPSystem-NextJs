"use client";
import { useState } from "react";

export default function ModalSuccess({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-96">
        <h2 className="text-green-600 text-xl font-bold mb-4">✅ Success</h2>
        <p>{message}</p>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
