import React, { useState } from "react";
import LiveMissionBoard from "../../components/LiveMissions/LiveMissionBoard/LiveMissionBoard";
import CreateMissionButton from "../../components/LiveMissions/CreateMissionButton/CreateMissionButton";
import CreateMissionModal from "../../components/LiveMissions/CreateMissionModel/CreateMissionModal";
import EditMissionPopup from "../../components/LiveMissions/EditMissionPopup/EditMissionPopup";
import { ConfirmPopup } from "../../components/Common/ConfirmPopup/ConfirmPopup";
import { ErrorPopup } from "../../components/Common/ErrorPopup/ErrorPopup";
import { useLiveMissions } from "../../hooks/useLiveMission";
import { MISSION_COLUMNS } from "../../constants/liveMission";
import type { Mission } from "../../types/mission";

const initialMissions: Mission[] = [
  // ...same as before
];

const LiveMissions: React.FC = () => {
  const {
    missions,
    activeMission,
    editingMission,
    errorMessage,
    confirmData,
    setActiveMission,
    setEditingMission,
    setErrorMessage,
    handleDragEnd,
    addMission,
    saveEditedMission,
    updateMission,
  } = useLiveMissions(initialMissions);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Live Missions</h1>
        <CreateMissionButton onClick={() => setIsCreateModalOpen(true)} />
      </div>

      <LiveMissionBoard
        missions={missions}
        activeMission={activeMission}
        setActiveMission={setActiveMission}
        onUpdateMission={updateMission}
        onDragEnd={handleDragEnd}
        columns={MISSION_COLUMNS}
      />

      <CreateMissionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(newMission) => {
          addMission(newMission);
          setIsCreateModalOpen(false);
        }}
      />

      {editingMission && (
        <EditMissionPopup mission={editingMission} onClose={() => setEditingMission(null)} onSave={saveEditedMission} />
      )}

      {confirmData && (
        <ConfirmPopup
          message={confirmData.message}
          onConfirm={confirmData.onConfirm}
          onCancel={confirmData.onCancel}
        />
      )}

      {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </div>
  );
};

export default LiveMissions;
