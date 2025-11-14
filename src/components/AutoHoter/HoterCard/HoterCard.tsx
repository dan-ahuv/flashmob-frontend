import React from "react";
import type { Hoter } from "../../../types/hoter";

const typeColors: Record<string, string> = {
  crawler: "bg-blue-500",
  pandemic: "bg-red-500",
};

const HoterCard: React.FC<{ hoter: Hoter }> = ({ hoter }) => (
  <div className="relative bg-[var(--secondary)] rounded-lg shadow-md p-4 w-74 h-36 flex flex-col justify-between">
    {/* Type Badge Top-Right */}
    <span
      className={`absolute top-2 right-2 text-[var(--text)] text-xs px-2 py-1 rounded ${typeColors[hoter.type]}`}
    >
      {hoter.type.toUpperCase()}
    </span>

    <div className="flex flex-col gap-1">
      <h3
        className="font-bold text-lg truncate text-[var(--text)]"
        title={hoter.name}
      >
        {hoter.name}
      </h3>

      <p
        className="text-sm text-[var(--text)] truncate"
        title={`Routes: ${hoter.routes.join(", ")}`}
      >
        Routes: {hoter.routes.join(", ")}
      </p>

      <p
        className="text-sm text-[var(--text)] truncate"
        title={`Sagahs: ${hoter.sagahs.join(", ")}`}
      >
        Sagahs: {hoter.sagahs.join(", ")}
      </p>

      <p className="text-sm text-[var(--text)]">Section: {hoter.section}</p>
    </div>
  </div>
);

export default HoterCard;
