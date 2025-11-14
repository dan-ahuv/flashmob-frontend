import React, { type ReactNode } from "react";
import MissionProgressSidebar from "../MissionProgressSidebar";

interface Props {
  currentStep: number;
  stepsCount: number;
  goNext: () => void;
  goBack: () => void;
  onFinalSubmit: () => void;
  children: ReactNode;
}

const MissionModelLayout: React.FC<Props> = ({
  currentStep,
  stepsCount,
  goNext,
  goBack,
  onFinalSubmit,
  children,
}) => {
  return (
    <div className="flex flex-col w-full h-full p-6">
      {/* Modal Title */}
      <h2
        className="text-3xl mb-6 text-[var(--accent)]"
        style={{ fontFamily: "Kdam Thmor Pro" }}
      >
        Create Mission
      </h2>

      {/* Main Content */}
      <div className="flex flex-1 gap-6">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-[var(--background)] flex flex-col justify-between items-center p-6 rounded-l-xl">
          <MissionProgressSidebar currentStep={currentStep} />

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full mt-6">
            <button
              onClick={goBack}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded bg-[var(--faded-text)] text-[var(--text)] disabled:opacity-50 hover:opacity-80"
            >
              Back
            </button>
            {currentStep === stepsCount - 1 ? (
              <button
                onClick={onFinalSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={goNext}
                className="px-4 py-2 rounded bg-[var(--accent)] text-[var(--text)] hover:opacity-80"
              >
                Continue
              </button>
            )}
          </div>
        </div>

        {/* Right Form Area */}
        <div className="w-3/4 p-1 overflow-auto">
          <div className="bg-[var(--background)] rounded-xl p-2 min-h-[60vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionModelLayout;
