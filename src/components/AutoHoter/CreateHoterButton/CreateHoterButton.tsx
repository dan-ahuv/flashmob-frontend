// components/AutoHoter/CreateHoterButton/CreateHoterButton.tsx
import React from "react";

interface Props {
  onClick: () => void;
}

const CreateHoterButton: React.FC<Props> = ({ onClick }) => (
  <button
    className="bg-[var(--accent)] text-[var(--text)] rounded-lg px-6 py-3 shadow-md hover:opacity-90"
    style={{ fontFamily: "Kdam Thmor Pro" }}
    onClick={onClick}
  >
    + Create New Hoter
  </button>
);

export default CreateHoterButton;
