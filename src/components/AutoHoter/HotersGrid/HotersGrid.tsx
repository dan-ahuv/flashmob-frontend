import React from "react";
import type { Hoter } from "../../../types/hoter";
import HoterCard from "../HoterCard/HoterCard";

interface Props {
  hoters: Hoter[];
  itemsPerPage?: number; // default 12
}

const HotersGrid: React.FC<Props> = ({ hoters, itemsPerPage = 9 }) => {
  const placeholders = itemsPerPage - hoters.length > 0 ? itemsPerPage - hoters.length : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hoters.map((hoter) => (
        <HoterCard key={hoter.id} hoter={hoter} />
      ))}

      {/* Invisible placeholders for last page */}
      {placeholders > 0 &&
        Array.from({ length: placeholders }).map((_, idx) => (
          <div key={`placeholder-${idx}`} className="opacity-0">
            <HoterCard hoter={{
              id: `placeholder-${idx}`,
              name: "Placeholder",
              type: "crawler",
              section: "110",
              routes: [],
              sagahs: [],
              createdAt: new Date().toISOString()
            }} />
          </div>
        ))}
    </div>
  );
};

export default HotersGrid;
