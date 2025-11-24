import React from "react";
import type { Mission } from "../../../../../types/mission";
import PlatformRow from "./PlatformRow";
import PlatformHeader from "./PlatformHeader";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const PlatformsTab: React.FC<Props> = ({ mission, setMission }) => {
  const platforms = mission.platforms || [];

  const addPlatform = () => {
    setMission({
      ...mission,
      platforms: [
        ...(platforms || []),
        {
          number: 0,
          rt: "1",
          backupRt: "1",
          uplink: 0,
          downlink: 0,
          status: "connected",
          usageTime: { start: "", end: "" },
        },
      ],
    });
  };

  const updatePlatform = <K extends keyof typeof platforms[0]>(
    index: number,
    key: K,
    value: any
  ) => {
    const newPlatforms = [...platforms];
    newPlatforms[index][key] = value;
    setMission({ ...mission, platforms: newPlatforms });
  };

  const updateUsageTime = (index: number, field: keyof typeof platforms[0]["usageTime"], value: string) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].usageTime[field] = value;
    setMission({ ...mission, platforms: newPlatforms });
  };

  const removePlatform = (index: number) => {
    const newPlatforms = platforms.filter((_, i) => i !== index);
    setMission({ ...mission, platforms: newPlatforms });
  };

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="flex-1 bg-[var(--secondary)] rounded p-3 flex flex-col gap-2 overflow-y-auto">
        <PlatformHeader addPlatform={addPlatform} />
        {platforms.map((p, i) => (
          <PlatformRow
            key={i}
            index={i}
            platform={p}
            missionStart={mission.time?.start ? new Date(mission.time.start) : undefined}
            missionEnd={mission.time?.end ? new Date(mission.time.end) : undefined}
            updatePlatform={(key, value) => updatePlatform(i, key, value)}
            updateUsageTime={(field, value) => updateUsageTime(i, field, value)}
            removePlatform={() => removePlatform(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatformsTab;
