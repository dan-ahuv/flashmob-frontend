// components/.../EditMissionPopup.tsx
import React, { useState } from "react";
import Modal from "../../Model/Model";
import type { Mission } from "../../../types/mission";
import GeneralInfoTab from "./Tabs/GeneralInfoTab/GeneralInfoTab";
import PlatformsTab from "./Tabs/PlatformTab.tsx/PlatfromsTab";
import TeamTab from "./Tabs/TeamTab/TeamTab";
import { validateEditMission } from "../../../utils/validateEditMission";

interface Props {
  mission: Mission;
  onClose: () => void;
  onSave: (updated: Mission) => void;
}

const EditMissionPopup: React.FC<Props> = ({ mission, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState<"general" | "platforms" | "team">("general");

  // Local state for the entire mission
  const [localMission, setLocalMission] = useState<Mission>({ ...mission });

  // Validation errors
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = () => {
    const errs = validateEditMission(localMission);
    if (errs.length > 0) {
      setErrors(errs);
      // Optionally jump to first tab that likely contains the error:
      // we'll keep the user on the current tab but you could setActiveTab(...) here.
      return;
    }
    // valid
    onSave(localMission);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      {/* Tabs navbar */}
      <div className="flex mb-4">
        {["general", "platforms", "team"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-4 ${
              activeTab === tab ? "border-b-2 border-[var(--accent)]" : "text-[var(--faded-text)]"
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "general" && (
          <GeneralInfoTab mission={localMission} setMission={setLocalMission} />
        )}
        {activeTab === "platforms" && (
          <PlatformsTab mission={localMission} setMission={setLocalMission} />
        )}
        {activeTab === "team" && (
          <TeamTab mission={localMission} setMission={setLocalMission} />
        )}
      </div>

      {/* Errors (if any) */}
      {errors.length > 0 && (
        <div className="mx-4 mt-4">
          <div className="p-3 rounded border border-red-400 bg-red-50 text-sm text-red-800">
            <div className="font-semibold mb-2">Please fix these issues before saving:</div>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Save / Cancel buttons */}
      <div className="flex justify-end mt-4 gap-2 px-4 pb-4">
        <button
          onClick={onClose}
          className="bg-[var(--background)] text-[var(--text)] px-4 py-2 rounded border-2 border-[var(--accent)] hover:opacity-80"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-[var(--accent)] text-white px-4 py-2 rounded hover:opacity-80"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditMissionPopup;
