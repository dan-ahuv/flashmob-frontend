import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const HotersPagination: React.FC<Props> = ({ currentPage, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;

  const hiddenClass = "invisible"; // use Tailwind to hide without collapsing space

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className={`px-4 py-2 bg-[var(--faded-text)] rounded hover:opacity-80 ${currentPage === 1 ? hiddenClass : ""}`}
        onClick={onPrev}
      >
        Prev
      </button>

      <span className="text-[var(--text)]">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`px-4 py-2 bg-[var(--faded-text)] rounded hover:opacity-80 ${currentPage === totalPages ? hiddenClass : ""}`}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default HotersPagination;
