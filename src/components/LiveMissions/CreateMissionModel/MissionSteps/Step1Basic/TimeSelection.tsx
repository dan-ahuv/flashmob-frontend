import React from "react";
import type { Mission } from "../../../../../types/mission";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  formData: Partial<Mission>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Mission>>>;
}

const TimeSelection: React.FC<Props> = ({ formData, setFormData }) => {
  const startTime = formData.time?.start ? new Date(formData.time.start) : null;
  const endTime = formData.time?.end ? new Date(formData.time.end) : null;

  const now = new Date();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 0, 0);

  const getMinTime = (selected: Date | null) => {
    if (!selected) return now; // first open
    return selected.toDateString() === now.toDateString() ? now : startOfToday;
  };

  const getMinEndTime = () => {
    if (!startTime) return now;
    const minEnd = new Date(startTime);
    minEnd.setMinutes(minEnd.getMinutes() + 1); // at least 1 minute after start
    return minEnd;
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Start Time */}
      <div className="flex flex-col gap-1">
        <label>Start Time *</label>
        <DatePicker
          selected={startTime || now}
          onChange={(date: Date | null) => {
            if (!date) return;
            setFormData((prev) => ({
              ...prev,
              time: { start: date.toISOString(), end: prev.time?.end || "" },
            }));
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          minDate={now}
          minTime={getMinTime(startTime)}
          maxTime={endOfToday}
          className="p-3 border-2 border-[var(--accent)] rounded shadow w-64 bg-[var(--secondary)]"
          placeholderText="Select start time"
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-1">
        <label>End Time *</label>
        <DatePicker
          selected={endTime || null}
          onChange={(date: Date | null) => {
            if (!date) return;
            setFormData((prev) => ({
              ...prev,
              time: { start: prev.time?.start || "", end: date.toISOString() },
            }));
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          minDate={startTime || now}
          minTime={startTime ? getMinEndTime() : now}
          maxTime={endOfToday}
          className="p-3 border-2 border-[var(--accent)] rounded shadow w-64 bg-[var(--secondary)]"
          placeholderText="Select end time"
          disabled={!startTime} // disabled until startTime is chosen
        />
      </div>
    </div>
  );
};

export default TimeSelection;
