"use client";

import { useEffect, useState } from "react";
import Vouchers from "./@vouchers/page";
import {
  staffMembers as initialStaffMembers,
  circulars as initialCirculars,
} from "../../../../data/data";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type StaffMember = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  designation: string;
};

type Circular = {
  id: number;
  title: string;
  from: string;
  to: string;
  date: string;
  type: string;
};

const data = [
  { name: "Pending", value: 80 },
  { name: "Approved", value: 370 },
  { name: "Rejected", value: 50 },
];

const COLORS = ["#FBBF24", "#22C55E", "#EF4444"];

export default function DashboardPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [circulars, setCirculars] = useState<Circular[]>([]);

  useEffect(() => {
    const storedStaff = localStorage.getItem("staffMembers");
    setStaff(storedStaff ? JSON.parse(storedStaff) : initialStaffMembers);

    const storedCirculars = localStorage.getItem("circulars");
    setCirculars(
      storedCirculars ? JSON.parse(storedCirculars) : initialCirculars
    );
  }, []);

  return (
    <div className="space-y-6 p-6 text-gray-500 bg-white min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-sm rounded-xl p-6">
          <p className="text-2xl font-bold">{staff.length}</p>
          <p className="text-gray-600">Total number of staff</p>
          <p className="text-sm text-green-500 mt-2">
            ↑ 12 more than last quarter
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-6">
          <p className="text-2xl font-bold">100</p>
          <p className="text-gray-600">Total application</p>
          <p className="text-sm text-red-500 mt-2">
            ↓ 0.2% lower than last quarter
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-6">
          <p className="text-2xl font-bold">10</p>
          <p className="text-gray-600">Total projects</p>
          <p className="text-sm text-green-500 mt-2">
            ↑ 2% more than last quarter
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-6">
          <p className="text-2xl font-bold">10</p>
          <p className="text-gray-600">Total departments</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-500">
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Circulars</h3>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2">S/N</th>
                <th className="py-2">Circular Title</th>
                <th className="py-2">Sent From</th>
                <th className="py-2">Sent To</th>
                <th className="py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {circulars.slice(0, 4).map((c, index) => (
                <tr key={c.id} className="bg-gray-50 rounded-lg">
                  <td className="py-2 px-2">{index + 1}</td>
                  <td className="py-2 px-2">{c.title}</td>
                  <td className="py-2 px-2">{c.from}</td>
                  <td className="py-2 px-2">{c.to}</td>
                  <td className="py-2 px-2">{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 text-gray-500">
          <h3 className="text-lg font-semibold mb-4">Staff List</h3>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2">S/N</th>
                <th className="py-2">Staff Name</th>
                <th className="py-2">Staff Role</th>
                <th className="py-2">Designation</th>
              </tr>
            </thead>
            <tbody>
              {staff.slice(0, 5).map((member, index) => (
                <tr key={member.id} className="bg-gray-50 rounded-lg">
                  <td className="py-2 px-2">{index + 1}</td>
                  <td className="py-2 px-2">
                    {member.firstName} {member.lastName}
                  </td>
                  <td className="py-2 px-2">{member.role}</td>
                  <td className="py-2 px-2">{member.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Vouchers />

        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Staff Applications Card
          </h3>
          <div className="flex gap-6">
            <div>
              <p className="text-xl font-bold">500 Total applications</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  80 Pending
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  370 Approved
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  50 Rejected
                </li>
              </ul>
            </div>

            <div className="w-40 h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
