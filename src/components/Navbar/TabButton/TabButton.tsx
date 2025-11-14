import React from "react";
import { useNavigate } from "react-router-dom";
import type { Tab } from "../../../constants/tabs";

interface Props {
  tab: Tab;
  isActive: boolean;
}

const TabButton: React.FC<Props> = ({ tab, isActive }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(tab.route)}
      className={`w-[95%] flex items-center gap-5 rounded px-4 h-[55px] text-[1.3rem] transition-colors duration-200
        ${isActive ? "bg-[var(--faded-navbar)]" : "bg-transparent"}
        hover:bg-[var(--faded-navbar)]
        text-[var(--text)]
      `}
    >
      <img
        src={tab.icon}
        alt={`${tab.name} icon`}
        className={`h-8 w-8 transition-filter duration-200`}
      />
      <span>{tab.name}</span>
    </button>
  );
};

export default TabButton;
