// TeamSection.tsx
import React from "react";
import type { Mission, TimeRange } from "../../../../../types/mission";
import TeamMemberRow from "./TeamMemberRow";

interface Props {
  title: string;
  members: any[];
  type: "tech" | "mat" | "mam";
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const TeamSection: React.FC<Props> = ({ title, members, type, mission, setMission }) => {
  const missionStart = mission.time?.start ? new Date(mission.time.start) : undefined;
  const missionEnd = mission.time?.end ? new Date(mission.time.end) : undefined;

  const addMember = () => {
    const newMember = { name: "", assignedTime: { start: "", end: "" } as TimeRange };
    if (type === "tech") setMission({ ...mission, technicians: [...(mission.technicians || []), newMember] });
    if (type === "mat") setMission({ ...mission, matzats: [...(mission.matzats || []), newMember] });
    if (type === "mam") setMission({ ...mission, mamashs: [...(mission.mamashs || []), newMember] });
  };

  const updateMember = (index: number, key: "name" | "assignedTime", value: any) => {
    const updateArray = (arr: any[]) => {
      const newArr = [...arr];
      newArr[index][key] = value;
      return newArr;
    };
    if (type === "tech") setMission({ ...mission, technicians: updateArray(mission.technicians || []) });
    if (type === "mat") setMission({ ...mission, matzats: updateArray(mission.matzats || []) });
    if (type === "mam") setMission({ ...mission, mamashs: updateArray(mission.mamashs || []) });
  };

  const removeMember = (index: number) => {
    const remove = (arr: any[]) => arr.filter((_, i) => i !== index);
    if (type === "tech") setMission({ ...mission, technicians: remove(mission.technicians || []) });
    if (type === "mat") setMission({ ...mission, matzats: remove(mission.matzats || []) });
    if (type === "mam") setMission({ ...mission, mamashs: remove(mission.mamashs || []) });
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--secondary)] rounded p-3 gap-2 overflow-y-auto">
      <div className="flex items-center justify-between mb-2 w-full">
        <h4 className="font-bold text-[var(--faded-text)]">{title}</h4>
        <button
          className="text-gray-500 hover:text-[var(--accent)] font-bold text-lg ml-auto"
          onClick={addMember}
        >
        +
        </button>
      </div>


      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
        {members.map((member, i) => (
          <TeamMemberRow
            key={i}
            member={member}
            index={i}
            type={type}
            missionStart={missionStart}
            missionEnd={missionEnd}
            updateMember={updateMember}
            removeMember={removeMember}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
