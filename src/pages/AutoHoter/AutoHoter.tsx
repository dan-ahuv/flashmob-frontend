// src/pages/AutoHoter.tsx
import React, { useState, useEffect } from "react";
import { generateMockHoters } from "../../utils/generateMockHoters";
import HotersGrid from "../../components/AutoHoter/HotersGrid/HotersGrid";
import HotersPagination from "../../components/AutoHoter/HotersPagination/HotersPagination";
import CreateHoterButton from "../../components/AutoHoter/CreateHoterButton/CreateHoterButton";
import CreateHoterModal from "../../components/AutoHoter/CreateHoterModel/CreateHoterModel";

const ITEMS_PER_PAGE = 9;

const AutoHoter: React.FC = () => {
  const [hoters, setHoters] = useState(() =>
    generateMockHoters().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamically calculate total pages
  const totalPages = Math.ceil(hoters.length / ITEMS_PER_PAGE);

  // Slice current page hoters
  const currentHoters = hoters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page if out of bounds (e.g., last page removed hoters)
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages]);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleAddHoter = (newHoter: typeof hoters[0]) => {
    setHoters((prev) =>
      [newHoter, ...prev].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full p-6 gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-3xl font-bold text-[var(--color-text)]"
        >
          Recent Hoters
        </h1>
        <CreateHoterButton onClick={() => setIsModalOpen(true)} />
      </div>

      {/* Hoters Grid */}
      <HotersGrid hoters={currentHoters} itemsPerPage={ITEMS_PER_PAGE} />

      {/* Pagination */}
      <HotersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Create Hoter Modal */}
      <CreateHoterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHoter}
      />
    </div>
  );
};

export default AutoHoter;
