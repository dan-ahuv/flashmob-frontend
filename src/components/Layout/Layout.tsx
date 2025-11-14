import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-[var(--background)] text-[var(--text)]">
      <Navbar />

      <main className="flex-1 flex justify-center bg-[var(--navbar)] p-4">
        <div className="bg-[var(--background)] w-full rounded-lg shadow-md p-6 max-w-[100%]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
