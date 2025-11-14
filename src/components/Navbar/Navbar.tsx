// components/Navbar/Navbar.tsx
import React from "react";
import { tabs } from "../../constants/tabs";
import TabButton from "./TabButton/TabButton";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <aside
      className="w-1/5 text-[var(--text)] flex flex-col bg-[var(--navbar)]"
    >
      {/* Logo Section */}
      <div className="h-[20%] flex items-center justify-center p-4">
        <img
          src="/logo.png"
          alt="Flashmob Logo"
          className="h-full object-contain"
        />
      </div>

      {/* Tabs Section */}
      <nav className="flex-1 flex flex-col items-center mt-2 gap-4">
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            tab={tab}
            isActive={location.pathname === tab.route}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;
