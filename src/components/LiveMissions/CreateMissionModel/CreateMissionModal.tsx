import React, { useState } from "react";
import MissionModelLayout from "./MissionModelLayout/MissionModelLayout";
import Step1Basic from "./MissionSteps/Step1Basic/Step1Basic";
import Step2Platforms from "./MissionSteps/Step2Platforms/Step2Platforms";
import Step3Crew from "./MissionSteps/Step3Crew/Step3Crew";
import Step4Stations from "./MissionSteps/Step4Stations/Step4Stations";
import type { Mission } from "../../../types/mission";
import Modal from "../../Model/Model";
import { validateMissionStep } from "../../../utils/validateMission";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mission: Mission) => void;
}

const CreateMissionModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Mission>>({});
  const [error, setError] = useState<string>("");

  const stepsComponents = [
    <Step1Basic formData={formData} setFormData={setFormData} />,
    <Step2Platforms formData={formData} setFormData={setFormData} />,
    <Step3Crew formData={formData} setFormData={setFormData} />,
    <Step4Stations formData={formData} setFormData={setFormData} />,
  ];

  const validateCurrentStep = (): boolean => {
    const validationError = validateMissionStep(currentStep, formData);
    if (validationError) {
      setError(validationError);
      return false;
    }
    setError("");
    return true;
  };

  const goNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((s) => Math.min(s + 1, stepsComponents.length - 1));
    }
  };

  const goBack = () => {
    setError("");
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    const newMission: Mission = {
      ...formData,
      id: Date.now().toString(),
      status: "planned-missions",
      platforms: formData.platforms || [],
      technicians: formData.technicians || [],
      matzats: formData.matzats || [],
      mamashs: formData.mamashs || [],
    } as Mission;

    onSubmit(newMission);
    onClose();
    setFormData({});
    setCurrentStep(0);
    setError("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <MissionModelLayout
        currentStep={currentStep}
        stepsCount={stepsComponents.length}
        goNext={goNext}
        goBack={goBack}
        onFinalSubmit={handleSubmit}
      >
        {stepsComponents[currentStep]}
        {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
      </MissionModelLayout>
    </Modal>
  );
};

export default CreateMissionModal;
