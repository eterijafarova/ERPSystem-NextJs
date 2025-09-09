"use client";

export default function Chart() {
  const data = [
    { name: "Pending", value: 80, color: "#facc15" },
    { name: "Approved", value: 370, color: "#22c55e" },
    { name: "Rejected", value: 50, color: "#ef4444" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startPercent = 0;
  const gradient = data
    .map((item) => {
      const endPercent = startPercent + (item.value / total) * 100;
      const segment = `${item.color} ${startPercent}% ${endPercent}%`;
      startPercent = endPercent;
      return segment;
    })
    .join(", ");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
      <h2 className="font-semibold mb-4">Staff Applications Card</h2>
      <p className="text-sm mb-4">500 Total applications</p>

      <div
        className="w-64 h-64 rounded-full"
        style={{
          background: `conic-gradient(${gradient})`,
        }}
      ></div>

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
