// MemberRow.tsx
import React from "react";
import MemberTimePicker from "./MemberTimePicker";

interface Props {
  member: any;
  index: number;
  type: "tech" | "mat" | "mam";
  missionStart?: Date;
  missionEnd?: Date;
  updateMember: (index: number, key: "name" | "assignedTime", value: any) => void;
  removeMember: (index: number) => void;
}

const TeamMemberRow: React.FC<Props> = ({
  member,
  index,
  type,
  missionStart,
  missionEnd,
  updateMember,
  removeMember,
}) => {
  return (
    <div className="flex flex-col gap-2 bg-[var(--background)] border-2 border-[var(--accent)] rounded p-2">
      {/* Name */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs text-[var(--text)]" htmlFor={`${type}-name-${index}`}>
            Name
          </label>
          <button className="text-gray-400 hover:text-red-500 font-bold text-sm" onClick={() => removeMember(index)}>
            ✕
          </button>
        </div>
        <input
          id={`${type}-name-${index}`}
          type="text"
          value={member.name}
          placeholder="Name"
          className="w-full px-1 py-1 text-sm rounded"
          onChange={(e) => updateMember(index, "name", e.target.value)}
        />
      </div>

      {/* Start/End Time */}
      <MemberTimePicker
        assignedTime={member.assignedTime}
        missionStart={missionStart}
        missionEnd={missionEnd}
        onChange={(updated) => updateMember(index, "assignedTime", updated)}
      />
    </div>
  );
};

export default TeamMemberRow;
