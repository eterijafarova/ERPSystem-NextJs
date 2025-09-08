import { vouchers } from "../../../../../data/data";

export default function Vouchers() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
      <h2 className="font-semibold mb-4">Payment Vouchers</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="py-2 px-3">S/N</th>
            <th className="py-2 px-3">Subject</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((v) => (
            <tr key={v.id} className="odd:bg-gray-50 border-t">
              <td className="py-2 px-3">{v.id.toString().padStart(2, "0")}</td>
              <td className="py-2 px-3">{v.subject}</td>
              <td className="py-2 px-3">{v.date}</td>
              <td
                className={`py-2 px-3 font-medium ${
                  v.status === "Approved" ? "text-green-500" : "text-orange-500"
                }`}
              >
                {v.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
