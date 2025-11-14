import React from "react";
import { FaUser, FaRoute, FaLayerGroup, FaClipboardList, FaFont } from "react-icons/fa";

interface Props {
  currentStep: number;
}

const steps = [
  { title: "Hoter Type", icon: <FaUser /> },
  { title: "Hoter Routes", icon: <FaRoute /> },
  { title: "Hoter Section", icon: <FaLayerGroup /> },
  { title: "Hoter Sagahs", icon: <FaClipboardList /> },
  { title: "Hoter Name", icon: <FaFont /> },
];

const HoterProgressSidebar: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="flex flex-col justify-between h-full p-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-center w-full relative flex-1">
            {/* Icon on far left */}
            <div className="mr-3 text-gray-600 text-lg">{step.icon}</div>

            {/* Left: Step Text */}
            <div className="flex flex-col items-start w-28">
              <span className="text-[var(--faded-text)] font-semibold">{`Step ${index + 1}`}</span>
              <span className="text-sm font-medium">{step.title}</span>
            </div>

            {/* Right: Dot + Connecting Line */}
            <div className="flex flex-col items-center w-8 relative h-full">
              {/* Dot */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 z-10
                  ${isCompleted ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--text)]" : ""}
                  ${isCurrent ? "bg-[var(--background)] border-[var(--accent)] text-[var(--accent)]" : ""}
                  ${!isCompleted && !isCurrent ? "bg-[var(--faded-text)] border-[var(--faded-text)] " : ""}
                `}
              >
                {isCompleted ? "✓" : "" }
              </div>

              {/* Line connecting to next dot */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-[2px] h-full
                    ${isCompleted ? "bg-[var(--accent)]" : "bg-[var(--faded-text)]"}
                  `}
                  style={{ bottom: 0 }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HoterProgressSidebar;
