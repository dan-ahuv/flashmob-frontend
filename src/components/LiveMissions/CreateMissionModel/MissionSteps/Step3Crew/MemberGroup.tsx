import type { Technician, Matzat, Mamash } from "../../../../../types/mission";
import MemberCard from "./MemberCard";

interface MemberGroupProps<T extends Technician | Matzat | Mamash> {
  type: "technicians" | "matzats" | "mamashs";
  members: T[];
  missionStart?: Date;
  missionEnd?: Date;
  addMember: (type: "technicians" | "matzats" | "mamashs") => void;
  updateMember: <K extends Technician | Matzat | Mamash>(
    type: "technicians" | "matzats" | "mamashs",
    index: number,
    field: keyof K,
    value: any
  ) => void;
  deleteMember: (
    type: "technicians" | "matzats" | "mamashs",
    index: number
  ) => void;
}

function MemberGroup<T extends Technician | Matzat | Mamash>({
  type,
  members,
  missionStart,
  missionEnd,
  addMember,
  updateMember,
  deleteMember,
}: MemberGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2 flex-1 rounded-lg bg-[var(--secondary)] p-2 min-h-[500px] max-h-[500px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold capitalize text-[var(--faded-text)]">{type}</h3>
        <button
          onClick={() => addMember(type)}
          className="w-7 h-7 flex text-lg items-center justify-center text-[var(--faded-text)] hover:text-blue-500 hover:border-blue-500 transition"
          title={`Add ${type.slice(0, -1)}`}
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto pr-3">
        {members.length === 0 ? (
          <div className="text-[var(--faded-text)] italic text-center py-4">
            No {type} added yet
          </div>
        ) : (
          members.map((m, idx) => (
            <MemberCard
              key={idx}
              type={type}
              member={m}
              index={idx}
              missionStart={missionStart}
              missionEnd={missionEnd}
              updateMember={updateMember}
              deleteMember={deleteMember}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MemberGroup;
