import React, { useState } from "react";
import HoterModalLayout from "./HoterModelLayout/HoterModelLayout";
import Step1HoterType from "./HoterSteps/Step1HoterType";
import Step2HoterRoutes from "./HoterSteps/Step2HoterRoutes";
import Step3HoterSection from "./HoterSteps/Step3HoterSection";
import Step4HoterSagahs from "./HoterSteps/Step4HoterSagahs";
import Step5HoterName from "./HoterSteps/Step5HoterName";
import type { Hoter } from "../../../types/hoter";
import Model from "../../Model/Model";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (hoter: Hoter) => void;
}

const CreateHoterModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Hoter>>({});
  const [error, setError] = useState<string>("");

  const stepsComponents = [
    <Step1HoterType formData={formData} setFormData={setFormData} />,
    <Step2HoterRoutes formData={formData} setFormData={setFormData} />,
    <Step3HoterSection formData={formData} setFormData={setFormData} />,
    <Step4HoterSagahs formData={formData} setFormData={setFormData} />,
    <Step5HoterName formData={formData} setFormData={setFormData} />,
  ];

  const validateCurrentStep = (): boolean => {
    setError("");
    switch (currentStep) {
      case 0:
        if (!formData.type) {
          setError("Please select a hoter type");
          return false;
        }
        break;
      case 1:
        if (!formData.routes || formData.routes.length === 0) {
          setError("Please add at least one route");
          return false;
        }
        break;
      case 2:
        if (!formData.section) {
          setError("Please select a section");
          return false;
        }
        break;
      case 3:
        if (!formData.sagahs || formData.sagahs.length === 0) {
          setError("Please select at least one sagah");
          return false;
        }
        break;
      case 4:
        if (!formData.name || formData.name.trim() === "") {
          setError("Please enter a name");
          return false;
        }
        break;
    }
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

    const newHoter: Hoter = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    } as Hoter;

    onSubmit(newHoter);
    onClose();
    setFormData({});
    setCurrentStep(0);
    setError("");
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <HoterModalLayout
        currentStep={currentStep}
        stepsCount={stepsComponents.length}
        goNext={goNext}
        goBack={goBack}
        onFinalSubmit={handleSubmit}
      >
        {stepsComponents[currentStep]}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </HoterModalLayout>
    </Model>
  );
};

export default CreateHoterModal;
