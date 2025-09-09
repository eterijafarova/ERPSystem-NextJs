"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateCircular() {
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [type, setType] = useState("General");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    if (!title || !from || !to) return alert("Fill all required fields");

    const newCircular = {
      id: Date.now(),
      title,
      from,
      to,
      date,
      type,
      message,
    };

    const stored = localStorage.getItem("circulars");
    const circulars = stored ? JSON.parse(stored) : [];
    circulars.push(newCircular);
    localStorage.setItem("circulars", JSON.stringify(circulars));

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push("/circular");
    }, 1200);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm text-gray-500">
      <Link href="/circular" className="text-blue-500 mb-4 inline-block">
        ← Back
      </Link>

      <h2 className="text-xl font-semibold mb-6">Create Circular</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Circular title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        >
          <option value="">Select option</option>
          <option value="HR">HR</option>
          <option value="Management">Management</option>
          <option value="All Staff">All Staff</option>
        </select>

        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />

        <textarea
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full h-28"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg"
        >
          Send Circular
        </button>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-semibold text-green-600">
              ✅ Circular added successfully!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
