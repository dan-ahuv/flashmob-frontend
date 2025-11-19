import { useState, useEffect } from "react";
import type { Mission, MissionStatus } from "../types/mission";
import { validateEditMission } from "../utils/validateEditMission";
import { ALLOWED_TRANSITIONS } from "../constants/liveMission";

export const useLiveMissions = (initialMissions: Mission[]) => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmData, setConfirmData] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);

  // Auto-hide error
  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const updateMission = (updated: Mission) =>
    setMissions((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));

  const handleDragEnd = (activeId: string, targetStatus: MissionStatus) => {
    if (!activeMission) return;

    const currentMission = missions.find((m) => m.id === activeId);
    if (!currentMission) return;

    const allowed = ALLOWED_TRANSITIONS[currentMission.status] || [];
    if (!allowed.includes(targetStatus)) {
      setErrorMessage(`You cannot move a "${currentMission.status}" mission to "${targetStatus}"!`);
      setActiveMission(null);
      return;
    }

    // Planned -> Active validation
    if (currentMission.status === "planned-missions" && targetStatus === "active-missions") {
      const tempMission = { ...currentMission, status: "active-missions" as MissionStatus };
      const errors = validateEditMission(tempMission);

      if (errors.length > 0) {
        setConfirmData({
          message: "This mission is missing required information. Edit now?",
          onConfirm: () => {
            setEditingMission(tempMission);
            setConfirmData(null);
          },
          onCancel: () => setConfirmData(null),
        });
        setActiveMission(null);
        return;
      }
    }

    // Update mission
    updateMission({ ...currentMission, status: targetStatus });
    setActiveMission(null);
  };

  const addMission = (newMission: Mission) => setMissions((prev) => [...prev, newMission]);
  const saveEditedMission = (updated: Mission) => {
    // ensure Planned->Active flow sets status
    updateMission({ ...updated, status: "active-missions" as MissionStatus });
    setEditingMission(null);
  };

  return {
    missions,
    activeMission,
    editingMission,
    errorMessage,
    confirmData,
    setActiveMission,
    setEditingMission,
    setErrorMessage,
    setConfirmData,
    handleDragEnd,
    addMission,
    saveEditedMission,
    updateMission,
  };
};
