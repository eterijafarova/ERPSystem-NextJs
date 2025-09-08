import { cards } from "../../../../../data/data";

export default function Cards() {
  return (
    <>
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-2xl font-bold">{card.value}</p>
          <p className="text-sm text-gray-500">{card.label}</p>
          {card.change && (
            <p className={`text-xs mt-2 ${card.color}`}>{card.change}</p>
          )}
        </div>
      ))}
    </>
  );
}
