// src/components/AutoHoter/CreateHoterModal/HoterSteps/Step2Routes.tsx
import React from "react";
import type { Hoter, HoterRoute } from "../../../../types/hoter";

interface Props {
  formData: Partial<Hoter>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Hoter>>>;
}

const allRoutes: HoterRoute[] = [
  "dirty-dance-a",
  "dirty-dance-b",
  "dirty-dance-c",
  "dirty-dance-d",
  "dirty-dance-targil",
  "electric-eye-a",
  "electric-eye-test",
];

const Step2Routes: React.FC<Props> = ({ formData, setFormData }) => {
  const toggleRoute = (route: HoterRoute) => {
    const routes = formData.routes || [];
    if (routes.includes(route)) {
      setFormData({ ...formData, routes: routes.filter((r) => r !== route) });
    } else {
      setFormData({ ...formData, routes: [...routes, route] });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select Hoter Routes</h3>
      <div className="flex flex-wrap gap-2">
        {allRoutes.map((r) => (
          <button
            key={r}
            className={`px-3 py-1 rounded border-2 border-[var(--accent)] ${
              formData.routes?.includes(r) ? "bg-[var(--accent)] text-white" : "bg-[var(--background)] text-[var(--text)]"
            }`}
            onClick={() => toggleRoute(r)}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step2Routes;
