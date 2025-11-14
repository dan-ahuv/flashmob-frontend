import React from "react";
import type { Mission, Platform } from "../../../../../types/mission";
import type { RT } from "../../../../../types/rt";
import PlatformRow from "./PlatformRow";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const RTS: RT[] = ["1", "2", "3", "4", "5", "6", "7", "10", "12", "13", "14", "15", "16", "17"];

const FIXED_CONTAINER_HEIGHT = "400px";

const Step2Platforms: React.FC<Props> = ({ formData, setFormData }) => {
  const platforms = formData.platforms || [];

  const missionStart = formData.time?.start ? new Date(formData.time.start) : null;
  const missionEnd = formData.time?.end ? new Date(formData.time.end) : null;

  const addPlatform = () => {
    const newPlatform: Platform = {
      number: platforms.length + 1,
      rt: "None" as RT,
      backupRt: "None" as RT,
      uplink: 0,
      downlink: 0,
      status: "disconnected",
      usageTime: { start: "", end: "" },
    };
    setFormData((prev) => ({ ...prev, platforms: [...platforms, newPlatform] }));
  };

  const removePlatform = (index: number) => {
    const updated = platforms.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, platforms: updated }));
  };

  const updatePlatform = (index: number, field: keyof Platform, value: any) => {
    const updated = [...platforms];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, platforms: updated }));
  };

  const updateUsageTime = (index: number, field: keyof Platform["usageTime"], value: Date | null) => {
    const updated = [...platforms];
    updated[index].usageTime[field] = value ? value.toISOString() : "";
    setFormData((prev) => ({ ...prev, platforms: updated }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[var(--secondary)] rounded">
        {/* Column headers */}
        <div className="grid grid-cols-[6.5ch_10%_10%_7ch_7ch_1fr_1fr_auto] gap-2 p-3 font-semibold text-sm text-[var(--faded-text)]">
          <div>Number</div>
          <div>RT</div>
          <div>Back RT</div>
          <div>Uplink</div>
          <div>Downlink</div>
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

        {/* Scrollable container */}
        <div
          className="overflow-y-auto px-2 py-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
          style={{ height: FIXED_CONTAINER_HEIGHT }}
        >
          {platforms.length > 0 ? (
            platforms.map((p, idx) => (
              <PlatformRow
                key={idx}
                platform={p}
                index={idx}
                allPlatforms={platforms}
                missionStart={missionStart ?? undefined}
                missionEnd={missionEnd ?? undefined}
                RTS={RTS}
                updatePlatform={updatePlatform}
                updateUsageTime={updateUsageTime}
                removePlatform={removePlatform}
              />
            ))
          ) : (
            <div className="p-4 text-center text-[var(--faded-text)]">No platforms added yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Platforms;
