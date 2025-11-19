import React from "react";

interface Props {
  onClick: () => void;
}

const CreateMissionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      className="bg-[var(--accent)] text-white rounded-lg px-6 py-3 shadow-md hover:opacity-90"
      onClick={onClick}
    >
      + Create Mission
    </button>
  );
};

export default CreateMissionButton;
