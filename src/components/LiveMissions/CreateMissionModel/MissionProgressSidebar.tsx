import React from "react";
import { FaClipboardList, FaLayerGroup, FaUser, FaMapMarkedAlt } from "react-icons/fa";

interface Props {
  currentStep: number;
}

const steps = [
  { title: "Basic Info", icon: <FaClipboardList /> },
  { title: "Platforms", icon: <FaLayerGroup /> },
  { title: "Crew", icon: <FaUser /> },
  { title: "Stations & Route", icon: <FaMapMarkedAlt /> },
];

const MissionProgressSidebar: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="flex flex-col h-full p-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-start w-full relative">
            {/* Icon */}
            <div className="mr-3 text-gray-600 text-lg mt-1">{step.icon}</div>

            {/* Step Text */}
            <div className="flex flex-col items-start w-28">
              <span className="text-[var(--faded-text)] font-semibold">{`Step ${index + 1}`}</span>
              <span className="text-sm font-medium">{step.title}</span>
            </div>

            {/* Dot + connecting line */}
            <div className="flex flex-col items-center ml-3">
              {/* Dot */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 z-10
                  ${isCompleted ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--text)]" : ""}
                  ${isCurrent ? "bg-[var(--background)] border-[var(--accent)] text-[var(--accent)]" : ""}
                  ${!isCompleted && !isCurrent ? "bg-[var(--faded-text)] border-[var(--faded-text)]" : ""}
                `}
              >
                {isCompleted ? "✓" : ""}
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-[2px]`}
                  style={{
                    height: 60, // adjust gap between dots
                    backgroundColor: isCompleted ? "var(--accent)" : "var(--faded-text)",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MissionProgressSidebar;
