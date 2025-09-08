"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { circulars as initialCirculars } from "../../../../data/data";

type Circular = {
  id: number;
  title: string;
  from: string;
  to: string;
  date: string;
  type: string;
};

export default function CircularsPage() {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const stored = localStorage.getItem("circulars");
    if (stored) {
      setCirculars(JSON.parse(stored));
    } else {
      setCirculars(initialCirculars);
      localStorage.setItem("circulars", JSON.stringify(initialCirculars));
    }
  }, []);

  const filtered = circulars.filter((c) => {
    const matchesFilter =
      filter === "all" || c.to.toLowerCase() === filter.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm text-gray-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Circulars</h2>
        <Link
          href="/circular/create"
          className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg"
        >
          Create Circular
        </Link>
      </div>

      <div className="flex gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg w-1/3"
        />

        <div className="text-gray-700 font-medium">
          Count: {filtered.length}
        </div>

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="all">All </option>
          <option value="HR">HR</option>
          <option value="Management">Management</option>
        </select>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500 text-left">
          <tr>
            <th>S/N</th>
            <th>Title</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((c, i) => (
            <tr key={c.id} className="border-t">
              <td>{(page - 1) * pageSize + i + 1}</td>
              <td>{c.title}</td>
              <td>{c.from}</td>
              <td>{c.to}</td>
              <td>{c.date}</td>
              <td>{c.type}</td>
              <td className="text-blue-500">
                <Link href={`/circulars/${c.id}`}>View more</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-gray-700 font-medium">
        Total Circulars: {circulars.length}
      </div>

      <div className="flex mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ←
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              page === idx + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
}
