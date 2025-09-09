"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { staffMembers as initialStaffMembers } from "../../../../data/data";

type StaffMember = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  staffId: string;
  phoneNumber: string;
  role: string;
  designation: string;
};

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const stored = localStorage.getItem("staffMembers");
    if (stored) {
      setStaff(JSON.parse(stored));
    } else {
      setStaff(initialStaffMembers);
      localStorage.setItem("staffMembers", JSON.stringify(initialStaffMembers));
    }
  }, []);

  const filtered = staff.filter((s) => {
    const matchesFilter =
      filter === "all" || s.gender.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm text-gray-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Staff Members</h2>
        <Link
          href="/staff/add"
          className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg"
        >
          Add Staff
        </Link>
      </div>

      <div className="flex gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name..."
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
          <option value="all">All Staff</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500 text-left">
          <tr>
            <th>S/N</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Staff ID</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((s, i) => (
            <tr key={s.id} className="border-t">
              <td>{(page - 1) * pageSize + i + 1}</td>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{s.gender}</td>
              <td>{s.staffId}</td>
              <td>{s.phoneNumber}</td>
              <td>{s.role}</td>
              <td>{s.designation}</td>
              <td className="text-blue-500">
                <Link href={`/staff/${s.id}/edit`}>View more</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-gray-700 font-medium">
        Total Staff Members: {staff.length}
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
