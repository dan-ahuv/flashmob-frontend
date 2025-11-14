import React from "react";
import type { Mission } from "../../../../../types/mission";
import MissionNameInput from "./MissionNameInput";
import SectionSelector from "./SectionSelector";
import TimeSelection from "./TimeSelection";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const Step1Basic: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-6">
      <MissionNameInput formData={formData} setFormData={setFormData} />
      <SectionSelector formData={formData} setFormData={setFormData} />
      <TimeSelection formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default Step1Basic;
