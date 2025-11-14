import React from "react";
import type { Platform } from "../../../../../types/mission";
import type { RT } from "../../../../../types/rt";
import PlatformDatePicker from "./PlatformDatePicker";

interface Props {
  platform: Platform;
  index: number;
  allPlatforms: Platform[]; // all platforms to check used RTs
  missionStart?: Date;
  missionEnd?: Date;
  RTS: RT[];
  updatePlatform: (index: number, field: keyof Platform, value: any) => void;
  updateUsageTime: (
    index: number,
    field: keyof Platform["usageTime"],
    value: Date | null
  ) => void;
  removePlatform: (index: number) => void;
}

const PlatformRow: React.FC<Props> = ({
  platform: p,
  index,
  allPlatforms,
  missionStart,
  missionEnd,
  RTS,
  updatePlatform,
  updateUsageTime,
  removePlatform,
}) => {
  const startDate = p.usageTime.start ? new Date(p.usageTime.start) : null;
  const endDate = p.usageTime.end ? new Date(p.usageTime.end) : null;

  const getTimeLimits = (date: Date | null) => {
    if (!missionStart || !missionEnd || !date)
      return { minTime: undefined, maxTime: undefined };

    const isStartDate = date.toDateString() === missionStart.toDateString();
    const isEndDate = date.toDateString() === missionEnd.toDateString();

    const minTime = isStartDate
      ? missionStart
      : new Date(date.setHours(0, 0, 0, 0));
    const maxTime = isEndDate
      ? missionEnd
      : new Date(date.setHours(23, 59, 0, 0));

    return { minTime, maxTime };
  };

  const getMinEndTime = () => {
    if (!startDate) return undefined;
    const minEnd = new Date(startDate);
    minEnd.setMinutes(minEnd.getMinutes() + 1);
    return minEnd;
  };

  const startLimits = getTimeLimits(startDate ?? missionStart ?? null);
  const endLimits = getTimeLimits(endDate ?? missionEnd ?? null);

  // Determine which RTs are already used as main rt in other platforms
  const usedRTs = allPlatforms
    .filter((_, idx) => idx !== index) // exclude current platform
    .map((pl) => pl.rt);

  return (
    <div className="text-sm grid grid-cols-[6.5ch_10%_10%_7ch_7ch_1fr_1fr_auto] gap-2 items-center p-2 bg-[var(--background)] text-[var(--text)] border-2 border-[var(--accent)] rounded-lg mb-1">
      {/* Number */}
      <input
        type="number"
        value={p.number}
        onChange={(e) => updatePlatform(index, "number", Number(e.target.value))}
        className="w-full p-2 rounded bg-[var(--background)] text-sm"
      />

      {/* RT */}
      <select
        value={p.rt}
        onChange={(e) => updatePlatform(index, "rt", e.target.value as RT)}
        className="px-1 rounded bg-[var(--background)] w-12 appearance-none focus:outline-none text-sm"
      >
        <option value="None">None</option>
        {RTS.map((r) => (
          <option key={r} value={r} disabled={usedRTs.includes(r)}>
            {r}
          </option>
        ))}
      </select>

      {/* Backup RT */}
      <select
        value={p.backupRt}
        onChange={(e) => updatePlatform(index, "backupRt", e.target.value as RT)}
        className="px-1 rounded bg-[var(--background)] w-12 appearance-none focus:outline-none text-sm"
      >
        <option value="None">None</option>
        {RTS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Uplink */}
      <input
        type="number"
        value={p.uplink}
        onChange={(e) => updatePlatform(index, "uplink", Number(e.target.value))}
        className="w-full p-2 rounded bg-[var(--background)] text-sm"
      />

      {/* Downlink */}
      <input
        type="number"
        value={p.downlink}
        onChange={(e) =>
          updatePlatform(index, "downlink", Number(e.target.value))
        }
        className="w-full p-2 rounded bg-[var(--background)] text-sm"
      />

      {/* Start DatePicker */}
      <PlatformDatePicker
        selected={startDate}
        onChange={(date) => updateUsageTime(index, "start", date)}
        minDate={missionStart ?? undefined}
        maxDate={missionEnd ?? undefined}
        minTime={startLimits.minTime}
        maxTime={startLimits.maxTime}
        placeholder="Select start"
      />

      {/* End DatePicker */}
      <PlatformDatePicker
        selected={endDate}
        onChange={(date) => updateUsageTime(index, "end", date)}
        minDate={missionStart ?? undefined}
        maxDate={missionEnd ?? undefined}
        minTime={startDate ? getMinEndTime() : endLimits.minTime}
        maxTime={endLimits.maxTime}
        placeholder="Select end"
        disabled={!startDate} // disable until start time selected
      />

      {/* Delete */}
      <button
        className="text-[var(--faded-text)] hover:text-red-500 font-bold px-2"
        onClick={() => removePlatform(index)}
        title="Delete Platform"
      >
        ✕
      </button>
    </div>
  );
};

export default PlatformRow;
