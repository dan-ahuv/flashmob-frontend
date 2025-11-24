import React from "react";

interface Props {
  addPlatform: () => void;
}

const PlatformHeader: React.FC<Props> = ({ addPlatform }) => (
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
);

export default PlatformHeader;
