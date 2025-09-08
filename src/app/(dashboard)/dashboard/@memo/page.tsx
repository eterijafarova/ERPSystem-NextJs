import { memos } from "../../../../../data/data";

export default function Memo() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
      <h2 className="font-semibold mb-4">Memo</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="py-2 px-3">S/N</th>
            <th className="py-2 px-3">Memo Title</th>
            <th className="py-2 px-3">Sent From</th>
            <th className="py-2 px-3">Sent To</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((m) => (
            <tr key={m.id} className="odd:bg-gray-50 border-t">
              <td className="py-2 px-3">{m.id.toString().padStart(2, "0")}</td>
              <td className="py-2 px-3">{m.title}</td>
              <td className="py-2 px-3">{m.from}</td>
              <td className="py-2 px-3">{m.to}</td>
              <td
                className={`py-2 px-3 font-medium ${
                  m.status === "Approved" ? "text-green-500" : "text-orange-500"
                }`}
              >
                {m.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
