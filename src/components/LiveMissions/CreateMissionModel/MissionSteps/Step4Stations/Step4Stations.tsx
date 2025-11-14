import React from "react";
import type { Mission } from "../../../../../types/mission";
import { STATIONS } from "../../../../../types/station";
import { ROUTES } from "../../../../../types/route";
import SelectField from "./SelectField";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const Step4Stations: React.FC<Props> = ({ formData, setFormData }) => {
  const { station, backupStation, route } = formData;

  const handleChange = (field: keyof Mission, value: string | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value || undefined }));
  };

  const availableStationsForMain = STATIONS.filter((s) => s !== backupStation);
  const availableStationsForBackup = STATIONS.filter((s) => s !== station);

  return (
    <div className="flex flex-col gap-10 p-2 rounded-lg">
      <SelectField
        label="Main Station"
        value={station}
        options={availableStationsForMain}
        onChange={(v) => handleChange("station", v)}
      />

      <SelectField
        label="Backup Station (optional)"
        value={backupStation}
        options={availableStationsForBackup}
        onChange={(v) => handleChange("backupStation", v)}
      />

      <SelectField
        label="Route (optional)"
        value={route}
        options={ROUTES}
        onChange={(v) => handleChange("route", v)}
      />
    </div>
  );
};

export default Step4Stations;
