"use client";
import { Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChart } from "lucide-react";

export default function Chart() {
  const data = [
    { name: "Pending", value: 80, color: "#facc15" },
    { name: "Approved", value: 370, color: "#22c55e" },
    { name: "Rejected", value: 50, color: "#ef4444" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
      <h2 className="font-semibold mb-4">Staff Applications Card</h2>
      <p className="text-sm mb-4">500 Total applications</p>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-4 text-sm space-y-1">
        {data.map((d, i) => (
          <li key={i} className="flex justify-between">
            <span>
              {d.value} {d.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
