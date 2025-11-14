import React from "react";
import { parseISO } from "date-fns";
import type { Mission, Technician, Matzat, Mamash } from "../../../../../types/mission";
import MemberGroup from "./MemberGroup";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const Step3Crew: React.FC<Props> = ({ formData, setFormData }) => {
  const { technicians = [], matzats = [], mamashs = [], time: missionTime } = formData;

  const missionStart = missionTime?.start ? parseISO(missionTime.start) : undefined;
  const missionEnd = missionTime?.end ? parseISO(missionTime.end) : undefined;

  const updateMember = React.useCallback(
    <T extends Technician | Matzat | Mamash>(
      type: "technicians" | "matzats" | "mamashs",
      index: number,
      field: keyof T,
      value: any
    ) => {
      const updated = [...(formData[type] || [])] as T[];
      updated[index] = { ...updated[index], [field]: value };
      setFormData((prev) => ({ ...prev, [type]: updated }));
    },
    [formData, setFormData]
  );

  const addMember = <T extends Technician | Matzat | Mamash>(
    type: "technicians" | "matzats" | "mamashs"
  ) => {
    const newMember = { name: "", assignedTime: { start: "", end: "" } } as T;
    setFormData((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), newMember],
    }));
  };

  const deleteMember = <T extends Technician | Matzat | Mamash>(
    type: "technicians" | "matzats" | "mamashs",
    index: number
  ) => {
    const updated = [...(formData[type] || [])] as T[];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  return (
    <>
      <div className="flex gap-4">
        <MemberGroup
          type="technicians"
          members={technicians}
          missionStart={missionStart}
          missionEnd={missionEnd}
          addMember={addMember}
          updateMember={updateMember}
          deleteMember={deleteMember}
        />
        <MemberGroup
          type="matzats"
          members={matzats}
          missionStart={missionStart}
          missionEnd={missionEnd}
          addMember={addMember}
          updateMember={updateMember}
          deleteMember={deleteMember}
        />
        <MemberGroup
          type="mamashs"
          members={mamashs}
          missionStart={missionStart}
          missionEnd={missionEnd}
          addMember={addMember}
          updateMember={updateMember}
          deleteMember={deleteMember}
        />
      </div>

      {/* Portal div for DatePickers */}
      <div id="datepicker-portal" className="relative z-50" />
    </>
  );
};

export default Step3Crew;
