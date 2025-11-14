import React from "react";

interface SelectFieldProps {
  label: string;
  value: string | undefined;
  options: string[];
  onChange: (value: string | undefined) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg text-[var(--text)] mb-1">{label}</h3>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="w-100 p-3 border-2 border-[var(--accent)] rounded bg-[var(--secondary)] text-[var(--text)] appearance-none focus:outline-none"
      >
        <option value="">None</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
