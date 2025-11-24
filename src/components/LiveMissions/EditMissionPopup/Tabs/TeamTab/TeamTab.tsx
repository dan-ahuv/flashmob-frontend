// TeamTab.tsx
import React from "react";
import type { Mission } from "../../../../../types/mission";
import TeamSection from "./TeamSection";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const TeamTab: React.FC<Props> = ({ mission, setMission }) => {
  const sections = [
    { title: "Technicians", data: mission.technicians || [], type: "tech" as const },
    { title: "Matzats", data: mission.matzats || [], type: "mat" as const },
    { title: "Mamashs", data: mission.mamashs || [], type: "mam" as const },
  ];

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="flex gap-4 flex-1 h-full">
        {sections.map(({ title, data, type }) => (
          <TeamSection
            key={title}
            title={title}
            members={data}
            type={type}
            mission={mission}
            setMission={setMission}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamTab;
