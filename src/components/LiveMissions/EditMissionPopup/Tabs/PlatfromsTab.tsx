import React from "react";
import type { Mission, Platform } from "../../../../types/mission";
import type { RT } from "../../../../types/rt";
import { RT_OPTIONS } from "../../../../types/rt";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void; // updated prop
}

const PlatformsTab: React.FC<Props> = ({ mission, setMission }) => {
  const platforms = mission.platforms || [];

  // Add new platform only if last one is complete
  const addPlatform = () => {
    const incomplete = platforms.some(
      (p) =>
        !p.number ||
        !p.rt ||
        !p.backupRt ||
        !p.uplink ||
        !p.downlink ||
        !p.usageTime.start ||
        !p.usageTime.end
    );
    if (incomplete) return;

    setMission({
      ...mission,
      platforms: [
        ...platforms,
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

  const updatePlatform = <K extends keyof Platform>(index: number, key: K, value: Platform[K]) => {
    const newPlatforms = [...platforms];
    newPlatforms[index][key] = value;
    setMission({ ...mission, platforms: newPlatforms });
  };

  const updateUsageTime = (index: number, field: keyof Platform["usageTime"], value: string) => {
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
      {/* Platforms container */}
      <div className="flex-1 bg-[var(--secondary)] rounded p-3 flex flex-col gap-2 overflow-y-auto">
        {/* Column headers */}
        <div className="grid grid-cols-[0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.25fr_1.5fr_1.5fr_auto] gap-2 font-bold text-[var(--faded-text)] items-center pb-1 mb-2 px-3">
          <div>Number</div>
          <div>RT</div>
          <div>Backup RT</div>
          <div>Uplink</div>
          <div>Downlink</div>
          <div>Status</div>
          <div>Start Time</div>
          <div>End Time</div>
          <button
            className="text-[var(--faded-text)] hover:text-[var(--accent)] font-bold text-lg"
            onClick={addPlatform}
            title="Add Platform"
          >
            +
          </button>
        </div>

        {/* Platform rows */}
        {platforms.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-[0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.25fr_1.5fr_1.5fr_auto] gap-2 items-center bg-[var(--background)] border-2 border-[var(--accent)] rounded p-2 min-h-[56px]"
          >
            <input
              type="number"
              value={p.number}
              onChange={(e) => updatePlatform(i, "number", Number(e.target.value))}
              className="w-full px-2 py-1"
            />

            <select
              value={p.rt}
              onChange={(e) => updatePlatform(i, "rt", e.target.value as RT)}
              className="w-full px-2 py-1 appearance-none focus:outline-none"
            >
              {RT_OPTIONS.map((rt) => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>

            <select
              value={p.backupRt}
              onChange={(e) => updatePlatform(i, "backupRt", e.target.value as RT)}
              className="w-full px-2 py-1 appearance-none focus:outline-none"
            >
              {RT_OPTIONS.map((rt) => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>

            <input
              type="number"
              value={p.uplink}
              onChange={(e) => updatePlatform(i, "uplink", Number(e.target.value))}
              className="w-full px-2 py-1"
            />

            <input
              type="number"
              value={p.downlink}
              onChange={(e) => updatePlatform(i, "downlink", Number(e.target.value))}
              className="w-full px-2 py-1"
            />

            <select
              value={p.status}
              onChange={(e) => updatePlatform(i, "status", e.target.value as Platform["status"])}
              className="w-full px-2 py-1 appearance-none focus:outline-none"
            >
              <option value="connected">Connected</option>
              <option value="disconnected">Disconnected</option>
              <option value="finished">Finished</option>
            </select>

            <input
              type="datetime-local"
              value={p.usageTime.start}
              onChange={(e) => updateUsageTime(i, "start", e.target.value)}
              className="w-full px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              value={p.usageTime.end}
              onChange={(e) => updateUsageTime(i, "end", e.target.value)}
              className="w-full px-2 py-1 text-sm"
            />

            <button
              className="text-[var(--faded-text)] hover:text-red-500 font-bold text-lg px-2"
              onClick={() => removePlatform(i)}
              title="Delete Platform"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformsTab;
