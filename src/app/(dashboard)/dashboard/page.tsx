"use client";

import { useEffect, useState } from "react";
import Vouchers from "./@vouchers/page";
import {
  staffMembers as initialStaffMembers,
  circulars as initialCirculars,
} from "../../../../data/data";

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
  { name: "Pending", value: 80, color: "#FBBF24" },
  { name: "Approved", value: 370, color: "#22C55E" },
  { name: "Rejected", value: 50, color: "#EF4444" },
];

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
            ↑ 1 more than last quarter
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
          <p className="text-2xl font-bold">{circulars.length}</p>
          <p className="text-gray-600">Total Circulars</p>
          <p className="text-sm text-green-500 mt-2">
            ↑ 12 more than last quarter
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl p-6 h-full">
          <h3 className="text-lg font-semibold mb-4">Circulars</h3>
          <div className="overflow-y-auto max-h-64">
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
                {circulars.map((c, index) => (
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
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 h-full">
          <h3 className="text-lg font-semibold mb-4">Staff List</h3>
          <div className="overflow-y-auto max-h-64">
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
                {staff.map((member, index) => (
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
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 h-full">
          <h3 className="text-lg font-semibold mb-4">Payment Vouchers</h3>
          <div className="overflow-y-auto max-h-64">
            <Vouchers />
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-6 h-full">
          <h3 className="text-lg font-semibold mb-4">
            Staff Applications Card
          </h3>
          <div className="flex gap-6 items-center">
            <div>
              <p className="text-xl font-bold">500 Total applications</p>
              <ul className="mt-4 space-y-2 text-sm">
                {data.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.value} {item.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-40 h-40 flex items-center justify-center">
              <img
                src="/dashboard.png"
                alt="Chart"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
