import React from "react";
import type { Platform } from "../../../../../types/mission";
import PlatformTimePicker from "./PlatformTimePicker";
import { RT_OPTIONS } from "../../../../../types/rt";

interface Props {
  index: number;
  platform: Platform;
  missionStart?: Date;
  missionEnd?: Date;
  updatePlatform: <K extends keyof Platform>(key: K, value: Platform[K]) => void;
  updateUsageTime: (field: keyof Platform["usageTime"], value: string) => void;
  removePlatform: () => void;
}

const PlatformRow: React.FC<Props> = ({
  platform,
  missionStart,
  missionEnd,
  updatePlatform,
  updateUsageTime,
  removePlatform,
}) => {
  const handleRTChange = (key: "rt" | "backupRt", value: string) => {
    if (RT_OPTIONS.includes(value as any)) {
      updatePlatform(key, value as Platform["rt"]);
    }
  };

  return (
    <div className="grid grid-cols-[0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.25fr_1.5fr_1.5fr_auto] gap-2 items-center bg-[var(--background)] border-2 border-[var(--accent)] rounded p-2 min-h-[56px]">
      <input
        type="number"
        value={platform.number}
        onChange={(e) => updatePlatform("number", Number(e.target.value))}
        className="w-full px-2 py-1"
      />

      <select
        value={platform.rt}
        onChange={(e) => handleRTChange("rt", e.target.value)}
        className="w-full px-2 py-1 appearance-none focus:outline-none"
      >
        {RT_OPTIONS.map((rt) => (
          <option key={rt} value={rt}>{rt}</option>
        ))}
      </select>

      <select
        value={platform.backupRt}
        onChange={(e) => handleRTChange("backupRt", e.target.value)}
        className="w-full px-2 py-1 appearance-none focus:outline-none"
      >
        {RT_OPTIONS.map((rt) => (
          <option key={rt} value={rt}>{rt}</option>
        ))}
      </select>

      <input
        type="number"
        value={platform.uplink}
        onChange={(e) => updatePlatform("uplink", Number(e.target.value))}
        className="w-full px-2 py-1"
      />

      <input
        type="number"
        value={platform.downlink}
        onChange={(e) => updatePlatform("downlink", Number(e.target.value))}
        className="w-full px-2 py-1"
      />

      <select
        value={platform.status}
        onChange={(e) => updatePlatform("status", e.target.value as Platform["status"])}
        className="w-full px-2 py-1 appearance-none focus:outline-none"
      >
        <option value="connected">Connected</option>
        <option value="disconnected">Disconnected</option>
        <option value="finished">Finished</option>
      </select>

      <PlatformTimePicker
        platform={platform}
        missionStart={missionStart}
        missionEnd={missionEnd}
        updateUsageTime={updateUsageTime}
      />

      <button
        className="text-[var(--faded-text)] hover:text-red-500 font-bold text-lg px-2"
        onClick={removePlatform}
        title="Delete Platform"
      >
        ✕
      </button>
    </div>
  );
};

export default PlatformRow;
