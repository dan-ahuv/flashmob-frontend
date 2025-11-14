import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MissionCard from "./MissionCard";
import type { Mission } from "../../../types/mission";

interface Props {
  mission: Mission;
  onUpdate: (updated: Mission) => void;
}

const SortableMissionCard: React.FC<Props> = ({ mission, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: mission.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <MissionCard mission={mission} onUpdate={onUpdate} dragListeners={listeners} />
    </div>
  );
};

export default SortableMissionCard;
